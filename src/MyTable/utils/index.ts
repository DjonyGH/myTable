import { IColumn, TRow, TPreparedRow, IMultiLevelColumn, TPreparedColumns } from '../types'

export const isArray = (arg: any) => {
  return Object.prototype.toString.call(arg) === '[object Array]'
}

export const isTRow = (arg: any) => {
  return (
    Object.prototype.toString.call(arg) === '[object String]' ||
    Object.prototype.toString.call(arg) === '[object Number]' ||
    Object.prototype.toString.call(arg) === '[object Boolean]'
  )
}

type TGetValueRowSpanObject = <T extends TRow>(obj: Object) => TPreparedRow<T>

export const getValueRowSpanObject: TGetValueRowSpanObject = <T extends TRow>(obj: Object) => {
  const resulTRow: TPreparedRow<T> = {} as TPreparedRow<T>
  ;(Object.keys(obj) as (keyof typeof obj)[]).forEach((key: keyof typeof obj) => {
    if (isTRow(obj[key])) {
      //@ts-ignore
      resulTRow[key] = { value: obj[key], rowSpan: 1 }
    }
  })

  return resulTRow
}

type TIncrementRowSpan = <T extends TRow>(obj: TPreparedRow<T>, acc: TPreparedRow<T>[]) => void

export const incrementRowSpan: TIncrementRowSpan = <T extends TRow>(obj: TPreparedRow<T>, acc: TPreparedRow<T>[]) => {
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

type TPrepareRows = <T extends TRow>(rows: TRow[]) => TPreparedRow<T>[]

export const prepareRows: TPrepareRows = <T extends TRow>(rows: TRow[]) => {
  return rows.reduce((acc: TPreparedRow<T>[], row: TRow) => {
    const el1 = getValueRowSpanObject<T>(row)

    if ('items' in row) {
      row.items?.forEach((item: TRow, index: number) => {
        const r2 = getValueRowSpanObject<T>(item)
        if ('items' in item) {
          // Если внутри items есть items
          if (!index) {
            item.items?.forEach((it: TRow, idx: number) => {
              const r3 = getValueRowSpanObject<T>(it)
              if (!idx) {
                acc.push({ ...el1, ...r2, ...r3 })
              } else {
                acc.push(r3)
                incrementRowSpan<T>(el1, acc)
                incrementRowSpan<T>(r2, acc)
              }
            })
          } else {
            item.items?.forEach((it: TRow, idx: number) => {
              const r3 = getValueRowSpanObject<T>(it)
              if (!idx) {
                acc.push({ ...r2, ...r3 })
                incrementRowSpan<T>(el1, acc)
              } else {
                acc.push(r3)
                incrementRowSpan<T>(el1, acc)
                incrementRowSpan<T>(r2, acc)
              }
            })
          }
        } else {
          // Если внутри items есть только простые поля
          if (!index) {
            acc.push({ ...el1, ...r2 })
          } else {
            acc.push(r2)
            incrementRowSpan<T>(el1, acc)
          }
        }
      })
    } else {
      const valueRowSpanObj = getValueRowSpanObject<T>(row)
      acc.push(valueRowSpanObj)
    }

    return acc
  }, [] as TPreparedRow<T>[])
}

type TPrepareColumns = <T extends TRow>(
  columns: IColumn<T>[] | undefined,
  rows: TPreparedRow<T>[]
) => TPreparedColumns<T>

export const prepareColumns: TPrepareColumns = <T extends TRow>(
  columns: IColumn<T>[] | undefined,
  rows: TPreparedRow<T>[]
) => {
  let preparedColumnsForHead: IMultiLevelColumn<T>[][] | undefined
  let preparedColumnsForBody: IColumn<T>[] = []

  if ((!columns || !columns.length) && rows[0]) {
    preparedColumnsForBody = Object.keys(rows[0]).map((item) => ({ name: item, title: item }))
  } else {
    columns && (preparedColumnsForBody = columns)
  }

  const isMultiLevelHeader = (preparedColumnsForBody as IColumn<T>[]).some((col) => col.items && col.items.length)

  if (isMultiLevelHeader) {
    const row1: IMultiLevelColumn<T>[] = preparedColumnsForBody.reduce((acc, col) => {
      const isGroupedCol = col.items && col.items.length
      if (!isGroupedCol) {
        acc.push({
          ...col,
          rowSpan: 2,
          colSpan: 1,
        })
      } else {
        acc.push({
          ...col,
          rowSpan: 1,
          colSpan: col!.items!.length,
        })
      }
      return acc
    }, [] as IMultiLevelColumn<T>[])

    const row2: IMultiLevelColumn<T>[] = preparedColumnsForBody.reduce((acc, col) => {
      const isGroupedCol = col.items && col.items.length
      if (isGroupedCol) {
        col.items?.forEach((item) => {
          acc.push({
            ...item,
            rowSpan: 1,
            colSpan: 1,
          })
        })
      }
      return acc
    }, [] as IMultiLevelColumn<T>[])
    preparedColumnsForHead = [row1, row2]
    preparedColumnsForBody = preparedColumnsForBody.reduce((acc, col) => {
      const isGroupedCol = col.items && col.items.length
      if (!isGroupedCol) {
        acc.push(col)
      } else {
        col.items?.forEach((subCol) => acc.push(subCol))
      }
      return acc
    }, [] as IColumn<T>[])
  }

  return {
    forTBody: preparedColumnsForBody,
    forTHead: preparedColumnsForHead,
  }
}
