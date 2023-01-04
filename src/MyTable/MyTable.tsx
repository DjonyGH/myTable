import React from 'react'
import { IColumn, TObject, TValue } from '../types'
import { prepareRows } from '../utils'
import styles from './MyTable.module.css'

interface IProps {
  columns: IColumn[]
  rows: TObject[]
}

export const MyTable: React.FC<IProps> = ({ columns, rows }) => {
  const preparedRows = prepareRows(rows)

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns &&
            columns.map((col, idx) => (
              <td className={styles.cell} style={{ width: `${col.width}px` }} key={idx}>
                {col.title}
              </td>
            ))}
        </tr>
      </thead>

      <tbody>
        {preparedRows.map((row: any, idx: number) => (
          <tr key={idx}>
            {columns
              ? columns.map((col, idx) => {
                  if (col.name in row) {
                    return (
                      <td rowSpan={row[col.name]?.rowSpan} className={styles.cell} key={idx}>
                        {row[col.name]?.value}
                      </td>
                    )
                  } else {
                    return (
                      <td className={styles.cell} key={idx}>
                        <i>No data</i>
                      </td>
                    )
                  }
                })
              : (Object.keys(row) as (keyof typeof row)[]).map((fieldKey, idx) => (
                  <td rowSpan={row[fieldKey]?.rowSpan} className={styles.cell} key={idx}>
                    {row[fieldKey]?.value}
                  </td>
                ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
