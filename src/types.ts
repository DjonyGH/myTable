export type TValue = string | number | boolean
export type TValueFromTo = [number | undefined, number | undefined]

export type TRow = {
  [key: string]: unknown
  items?: TRow[]
}

export type TValueRowSpanObject = { [key: string]: { value: TValue; rowSpan: number } }

export type TFilterMode = 'startWith' | 'contains' | 'select' | 'fromTo' | 'equal'
export type TGetFilterInput = (columnName: string, filterMode: TFilterMode, availableValues?: string[]) => JSX.Element
export type TFilterValue = { [key: string]: { mode: TFilterMode; value: TValue | TValueFromTo } } | undefined

export interface IColumn {
  name: string
  title: string
  width?: number
  cellRender?: (cellValue: TValue, row?: TValueRowSpanObject) => JSX.Element
  filterMode?: TFilterMode
  // filter?: { mode: TFilterMode; availableValues?: string[] }
  // type: 'string' | 'number' | 'boolean'
}
