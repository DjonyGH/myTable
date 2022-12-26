import React from 'react'
import { TObject } from '../types'
import { prepareRows } from '../utils'
import styles from './MyTable.module.css'

interface IProps {
  // columns: any[]
  rows: TObject[]
}

export const MyTable: React.FC<IProps> = ({ rows }) => {
  const preparedRows = prepareRows(rows)

  return (
    <table className={styles.table}>
      <tbody>
        {preparedRows.map((row: any, idx: number) => (
          <tr key={idx}>
            {(Object.keys(row) as (keyof typeof row)[]).map((fieldKey, idx) => (
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
