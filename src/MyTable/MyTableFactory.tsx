import React, { useEffect, useState } from 'react'
import { IColumn, TRow, TPreparedRow, TFilterValue, TOnSort, ESortMode, TValue, TPreparedColumns } from './types'
import { prepareColumns, prepareRows } from './utils'
import s from './MyTable.module.css'
import './myTable.css'
import { useFilter } from './hooks/useFilter'

interface IProps<T extends TRow> {
  rows: T[]
  columns?: IColumn<T>[]
  filterEnabled?: boolean
  filterAvailableValues?: Record<keyof T, string[]>
  defaultFilter?: TFilterValue<T>
  width?: number
  styles?: {
    header?: React.CSSProperties
    table?: React.CSSProperties
    th?: React.CSSProperties
    td?: React.CSSProperties
    filterCell?: React.CSSProperties
    footer?: React.CSSProperties
    sortButton?: React.CSSProperties
    sortButtonActive?: React.CSSProperties
    sortButtonContent?: JSX.Element
    onRowPrepare?: (row: TPreparedRow<T>, rowIndex?: number) => React.CSSProperties | undefined
  }
  onLoadData?: (filterValue: TFilterValue<T>) => void
  onCellClick?: (cellValue: TValue, row?: TPreparedRow<T>) => void
  resetFilter?: [boolean, (value: boolean) => void]
  defaultSort?: { columnName: string; mode: ESortMode }
  headerJSX?: JSX.Element
  footerJSX?: JSX.Element
}

export const MyTableFactory = <T extends TRow>() => {
  const MyTable: React.FC<IProps<T>> = ({
    columns,
    rows,
    filterEnabled = false,
    filterAvailableValues,
    defaultFilter,
    width = 100,
    styles,
    onLoadData,
    onCellClick,
    resetFilter,
    defaultSort,
    headerJSX,
    footerJSX,
  }) => {
    const [filterValue, getFilterInput] = useFilter<T>(defaultFilter, resetFilter)

    const [sortMode, setSortMode] = useState<ESortMode>(defaultSort?.mode || ESortMode.ASC)
    const [sortedColumnName, setSortedColumnName] = useState<keyof T>(defaultSort?.columnName || '')

    const preparedRows: TPreparedRow<T>[] = prepareRows<T>(rows)

    const preparedColumns: TPreparedColumns<T> = prepareColumns<T>(columns, preparedRows)

    useEffect(() => {
      const filter = filterValue && Object.keys(filterValue).length ? filterValue : undefined
      onLoadData?.(filter)
    }, [filterValue]) //eslint-disable-line

    const onSort: TOnSort<T> = (columnName) => {
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

    return (
      <>
        <div style={{ ...styles?.header, width: `${width}%` }}>{headerJSX}</div>
        <table style={{ ...styles?.table, width: `${width}%` }}>
          <thead>
            {preparedColumns && preparedColumns.forTHead ? (
              <>
                <tr>
                  {preparedColumns.forTHead[0].map((col, idx) => (
                    <th
                      style={{ ...styles?.th, width: `${col.width}px`, position: 'relative' }}
                      key={idx}
                      colSpan={col.colSpan}
                      rowSpan={col.rowSpan}
                    >
                      {col.title}
                      {col.sortEnabled && col.colSpan === 1 && (
                        <button
                          className={`${s.sortButton} ${sortMode === ESortMode.DESC ? s.sortButtonDesc : ''} ${
                            sortedColumnName === col.name ? s.sortActive : ''
                          }`}
                          style={
                            sortedColumnName === col.name
                              ? { ...styles?.sortButton, ...styles?.sortButtonActive }
                              : styles?.sortButton
                          }
                          onClick={() => onSort(col.name)}
                        >
                          {styles?.sortButtonContent || '>'}
                        </button>
                      )}
                    </th>
                  ))}
                </tr>
                <tr>
                  {preparedColumns.forTHead[1].map((col, idx) => (
                    <th
                      style={{ ...styles?.th, width: `${col.width}px`, position: 'relative' }}
                      key={idx}
                      colSpan={col.colSpan}
                      rowSpan={col.rowSpan}
                    >
                      {col.title}
                      {col.sortEnabled && col.colSpan === 1 && (
                        <button
                          className={`${s.sortButton} ${sortMode === ESortMode.DESC ? s.sortButtonDesc : ''} ${
                            sortedColumnName === col.name ? s.sortActive : ''
                          }`}
                          style={
                            sortedColumnName === col.name
                              ? { ...styles?.sortButton, ...styles?.sortButtonActive }
                              : styles?.sortButton
                          }
                          onClick={() => onSort(col.name)}
                        >
                          {styles?.sortButtonContent || '>'}
                        </button>
                      )}
                    </th>
                  ))}
                </tr>
              </>
            ) : (
              <tr>
                {preparedColumns.forTBody.map((col, idx) => (
                  <th style={{ ...styles?.th, width: `${col.width}px`, position: 'relative' }} key={idx}>
                    {col.title}
                    {col.sortEnabled && (
                      <button
                        className={`${s.sortButton} ${sortMode === ESortMode.DESC ? s.sortButtonDesc : ''} ${
                          sortedColumnName === col.name ? s.sortActive : ''
                        }`}
                        style={
                          sortedColumnName === col.name
                            ? { ...styles?.sortButton, ...styles?.sortButtonActive }
                            : styles?.sortButton
                        }
                        onClick={() => onSort(col.name)}
                      >
                        {styles?.sortButtonContent || '>'}
                      </button>
                    )}
                  </th>
                ))}
              </tr>
            )}
          </thead>

          <tbody>
            {/* Фильтры */}
            {filterEnabled && (
              <tr className={s.filterRow}>
                {columns &&
                  preparedColumns.forTBody.map((col, idx) => (
                    <td style={styles?.filterCell} key={idx}>
                      {col.filterMode && getFilterInput(col.name, col.filterMode, filterAvailableValues?.[col.name])}
                    </td>
                  ))}
              </tr>
            )}

            {/* Строки */}
            {preparedRows.map((row: TPreparedRow<T>, idx: number) => (
              <tr key={idx} style={{ ...styles?.onRowPrepare?.(row) }}>
                {columns
                  ? preparedColumns.forTBody.map((col, idx) => {
                      if (col.name in row) {
                        return (
                          <td
                            rowSpan={row[col.name]?.rowSpan}
                            onClick={() => onCellClick?.(row[col.name].value, row)}
                            style={{ ...styles?.td }}
                            key={idx}
                          >
                            {col.cellRender?.(row[col.name].value, row) || row[col.name]?.value}
                          </td>
                        )
                      } else {
                        return (
                          <td
                            style={{ ...styles?.td }}
                            onClick={() => onCellClick?.(row[col.name].value, row)}
                            key={idx}
                          >
                            {/* <i>No data</i> */}
                          </td>
                        )
                      }
                    })
                  : (Object.keys(row) as (keyof typeof row)[]).map((fieldKey, idx) => (
                      <td
                        rowSpan={row[fieldKey]?.rowSpan}
                        onClick={() => onCellClick?.(row[fieldKey].value, row)}
                        style={{ ...styles?.td }}
                        key={idx}
                      >
                        {row[fieldKey].value}
                      </td>
                    ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ ...styles?.footer, width: `${width}%` }}>{footerJSX}</div>
      </>
    )
  }

  return MyTable
}
