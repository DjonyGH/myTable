import { IApiTableRow } from './types'

export const rows: IApiTableRow[] = [
  {
    prop: 'columns',
    description: 'Свойство, отвечающее за описание колонок таблицы',
    type: 'TColumn[]',
  },
  {
    prop: 'rows',
    description: 'Строки с данными для отображения в таблице',
    type: 'TRow[]',
  },
  {
    prop: 'filterEnabled',
    description: 'Состояние фильтра',
    type: 'boolean',
    defaultValue: 'false',
  },
  {
    prop: 'filterAvailableValues',
    description: 'Объект с возможными значениями для фильтра',
    type: 'TAvailableValues[]',
  },
  {
    prop: 'width',
    description: 'Ширина таблицы, в процентах',
    type: 'number',
    defaultValue: '100',
  },
  {
    prop: 'onLoadData',
    description: 'Callback для загрузки данных и возможных значений для фильтра, срабатывает при изменении фильтра',
    type: 'TOnLoadData',
  },
  {
    prop: 'onCellClick',
    description: 'Callback срабатывает при клике по ячейке',
    type: 'TOnCellClick',
  },
  {
    prop: 'resetFilter',
    description: 'Сброс фильтра',
    type: 'boolean',
    defaultValue: 'false',
  },
  {
    prop: 'defaultSort',
    description: 'Сортировка при начальной загрузке',
    type: 'TDefaultSort',
  },
  {
    prop: 'headerJSX',
    description: 'Разметка до таблицы',
    type: 'JSX.Element',
  },
  {
    prop: 'footerJSX',
    description: 'Разметка после таблицы',
    type: 'JSX.Element',
  },
  {
    prop: 'styles',
    description: 'Стили для таблицы',
    type: 'TStyles',
  },
]
