import { debounce } from 'lodash'
import { TFilterMode, TFilterValue, TRow } from '../types'

interface IProps<T> {
  columnName: keyof T
  mode: TFilterMode
  placeholder: string
  filterValue: TFilterValue
  setFilterValue: (filterValue: TFilterValue) => void
}

export type TFilterTextInput<T = TRow> = React.FC<IProps<T>>

export const FilterTextInput: TFilterTextInput = ({ columnName, mode, placeholder, filterValue, setFilterValue }) => {
  return (
    <input
      type='text'
      className='filter_input'
      name={columnName as string}
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
