import { debounce } from 'lodash'
import { TFilterValue, TValueFromTo } from '../types'

interface IProps {
  columnName: string
  filterValue: TFilterValue
  setFilterValue: (filterValue: TFilterValue) => void
}

export const FilterFromToInput: React.FC<IProps> = ({ columnName, filterValue, setFilterValue }) => {
  return (
    <>
      <input
        type='number'
        className='filter_input_50'
        name={columnName}
        placeholder='От ...'
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
        name={columnName}
        placeholder='До ...'
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
