import { TFilterValue, TRow } from '../types'

interface IProps<T> {
  columnName: keyof T
  filterValue: TFilterValue<T>
  setFilterValue: (filterValue: TFilterValue<T>) => void
  availableValues: string[]
}

export type TFilterSelectInput<T = TRow> = React.FC<IProps<T>>

export const FilterSelectInput: TFilterSelectInput = ({ columnName, filterValue, setFilterValue, availableValues }) => {
  return (
    <select
      className='filter_input'
      name={columnName as string}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterValue({
          ...filterValue,
          [e.target.name]: { mode: 'select', value: e.target.value },
        })
      }}
    >
      <option defaultChecked key={-1}>
        Все
      </option>
      {availableValues?.map((item, idx) => (
        <option key={idx}>{item}</option>
      ))}
    </select>
  )
}
