import React, { useCallback, useMemo, useState } from 'react'
import { MyTableFactory } from '../../MyTable/MyTableFactory'
import { ESortMode, IColumn, TFilterValue, TPreparedRow } from '../../MyTable/types'
import { rows } from './data'
import styles from './example1.module.scss'
import { IExample1TableRow } from './types'

export const Example1: React.FC = () => {
  const [filterVisible, setFilterVisible] = useState<boolean>(false)
  const [filterReset, setFilterReset] = useState<boolean>(false)

  const columns: IColumn<IExample1TableRow>[] = [
    {
      name: 'id',
      title: 'ID',
      width: 50,
      sortEnabled: true,
    },
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
    {
      name: 'benefitValue',
      title: 'Величина льготы',
      width: 200,
      filterMode: 'fromTo',
      sortEnabled: true,
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

  const tableStyle: React.CSSProperties = {
    borderCollapse: 'collapse',
  }

  const thStyle: React.CSSProperties = {
    textAlign: 'left',
    padding: '8px 16px',
    height: '63px',
    border: '1px solid hsl(220deg, 6%, 80%)',
  }

  const tdStyle: React.CSSProperties = {
    textAlign: 'left',
    padding: '8px 16px',
    height: '32px',
    border: '1px solid hsl(220deg, 6%, 80%)',
  }

  const onRowStylePrepare = (row: TPreparedRow<IExample1TableRow>) => {
    if (row.id.value === 1) {
      return { backgroundColor: '#aeb1b7' }
    }
  }

  const filterCellStyle: React.CSSProperties = {
    border: '1px solid hsl(220deg, 6%, 80%)',
  }

  const filterAvailableValues = {
    benefitCode: ['Код льготы 1', 'Код льготы 2'],
  }

  const onLoadData = (filterValue: TFilterValue<IExample1TableRow>) =>
    console.log('load new data with filter:', filterValue)

  const MyTable = useCallback(MyTableFactory<IExample1TableRow>(), []) //eslint-disable-line

  return (
    <section className={styles.example1}>
      <h2 id='types'>Example 1</h2>
      <div>
        <button className={styles.btn} onClick={() => setFilterVisible((prevValue) => !prevValue)}>
          Показать фильтр
        </button>
        <button className={styles.btn} onClick={() => setFilterReset(true)}>
          Сбросить фильтр
        </button>
      </div>
      <MyTable
        columns={columns}
        rows={rows}
        filterEnabled={filterVisible}
        filterAvailableValues={filterAvailableValues}
        defaultFilter={useMemo(() => ({ benefitName: { mode: 'contains', value: 'Наменование льготы 1' } }), [])} //eslint-disable-line
        width={50}
        styles={useMemo(
          () => ({
            table: tableStyle,
            th: thStyle,
            td: tdStyle,
            filterCell: filterCellStyle,
            onRowPrepare: onRowStylePrepare,
          }),
          [] //eslint-disable-line
        )}
        onLoadData={onLoadData}
        resetFilter={useMemo(() => [filterReset, setFilterReset], [filterReset])}
        defaultSort={useMemo(() => ({ columnName: 'id', mode: ESortMode.ASC }), [])}
      />
    </section>
  )
}
