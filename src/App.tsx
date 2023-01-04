import React from 'react'
import { data1 } from './data/data1'
import { data2 } from './data/data2'
import { data3 } from './data/data3'
import { data4 } from './data/data4'
import { MyTable } from './MyTable/MyTable'
import { IColumn, TValueRowSpanObject } from './types'

function App() {
  const columns: IColumn[] = [
    {
      name: 'id',
      title: 'ID',
      width: 50,
    },
    {
      name: 'benefitCode',
      title: 'Код',
      width: 200,
    },
    {
      name: 'benefitName',
      title: 'Наименование',
      width: 200,
    },
    {
      name: 'benefitValue',
      title: 'Величина льготы',
      width: 200,
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

  const rowStylePrepare = (row: TValueRowSpanObject) => {
    if (row.id.value === 1) {
      return { backgroundColor: '#aeb1b7' }
    }
  }

  return (
    <div className='App'>
      {/* <h1>Таблица 1</h1>
      <MyTable rows={data1} /> */}
      <h1>Таблица 2</h1>
      <MyTable
        columns={columns}
        rows={data2}
        tableStyle={tableStyle}
        thStyle={thStyle}
        tdStyle={tdStyle}
        rowStylePrepare={rowStylePrepare}
      />
      {/* <h1>Таблица 3</h1>
      <MyTable rows={data3} />
      <h1>Таблица 4</h1>
      <MyTable rows={data4} /> */}
    </div>
  )
}

export default App
