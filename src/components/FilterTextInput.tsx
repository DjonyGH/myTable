import { debounce } from 'lodash'
import { TFilterMode, TFilterValue } from '../types'

interface IProps {
  columnName: string
  mode: TFilterMode
  placeholder: string
  filterValue: TFilterValue
  setFilterValue: (filterValue: TFilterValue) => void
}

export const FilterTextInput: React.FC<IProps> = ({ columnName, mode, placeholder, filterValue, setFilterValue }) => {
  return (
    <input
      type='text'
      className='filter_input'
      name={columnName}
      placeholder={placeholder}
      onInput={debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterValue({
          ...filterValue,
          [e.target.name]: { mode, value: e.target.value },
        })
      }, 1000)}
    />
  )
}
