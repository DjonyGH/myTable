import React, { useEffect } from 'react'
import { IColumn, TRow, TValueRowSpanObject, TFilterValue } from '../types'
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
}) => {
  const [filterValue, getFilterInput] = useFilter()

  const preparedRows = prepareRows(rows)

  useEffect(() => {
    filterValue && onLoadData?.(filterValue)
  }, [filterValue]) //eslint-disable-line

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          {columns &&
            columns.map((col, idx) => (
              <th style={{ ...thStyle, width: `${col.width}px` }} key={idx}>
                {col.title}
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
