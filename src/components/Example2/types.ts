import { TRow } from '../../MyTable/types'

export interface IExample2TableRow extends TRow {
  id: number
  benefitCode: string
  benefitName: string
  benefitValue: number
  isApplied: boolean
}
