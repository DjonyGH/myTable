import React, { useCallback, useMemo } from 'react'
import { MyTableFactory } from '../../MyTable/MyTableFactory'
import { IColumn, TFilterValue } from '../../MyTable/types'
import { tableStyle, tdStyle, thStyle } from '../../styles'
import { rows } from './data'
import styles from './example2.module.scss'
import { IExample2TableRow } from './types'

export const Example2: React.FC = () => {
  const columns: IColumn<IExample2TableRow>[] = [
    {
      name: 'id',
      title: 'ID',
      width: 50,
      // sortEnabled: true,
    },
    {
      name: 'benefit',
      title: 'Льгота',
      items: [
        {
          name: 'benefitCode',
          title: 'Код',
          width: 200,
          filterMode: 'select',
        },
        {
          name: 'benefitName',
          title: 'Наименование',
          width: 200,
          filterMode: 'contains',
        },
      ],
    },
    {
      name: 'benefitValue',
      title: 'Величина льготы',
      width: 200,
      filterMode: 'fromTo',
      // sortEnabled: true,
    },
    {
      name: 'isApplied',
      title: 'Применена',
      width: 100,
      cellRender(cellValue) {
        if (cellValue) {
          return <span style={{ color: 'green' }}>+</span>
        } else {
          return <span style={{ color: 'red' }}>-</span>
        }
      },
    },
  ]

  const onLoadData = (filterValue: TFilterValue<IExample2TableRow>) =>
    console.log('load new data with filter:', filterValue)

  const MyTable = useCallback(MyTableFactory<IExample2TableRow>(), []) //eslint-disable-line

  return (
    <section className={styles.example2}>
      <h2 id='types'>Example 2</h2>
      <MyTable
        columns={columns}
        rows={rows}
        width={50}
        styles={useMemo(
          () => ({
            table: tableStyle,
            th: thStyle,
            td: tdStyle,
          }),
          [] //eslint-disable-line
        )}
        onLoadData={onLoadData}
        // defaultSort={useMemo(() => ({ columnName: 'id', mode: ESortMode.ASC }), [])}
      />
    </section>
  )
}
