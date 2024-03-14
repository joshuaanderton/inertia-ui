import React, { useLayoutEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { lang as __ } from '@inertia-ui/Hooks/useLang'
import Heading from '@inertia-ui/Components/Heading'

interface Props {
  columns: Array<string|{ value: string, hideForMobile: boolean }|null>
  rows: Array<string|number|(() => JSX.Element)>[]
  selected?: number[]
  onSelect?: (selected: number[]) => void
  bulkActions?(): JSX.Element
  className?: string
}

const Table: React.FC<Props> = ({
  columns,
  rows,
  selected = [],
  onSelect,
  bulkActions,
  className = ''
}) => {

  const checkbox = useRef<HTMLInputElement>(null),
        [checked, setChecked] = useState(false),
        [indeterminate, setIndeterminate] = useState(false)

  const handleSelect = (checked: boolean, index: number) => (
    onSelect?.(
      checked
        ? [...selected, index]
        : selected.filter(sIdx => sIdx !== index)
    )
  )

  const toggleAll = () => {
    onSelect?.(checked || indeterminate ? [] : rows.map((_, index) => index))
    setChecked(!checked && !indeterminate)
    setIndeterminate(false)
  }

  if (rows.length === 0) {
    return <></>
  }

  return (
    <div className={classNames('relative', className)}>
      {selected.length > 0 && typeof bulkActions !== 'boolean' && (
        <div className="absolute left-14 top-2 flex h-9 items-center space-x-3 site-bg sm:left-12">
          {bulkActions?.()}
        </div>
      )}
      <table className="min-w-full table-fixed divide-y site-divide">
        {columns && (
          <thead>
            <tr>
              {bulkActions && (
                <th scope="col" className="relative px-7 sm:w-12 sm:px-6">
                  <input
                    type="checkbox"
                    className="hover:cursor-pointer absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded site-border text-primary-600 focus:ring-primary-600"
                    ref={checkbox}
                    checked={checked}
                    onChange={toggleAll}
                  />
                </th>
              )}
              {columns.map((column, columnIndex) => {

                if (column === null) {
                  return <th key={columnIndex} scope="col"></th>
                }

                let value = typeof column === 'string' ? column : column.value,
                    hideForMobile = typeof column === 'object' && column.hideForMobile

                return (
                  <th key={columnIndex} scope="col" className={classNames(
                    'py-3.5 px-3 text-left text-sm font-semibold',
                    hideForMobile ? 'hidden md:table-cell' : '',
                  )}>
                    <Heading title={value} type="h4" size="sm" className="whitespace-nowrap" />
                  </th>
                )
              })}
            </tr>
          </thead>
        )}
        <tbody className="divide-y site-divide">
          {rows.map((rowColumns, rowIndex) => {

            return (
              <tr key={rowIndex} className={selected.includes(rowIndex) ? 'bg-black/5' : undefined}>
                {bulkActions && (
                  <td className="relative px-7 sm:w-12 sm:px-6">
                    {selected.includes(rowIndex) && (
                      <div className="absolute inset-y-0 left-0 w-0.5 bg-primary-600" />
                    )}
                    <input
                      type="checkbox"
                      className="hover:cursor-pointer absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded site-border text-primary-600 focus:ring-primary-600"
                      value={rowIndex}
                      checked={selected.includes(rowIndex)}
                      onChange={event => handleSelect(event.target.checked, rowIndex)}
                    />
                  </td>
                )}
                {rowColumns.map((tableCell, rowColumnIndex) => {

                  let rowColumn = columns[rowColumnIndex],
                      hideForMobile = !!rowColumn && typeof rowColumn === 'object' && rowColumn.hideForMobile

                  return (
                    <td key={rowColumnIndex} scope="col" className={classNames(
                      hideForMobile ? 'hidden md:table-cell' : '',
                      rowColumnIndex === 0 ? 'font-semibold' : 'font-normal',
                      'py-3.5 px-3 text-left text-sm'
                    )}>
                      {typeof tableCell === 'function' ? tableCell() : tableCell}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table
