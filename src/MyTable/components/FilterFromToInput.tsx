import { debounce } from 'lodash'
import { TFilterValue, TRow, TValueFromTo } from '../types'

interface IProps<T> {
  columnName: keyof T
  filterValue: TFilterValue<T>
  setFilterValue: (filterValue: TFilterValue<T>) => void
}

export type TFilterFromToInput<T = TRow> = React.FC<IProps<T>>

export const FilterFromToInput: TFilterFromToInput = ({ columnName, filterValue, setFilterValue }) => {
  return (
    <>
      <input
        type='number'
        className='filter_input_50'
        name={columnName as string}
        placeholder='От ...'
        defaultValue={
          filterValue?.[columnName]?.mode === 'fromTo'
            ? (filterValue?.[columnName]?.value as [number, number])[0]
            : undefined
        }
        onInput={debounce((e: React.ChangeEvent<HTMLInputElement>) => {
          const to: number | undefined = (filterValue?.[columnName]?.value as TValueFromTo)?.[1]
          setFilterValue({
            ...filterValue,
            [e.target.name]: {
              mode: 'fromTo',
              value: [+e.target.value, to],
            },
          })
        }, 1000)}
      />
      <input
        type='number'
        className='filter_input_50'
        name={columnName as string}
        placeholder='До ...'
        defaultValue={
          filterValue?.[columnName]?.mode === 'fromTo'
            ? (filterValue?.[columnName]?.value as [number, number])[1]
            : undefined
        }
        onInput={debounce((e: React.ChangeEvent<HTMLInputElement>) => {
          const from: number | undefined = (filterValue?.[columnName]?.value as TValueFromTo)?.[0]
          setFilterValue({
            ...filterValue,
            [e.target.name]: {
              mode: 'fromTo',
              value: [from, +e.target.value],
            },
          })
        }, 1000)}
      />
    </>
  )
}
