export type TValue = string | number | boolean

export type TRow = {
  [key: string]: unknown
  items?: TRow[]
}

export type TValueRowSpanObject = { [key: string]: { value: TValue; rowSpan: number } }

export interface IColumn {
  name: string
  title: string
  width?: number
  cellRender?: (cellValue: TValue, row?: TValueRowSpanObject) => JSX.Element
  filter?: { mode: 'startWith' | 'contains' | 'select' | 'fromTo'; availableValues?: string[] }
  // type: 'string' | 'number' | 'boolean'
}
