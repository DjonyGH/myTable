import React from 'react'
import styles from './MyTable.module.css'

const isArray = (arg: any) => {
  return Object.prototype.toString.call(arg) === '[object Array]'
}

type TValue = string | number | boolean

type TObject = { [key: string]: any }

const isTObject = (arg: any) => {
  return (
    Object.prototype.toString.call(arg) === '[object String]' ||
    Object.prototype.toString.call(arg) === '[object Number]' ||
    Object.prototype.toString.call(arg) === '[object Boolean]'
  )
}

type TValueRowSpanObject = { [key: string]: { value: TValue; rowSpan: number } }

type TGetValueRowSpanObject = (obj: Object) => TValueRowSpanObject

const getValueRowSpanObject: TGetValueRowSpanObject = (obj) => {
  const resultObject: TValueRowSpanObject = {}
  ;(Object.keys(obj) as (keyof typeof obj)[]).forEach((key: keyof typeof obj) => {
    if (isTObject(obj[key])) {
      //@ts-ignore
      resultObject[key] = { value: obj[key], rowSpan: 1 }
    }
  })

  return resultObject
}

const incrementRowSpan = (obj: TValueRowSpanObject, acc: TValueRowSpanObject[]) => {
  const reverseIndex = [...acc].reverse().findIndex((el) => {
    let condition: number = 0
    Object.keys(obj).forEach((key) => {
      ;(!(key in el) || obj[key].value !== el[key]?.value) && ++condition
    })
    return !condition
  })

  const index = acc.length - 1 - reverseIndex

  reverseIndex !== -1 &&
    Object.keys(obj).forEach((key) => {
      ++acc[index][key].rowSpan
    })
}

interface IProps {
  // columns: any[]
  rows: TObject[]
}

export const MyTable: React.FC<IProps> = ({ rows }) => {
  const calcRows = rows.reduce((acc: TValueRowSpanObject[], row: TObject) => {
    const el1 = getValueRowSpanObject(row)

    if ('items' in row) {
      row.items?.forEach((item: TObject, index: number) => {
        const r2 = getValueRowSpanObject(item)
        if ('items' in item) {
          // Если внутри items есть items
          if (!index) {
            item.items.forEach((it: TObject, idx: number) => {
              const r3 = getValueRowSpanObject(it)
              if (!idx) {
                acc.push({ ...el1, ...r2, ...r3 })
              } else {
                acc.push(r3)
                incrementRowSpan(el1, acc)
                incrementRowSpan(r2, acc)
              }
            })
          } else {
            item.items.forEach((it: TObject, idx: number) => {
              const r3 = getValueRowSpanObject(it)
              if (!idx) {
                acc.push({ ...r2, ...r3 })
                incrementRowSpan(el1, acc)
              } else {
                acc.push(r3)
                incrementRowSpan(el1, acc)
                incrementRowSpan(r2, acc)
              }
            })
          }
        } else {
          // Если внутри items есть только простые поля
          if (!index) {
            acc.push({ ...el1, ...r2 })
          } else {
            acc.push(r2)
            incrementRowSpan(el1, acc)
          }
        }
      })
    } else {
      const valueRowSpanObj = getValueRowSpanObject(row)
      acc.push(valueRowSpanObj)
    }

    return acc
  }, [] as TValueRowSpanObject[])

  return (
    <table className={styles.table}>
      <tbody>
        {calcRows.map((row: any, idx: number) => (
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
