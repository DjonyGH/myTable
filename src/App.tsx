// import React, { useState } from 'react'
// import { flushSync } from 'react-dom'
import { Api } from './components/Api/Api'
import { DataTypes } from './components/DataTypes/DataTypes'
// import { data1 } from './data/data1'
// import { data2 } from './data/data2'
// import { data3 } from './data/data3'
// import { data4 } from './data/data4'
// import { MyTable } from './MyTable/MyTable'
// import { ESortMode, IColumn, TFilterValue, TPreparedRow } from './MyTable/types'

function App() {
  // const [filterVisible, setFilterVisible] = useState<boolean>(false)
  // const [filterReset, setFilterReset] = useState<boolean>(false)

  // const columns: IColumn[] = [
  //   {
  //     name: 'id',
  //     title: 'ID',
  //     width: 50,
  //     sortEnabled: true,
  //   },
  //   {
  //     name: 'benefitCode',
  //     title: 'Код',
  //     width: 200,
  //     filterMode: 'select',
  //   },
  //   {
  //     name: 'benefitName',
  //     title: 'Наименование',
  //     width: 200,
  //     filterMode: 'contains',
  //   },
  //   {
  //     name: 'benefitValue',
  //     title: 'Величина льготы',
  //     width: 200,
  //     filterMode: 'fromTo',
  //     sortEnabled: true,
  //   },
  //   {
  //     name: 'isApplied',
  //     title: 'Применена',
  //     width: 100,
  //     cellRender(cellValue) {
  //       if (cellValue) {
  //         return <span style={{ color: 'green' }}>+</span>
  //       } else {
  //         return <span style={{ color: 'red' }}>-</span>
  //       }
  //     },
  //   },
  //   {
  //     name: 'NoName',
  //     title: 'Без имени',
  //   },
  //   {
  //     name: 'NoName2',
  //     title: 'Без имени2',
  //   },
  // ]

  // const tableStyle: React.CSSProperties = {
  //   borderCollapse: 'collapse',
  // }

  // const thStyle: React.CSSProperties = {
  //   textAlign: 'left',
  //   padding: '8px 16px',
  //   height: '63px',
  //   border: '1px solid hsl(220deg, 6%, 80%)',
  // }

  // const tdStyle: React.CSSProperties = {
  //   textAlign: 'left',
  //   padding: '8px 16px',
  //   height: '32px',
  //   border: '1px solid hsl(220deg, 6%, 80%)',
  // }

  // const onRowStylePrepare = (row: TPreparedRow) => {
  //   if (row.id.value === 1) {
  //     return { backgroundColor: '#aeb1b7' }
  //   }
  // }

  // const filterCellStyle: React.CSSProperties = {
  //   border: '1px solid hsl(220deg, 6%, 80%)',
  // }

  // const filterAvailableValues = {
  //   benefitCode: ['Код льготы 1', 'Код льготы 2'],
  // }

  // const onLoadData = (filterValue: TFilterValue) => console.log('load new data with filter:', filterValue)

  // const onReset = () => {
  //   flushSync(() => setFilterReset(true))
  //   setFilterReset(false)
  // }

  return (
    <div className='App'>
      <h1>MyTable</h1>

      <p>Компонент для работы с таблицами</p>

      <Api />

      <DataTypes />

      {/* <button onClick={() => setFilterVisible((prevValue) => !prevValue)}>Показать фильтр</button>
      <button onClick={onReset}>Сбросить фильтр</button> */}
      {/* <h1>Таблица 1</h1>
      <MyTable rows={data1} /> */}
      {/* <h1>Таблица 2</h1> */}
      {/* <MyTable
        columns={columns}
        rows={data2}
        filterEnabled={filterVisible}
        filterAvailableValues={filterAvailableValues}
        width={50}
        styles={{
          table: tableStyle,
          th: thStyle,
          td: tdStyle,
          filterCell: filterCellStyle,
          onRowPrepare: onRowStylePrepare,
        }}
        onLoadData={onLoadData}
        resetFilter={filterReset}
        defaultSort={{ columnName: 'id', mode: ESortMode.ASC }}
      /> */}
      {/* <h1>Таблица 3</h1>
      <MyTable rows={data3} />
      <h1>Таблица 4</h1>
      <MyTable rows={data4} /> */}
    </div>
  )
}

export default App
