import React, { useEffect, useState } from 'react'
import { IColumn, TFilterMode, TRow, TValue, TValueRowSpanObject } from '../types'
import { prepareRows } from '../utils'
import styles from './MyTable.module.css'
import './myTable.css'

interface IProps {
  rows: TRow[]
  columns?: IColumn[]
  filterEnabled?: boolean
  rowHeight?: number
  tableStyle?: React.CSSProperties
  thStyle?: React.CSSProperties
  tdStyle?: React.CSSProperties
  rowStylePrepare?: (row: TValueRowSpanObject, rowIndex?: number) => React.CSSProperties | undefined
  filterCellStyle?: React.CSSProperties
}

export const MyTable: React.FC<IProps> = ({
  columns,
  rows,
  filterEnabled,
  rowHeight,
  tableStyle,
  thStyle,
  tdStyle,
  rowStylePrepare,
  filterCellStyle,
}) => {
  const [filterValue, setFilterValue] = useState<{ [key: string]: { mode: TFilterMode; value: TValue } } | undefined>()

  const preparedRows = prepareRows(rows)

  const getFilterInputs: (columnName: string) => { [key: string]: JSX.Element } = (columnName) => ({
    startWith: (
      <input
        type='text'
        className='filter_input'
        name={columnName}
        placeholder='Начинается с ...'
        onBlur={(e) => {
          if (!e.target.value || filterValue?.[e.target.name]?.value === e.target.value) return
          setFilterValue({
            ...filterValue,
            [e.target.name]: { mode: 'startWith', value: e.target.value },
          })
        }}
      />
    ),
    contains: (
      <input
        type='text'
        className='filter_input'
        name={columnName}
        placeholder='Содержит ...'
        onBlur={(e) => {
          if (!e.target.value || filterValue?.[e.target.name]?.value === e.target.value) return
          setFilterValue({
            ...filterValue,
            [e.target.name]: { mode: 'contains', value: e.target.value },
          })
        }}
      />
    ),
  })

  useEffect(() => {
    filterValue && console.log('load new data with filter:', filterValue)
  }, [filterValue])

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
                  {col.filter?.mode && getFilterInputs(col.name)[col.filter.mode]}
                </td>
              ))}
          </tr>
        )}

        {/* Строки */}
        {preparedRows.map((row: TValueRowSpanObject, idx: number) => (
          <tr key={idx} style={{ ...rowStylePrepare?.(row), height: rowHeight ? `${rowHeight}px` : 'auto' }}>
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
