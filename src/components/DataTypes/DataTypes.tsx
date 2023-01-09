import React from 'react'
import { MyTableFactory } from '../../MyTable/MyTableFactory'
import { ESortMode, IColumn } from '../../MyTable/types'
import { rows } from './data'
import styles from './dataTypes.module.scss'
import { ITypesTableRow } from './types'

export const DataTypes: React.FC = () => {
  const columns: IColumn<ITypesTableRow>[] = [
    {
      name: 'type',
      title: 'Тип',
      width: 250,
      cellRender: (cellValue) => <span id={`${cellValue}`}>{cellValue}</span>,
    },
    {
      name: 'description',
      title: 'Описание',
      cellRender: (cellValue) => <pre style={{ fontSize: '16px' }}>{cellValue}</pre>,
    },
  ]

  const tableStyle: React.CSSProperties = {
    borderCollapse: 'collapse',
  }

  const thStyle: React.CSSProperties = {
    textAlign: 'left',
    height: '50px',
    padding: '0 10px',
    border: '1px solid grey',
  }

  const tdStyle: React.CSSProperties = {
    textAlign: 'left',
    height: '40px',
    padding: '0 10px',
    border: '1px solid grey',
  }

  const MyTable = MyTableFactory<ITypesTableRow>()

  return (
    <section className={styles.types}>
      <h2 id='types'>TYPES</h2>
      <MyTable
        columns={columns}
        rows={rows}
        styles={{ table: tableStyle, th: thStyle, td: tdStyle }}
        width={70}
        defaultSort={{ columnName: 'prop', mode: ESortMode.ASC }}
      />
    </section>
  )
}
