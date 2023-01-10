import { useState } from 'react'
import { FilterFromToInput, TFilterFromToInput } from '../components/FilterFromToInput'
import { FilterSelectInput, TFilterSelectInput } from '../components/FilterSelectInput'
import { FilterTextInput, TFilterTextInput } from '../components/FilterTextInput'
import { TFilterMode, TFilterValue, TGetFilterInput, TRow } from '../types'

export type TUseFilter = <T extends TRow>(
  defaultValue: TFilterValue<T>
) => [TFilterValue<T>, TGetFilterInput<T>, () => void]

export const useFilter: TUseFilter = <T extends TRow>(defaultValue: TFilterValue<T>) => {
  const [filterValue, setFilterValue] = useState<TFilterValue<T>>(defaultValue)

  const FilterTextInputTyped = FilterTextInput as TFilterTextInput<T>
  const FilterSelectInputTyped = FilterSelectInput as TFilterSelectInput<T>
  const FilterFromToInputTyped = FilterFromToInput as TFilterFromToInput<T>

  const getFilterInput: TGetFilterInput<T> = (columnName, filterMode, availableValues) => {
    const filters: Record<TFilterMode, JSX.Element> = {
      startWith: (
        <FilterTextInputTyped
          columnName={columnName}
          mode={filterMode}
          placeholder='Начинается с ...'
          filterValue={filterValue}
          setFilterValue={setFilterValue}
        />
      ),
      contains: (
        <FilterTextInputTyped
          columnName={columnName}
          mode={filterMode}
          placeholder='Содержит ...'
          filterValue={filterValue}
          setFilterValue={setFilterValue}
        />
      ),
      select: (
        <FilterSelectInputTyped
          columnName={columnName}
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          availableValues={availableValues || []}
        />
      ),
      fromTo: (
        <FilterFromToInputTyped columnName={columnName} filterValue={filterValue} setFilterValue={setFilterValue} />
      ),
      equal: (
        <FilterTextInputTyped
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

  const cleanFilter = () => {
    setFilterValue({} as TFilterValue<T>)
  }

  return [filterValue, getFilterInput, cleanFilter]
}
