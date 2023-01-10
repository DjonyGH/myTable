import { debounce } from 'lodash'
import { TFilterMode, TFilterValue, TRow } from '../types'

interface IProps<T> {
  columnName: keyof T
  mode: TFilterMode
  placeholder: string
  filterValue: TFilterValue<T>
  setFilterValue: (filterValue: TFilterValue<T>) => void
}

export type TFilterTextInput<T = TRow> = React.FC<IProps<T>>

export const FilterTextInput: TFilterTextInput = ({ columnName, mode, placeholder, filterValue, setFilterValue }) => {
  return (
    <input
      type='text'
      className='filter_input'
      name={columnName as string}
      placeholder={placeholder}
      defaultValue={filterValue?.[columnName]?.mode === mode ? (filterValue?.[columnName]?.value as string) : undefined}
      onInput={debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterValue({
          ...filterValue,
          [e.target.name]: { mode, value: e.target.value },
        })
      }, 1000)}
    />
  )
}
