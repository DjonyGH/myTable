import { useEffect, useState } from 'react'
import { FilterFromToInput, TFilterFromToInput } from '../components/FilterFromToInput'
import { FilterSelectInput, TFilterSelectInput } from '../components/FilterSelectInput'
import { FilterTextInput, TFilterTextInput } from '../components/FilterTextInput'
import { TFilterMode, TFilterValue, TGetFilterInput, TRow } from '../types'

export type TUseFilter = <T extends TRow>(
  defaultValue: TFilterValue<T>,
  resetFilter?: [boolean, (value: boolean) => void]
) => [TFilterValue<T>, TGetFilterInput<T>]

export const useFilter: TUseFilter = <T extends TRow>(
  defaultValue: TFilterValue<T>,
  resetFilter?: [boolean, (value: boolean) => void]
) => {
  const [filterValue, setFilterValue] = useState<TFilterValue<T>>(defaultValue)

  const FilterTextInputTyped = FilterTextInput as TFilterTextInput<T>
  const FilterSelectInputTyped = FilterSelectInput as TFilterSelectInput<T>
  const FilterFromToInputTyped = FilterFromToInput as TFilterFromToInput<T>

  const getFilterInput: TGetFilterInput<T> = (columnName, filterMode, availableValues) => {
    const filters: Record<TFilterMode, JSX.Element> = {
      startWith: !resetFilter?.[0] ? (
        <FilterTextInputTyped
          columnName={columnName}
          mode={filterMode}
          placeholder='Начинается с ...'
          filterValue={filterValue}
          setFilterValue={setFilterValue}
        />
      ) : (
        <></>
      ),
      contains: !resetFilter?.[0] ? (
        <FilterTextInputTyped
          columnName={columnName}
          mode={filterMode}
          placeholder='Содержит ...'
          filterValue={filterValue}
          setFilterValue={setFilterValue}
        />
      ) : (
        <></>
      ),
      select: !resetFilter?.[0] ? (
        <FilterSelectInputTyped
          columnName={columnName}
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          availableValues={availableValues || []}
        />
      ) : (
        <></>
      ),
      fromTo: !resetFilter?.[0] ? (
        <FilterFromToInputTyped columnName={columnName} filterValue={filterValue} setFilterValue={setFilterValue} />
      ) : (
        <></>
      ),
      equal: !resetFilter?.[0] ? (
        <FilterTextInputTyped
          columnName={columnName}
          mode={filterMode}
          placeholder='Равно ...'
          filterValue={filterValue}
          setFilterValue={setFilterValue}
        />
      ) : (
        <></>
      ),
    }

    return filters[filterMode]
  }

  const cleanFilter = () => {
    console.log('cleanFilter')
    setFilterValue({} as TFilterValue<T>)
  }

  useEffect(() => {
    if (resetFilter?.[0]) {
      cleanFilter()
      resetFilter?.[1](false)
    }
  }, [resetFilter?.[0]]) //eslint-disable-line

  return [filterValue, getFilterInput]
}
