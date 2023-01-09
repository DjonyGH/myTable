import { TRow } from '../../MyTable/types'

export interface IApiTableRow extends TRow {
  prop: string
  description: string
  type?: string
  defaultValue?: string
}
