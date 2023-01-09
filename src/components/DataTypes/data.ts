import { ITypesTableRow } from './types'

export const rows: ITypesTableRow[] = [
  {
    type: 'TColumn',
    description: `    {
      name: string
      title: string
      width?: number
      cellRender?: (cellValue, row) => JSX.Element
      filterMode?: 'startWith' | 'contains' | 'select' | 'fromTo' | 'equal'
      sortEnabled?: boolean
    }`,
  },
  {
    type: 'TDefaultSort',
    description: `    { 
      columnName: string; 
      mode: ESortMode ('asc' | 'desc') 
    }`,
  },
  {
    type: 'TAvailableValues[]',
    description: `    Record<string, string[]>`,
  },
  {
    type: 'TOnCellClick',
    description: `    (cellValue, row) => void`,
  },
  {
    type: 'TOnLoadData',
    description: `    (filterValue) => void`,
  },
  {
    type: 'TRow',
    description: `    {
      [key: string]: unknown
      items?: TRow[]
    }`,
  },
  {
    type: 'TStyles',
    description: `    {
      header?: React.CSSProperties
      table?: React.CSSProperties
      th?: React.CSSProperties
      td?: React.CSSProperties
      filterCell?: React.CSSProperties
      footer?: React.CSSProperties
      sortButton?: React.CSSProperties
      sortButtonActive?: React.CSSProperties
      sortButtonContent?: JSX.Element
      onRowPrepare?: (row, rowIndex) => React.CSSProperties
    }`,
  },
]
