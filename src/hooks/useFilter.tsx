import { useState } from 'react'
import { TFilterMode, TValue } from '../types'

type TGetFilterInput = (columnName: string, filterMode: TFilterMode) => JSX.Element
type TFilterValue = { [key: string]: { mode: TFilterMode; value: TValue } } | undefined
type TUseFilter = () => [TFilterValue, TGetFilterInput]

export const useFilter: TUseFilter = () => {
  const [filterValue, setFilterValue] = useState<TFilterValue>()

  const getFilterInput: TGetFilterInput = (columnName, filterMode) => {
    const filters: Record<TFilterMode, JSX.Element> = {
      startWith: (
        <input
          type='text'
          className='filter_input'
          name={columnName}
          placeholder='Начинается с ...'
          onBlur={(e) => {
            if (!e.target.value || filterValue?.[e.target.name]?.value === e.target.value) return
            setFilterValue({
              ...filterValue,
              [e.target.name]: { mode: 'startWith', value: e.target.value },
            })
          }}
        />
      ),
      contains: (
        <input
          type='text'
          className='filter_input'
          name={columnName}
          placeholder='Содержит ...'
          onBlur={(e) => {
            if (!e.target.value || filterValue?.[e.target.name]?.value === e.target.value) return
            setFilterValue({
              ...filterValue,
              [e.target.name]: { mode: 'contains', value: e.target.value },
            })
          }}
        />
      ),
      select: <></>,
      fromTo: <></>,
      equal: <></>,
    }

    return filters[filterMode]
  }

  return [filterValue, getFilterInput]
}
