import { debounce } from 'lodash'
import { useState } from 'react'
import { FilterFromToInput } from '../components/FilterFromToInput'
import { FilterSelectInput } from '../components/FilterSelectInput'
import { FilterTextInput } from '../components/FilterTextInput'
import { TFilterMode, TFilterValue, TGetFilterInput, TValueFromTo } from '../types'

export type TUseFilter = () => [TFilterValue, TGetFilterInput]

export const useFilter: TUseFilter = () => {
  const [filterValue, setFilterValue] = useState<TFilterValue>()

  const getFilterInput: TGetFilterInput = (columnName, filterMode, availableValues) => {
    const filters: Record<TFilterMode, JSX.Element> = {
      startWith: (
        <FilterTextInput
          columnName={columnName}
          mode={filterMode}
          placeholder='Начинается с ...'
          filterValue={filterValue}
          setFilterValue={setFilterValue}
        />
      ),
      contains: (
        <FilterTextInput
          columnName={columnName}
          mode={filterMode}
          placeholder='Содержит ...'
          filterValue={filterValue}
          setFilterValue={setFilterValue}
        />
      ),
      select: (
        <FilterSelectInput
          columnName={columnName}
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          availableValues={availableValues || []}
        />
      ),
      fromTo: <FilterFromToInput columnName={columnName} filterValue={filterValue} setFilterValue={setFilterValue} />,
      equal: (
        <FilterTextInput
          columnName={columnName}
          mode={filterMode}
          placeholder='Равно ...'
          filterValue={filterValue}
          setFilterValue={setFilterValue}
        />
      ),
    }

    return filters[filterMode]
  }

  return [filterValue, getFilterInput]
}
