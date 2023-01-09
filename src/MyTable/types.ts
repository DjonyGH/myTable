export type TValue = string | number | boolean
export type TValueFromTo = [number | undefined, number | undefined]

export type TRow = {
  [key: string]: unknown
  items?: TRow[]
}

export type TPreparedRow<T extends TRow> = { [key in keyof T]: { value: TValue; rowSpan: number } }

export type TFilterMode = 'startWith' | 'contains' | 'select' | 'fromTo' | 'equal'
export type TGetFilterInput<T> = (
  columnName: keyof T,
  filterMode: TFilterMode,
  availableValues?: string[]
) => JSX.Element
export type TFilterValue = { [key: string]: { mode: TFilterMode; value: TValue | TValueFromTo } } | undefined

export type TOnSort<T> = (columnName: keyof T) => void
export enum ESortMode {
  ASC = 'asc',
  DESC = 'desc',
}

export interface IColumn<T extends TRow> {
  name: keyof T
  title: string
  width?: number
  cellRender?: (cellValue: TValue, row?: TPreparedRow<T>) => JSX.Element
  filterMode?: TFilterMode
  sortEnabled?: boolean
}
