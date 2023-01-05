import { debounce } from 'lodash'
import { useState } from 'react'
import { TFilterMode, TFilterValue, TGetFilterInput } from '../types'

export type TUseFilter = () => [TFilterValue, TGetFilterInput]

export const useFilter: TUseFilter = () => {
  const [filterValue, setFilterValue] = useState<TFilterValue>()

  const getFilterInput: TGetFilterInput = (columnName, filterMode, availableValues) => {
    const filters: Record<TFilterMode, JSX.Element> = {
      startWith: (
        <input
          type='text'
          className='filter_input'
          name={columnName}
          placeholder='Начинается с ...'
          onInput={debounce((e: React.ChangeEvent<HTMLInputElement>) => {
            setFilterValue({
              ...filterValue,
              [e.target.name]: { mode: 'startWith', value: e.target.value },
            })
          }, 1000)}
        />
      ),
      contains: (
        <input
          type='text'
          className='filter_input'
          name={columnName}
          placeholder='Содержит ...'
          onInput={debounce((e: React.ChangeEvent<HTMLInputElement>) => {
            setFilterValue({
              ...filterValue,
              [e.target.name]: { mode: 'contains', value: e.target.value },
            })
          }, 1000)}
        />
      ),
      select: (
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
      ),
      fromTo: <></>,
      equal: <></>,
    }

    return filters[filterMode]
  }

  return [filterValue, getFilterInput]
}
