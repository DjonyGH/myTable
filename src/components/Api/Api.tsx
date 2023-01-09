import React from 'react'
import { MyTableFactory } from '../../MyTable/MyTableFactory'
import { ESortMode, IColumn } from '../../MyTable/types'
import styles from './api.module.scss'
import { rows } from './data'
import { IApiTableRow } from './types'

export const Api: React.FC = () => {
  const columns: IColumn<IApiTableRow>[] = [
    {
      name: 'prop',
      title: 'Свойство',
      width: 150,
    },
    {
      name: 'description',
      title: 'Описание',
    },
    {
      name: 'type',
      title: 'Тип',
      width: 350,
      cellRender: (cellValue, row) =>
        cellValue === 'boolean' || cellValue === 'JSX.Element' || cellValue === 'number' ? (
          <>{cellValue}</>
        ) : (
          <a href={`#${cellValue}`}>{cellValue}</a>
        ),
    },
    {
      name: 'defaultValue',
      title: 'По умолчанию',
      width: 150,
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

  const MyTable = MyTableFactory<IApiTableRow>()

  return (
    <section className={styles.api}>
      <h2 id='api'>API</h2>
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
