export type TValue = string | number | boolean

export type TObject = { [key: string]: any }

export type TValueRowSpanObject = { [key: string]: { value: TValue; rowSpan: number } }
