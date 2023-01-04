import React from 'react'
import { IColumn, TRow, TValue, TValueRowSpanObject } from '../types'
import { prepareRows } from '../utils'
import styles from './MyTable.module.css'

interface IProps {
  rows: TRow[]
  columns?: IColumn[]
  rowHeight?: number
  tableStyle?: React.CSSProperties
  thStyle?: React.CSSProperties
  tdStyle?: React.CSSProperties
  rowStylePrepare?: (row: TValueRowSpanObject, rowIndex?: number) => React.CSSProperties | undefined
}

export const MyTable: React.FC<IProps> = ({
  columns,
  rows,
  rowHeight,
  tableStyle,
  thStyle,
  tdStyle,
  rowStylePrepare,
}) => {
  const preparedRows = prepareRows(rows)

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
