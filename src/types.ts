export type TValue = string | number | boolean
export type TValueFromTo = [number | undefined, number | undefined]

export type TRow = {
  [key: string]: unknown
  items?: TRow[]
}

export type TPreparedRow = { [key: string]: { value: TValue; rowSpan: number } }

export type TFilterMode = 'startWith' | 'contains' | 'select' | 'fromTo' | 'equal'
export type TGetFilterInput = (columnName: string, filterMode: TFilterMode, availableValues?: string[]) => JSX.Element
export type TFilterValue = { [key: string]: { mode: TFilterMode; value: TValue | TValueFromTo } } | undefined

export type TOnSort = (columnName: string) => void
export enum ESortMode {
  ASC = 'asc',
  DESC = 'desc',
}

export interface IColumn {
  name: string
  title: string
  width?: number
  cellRender?: (cellValue: TValue, row?: TPreparedRow) => JSX.Element
  filterMode?: TFilterMode
  sortEnabled?: boolean
  // filter?: { mode: TFilterMode; availableValues?: string[] }
  // type: 'string' | 'number' | 'boolean'
}
