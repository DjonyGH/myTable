import React, { useEffect, useState } from 'react'
import { IColumn, TRow, TValueRowSpanObject, TFilterValue, TOnSort, ESortMode } from '../types'
import { prepareRows } from '../utils'
import styles from './MyTable.module.css'
import './myTable.css'
import { useFilter } from '../hooks/useFilter'

interface IProps {
  rows: TRow[]
  columns?: IColumn[]
  filterEnabled?: boolean
  filterAvailableValues?: Record<string, string[]>
  rowHeight?: number
  tableStyle?: React.CSSProperties
  thStyle?: React.CSSProperties
  tdStyle?: React.CSSProperties
  filterCellStyle?: React.CSSProperties
  onRowStylePrepare?: (row: TValueRowSpanObject, rowIndex?: number) => React.CSSProperties | undefined
  onLoadData?: (filterValue: TFilterValue) => void
  resetFilter?: boolean
  defaultSort?: { columnName: string; mode: ESortMode }
}

export const MyTable: React.FC<IProps> = ({
  columns,
  rows,
  filterEnabled,
  filterAvailableValues,
  rowHeight,
  tableStyle,
  thStyle,
  tdStyle,
  filterCellStyle,
  onRowStylePrepare,
  onLoadData,
  resetFilter,
  defaultSort,
}) => {
  const [filterValue, getFilterInput, cleanFilter] = useFilter()

  const [sortMode, setSortMode] = useState<ESortMode>(defaultSort?.mode || ESortMode.ASC)
  const [sortedColumnName, setSortedColumnName] = useState<string>(defaultSort?.columnName || '')

  const preparedRows = prepareRows(rows)

  useEffect(() => {
    filterValue && onLoadData?.(filterValue)
  }, [filterValue]) //eslint-disable-line

  useEffect(() => {
    resetFilter && cleanFilter()
  }, [resetFilter]) //eslint-disable-line

  const onSort: TOnSort = (columnName) => {
    setSortMode((prevState) => (prevState === ESortMode.ASC ? ESortMode.DESC : ESortMode.ASC))
    setSortedColumnName(columnName)
  }

  sortedColumnName &&
    preparedRows.sort((a, b) => {
      if (sortedColumnName in a && sortedColumnName in b) {
        if (a[sortedColumnName].value > b[sortedColumnName].value) return sortMode === ESortMode.ASC ? 1 : -1
        else if (a[sortedColumnName].value === b[sortedColumnName].value) return 0
        return sortMode === ESortMode.ASC ? -1 : 1
      }
      return 0
    })

  let preparedColumns: IColumn[] = []

  if ((!columns || !columns.length) && preparedRows[0]) {
    preparedColumns = Object.keys(preparedRows[0]).map((item) => ({ name: item, title: item }))
  } else {
    columns && (preparedColumns = columns)
  }

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          {preparedColumns &&
            preparedColumns.map((col, idx) => (
              <th style={{ ...thStyle, width: `${col.width}px`, position: 'relative' }} key={idx}>
                {col.title}
                {col.sortEnabled && (
                  <button
                    className={`${styles.sortButton} ${sortMode === ESortMode.DESC ? styles.sortButtonDesc : ''} ${
                      sortedColumnName === col.name ? styles.sortActive : ''
                    }`}
                    onClick={() => onSort(col.name)}
                  >
                    {'>'}
                  </button>
                )}
              </th>
            ))}
        </tr>
      </thead>

      <tbody>
        {/* Фильтры */}
        {filterEnabled && (
          <tr className={styles.filterRow}>
            {columns &&
              columns.map((col, idx) => (
                <td style={filterCellStyle} key={idx}>
                  {col.filterMode && getFilterInput(col.name, col.filterMode, filterAvailableValues?.[col.name])}
                </td>
              ))}
          </tr>
        )}

        {/* Строки */}
        {preparedRows.map((row: TValueRowSpanObject, idx: number) => (
          <tr key={idx} style={{ ...onRowStylePrepare?.(row), height: rowHeight ? `${rowHeight}px` : 'auto' }}>
            {columns
              ? columns.map((col, idx) => {
                  if (col.name in row) {
                    return (
                      <td rowSpan={row[col.name]?.rowSpan} style={{ ...tdStyle }} key={idx}>
                        {col.cellRender?.(row[col.name]?.value, row) || row[col.name]?.value}
                      </td>
                    )
                  } else {
                    return (
                      <td style={{ ...tdStyle }} key={idx}>
                        <i>No data</i>
                      </td>
                    )
                  }
                })
              : (Object.keys(row) as (keyof typeof row)[]).map((fieldKey, idx) => (
                  <td rowSpan={row[fieldKey]?.rowSpan} style={{ ...tdStyle }} key={idx}>
                    {row[fieldKey]?.value}
                  </td>
                ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
