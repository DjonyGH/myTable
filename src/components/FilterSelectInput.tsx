import { TFilterValue } from '../types'

interface IProps {
  columnName: string
  filterValue: TFilterValue
  setFilterValue: (filterValue: TFilterValue) => void
  availableValues: string[]
}

export const FilterSelectInput: React.FC<IProps> = ({ columnName, filterValue, setFilterValue, availableValues }) => {
  return (
    <select
      className='filter_input'
      name={columnName}
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
