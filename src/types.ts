export type TValue = string | number | boolean

export type TObject = { [key: string]: any }

export type TValueRowSpanObject = { [key: string]: { value: TValue; rowSpan: number } }

export interface IColumn {
  name: string
  title: string
  width: number
  // type: 'string' | 'number' | 'boolean'
  // cellRender: (cell: {[key: string]: TValue}) => void
}
