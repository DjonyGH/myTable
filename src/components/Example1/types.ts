import { TRow } from '../../MyTable/types'

export interface IExample1TableRow extends TRow {
  id: number
  benefitCode: string
  benefitName: string
  benefitValue: number
  isApplied: boolean
}
