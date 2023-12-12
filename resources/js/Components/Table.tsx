import React, { useLayoutEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { lang as __ } from '@inertia-ui/Hooks/useLang'
import Heading from '@inertia-ui/Components/Heading'

interface Props {
  columns?: Array<string|null>
  footerColumns?: Array<string|null>
  rows: Array<string|number|(() => JSX.Element)>[]
  preSelectedRows?: number[]
  fixedHeader?: boolean
  bulkActions?(): JSX.Element
  onSelect?: (selectedRows: number[]) => void
  className?: string
}

const Table: React.FC<Props> = ({
  columns,
  footerColumns,
  rows,
  preSelectedRows,
  bulkActions,
  onSelect,
  fixedHeader = false,
  className = ''
}) => {

  const [selectedRows, setSelectedRows] = useState<any[]>(preSelectedRows || []),
        checkbox = useRef<HTMLInputElement>(null),
        [checked, setChecked] = useState(false),
        [indeterminate, setIndeterminate] = useState(false)

  useLayoutEffect(() => {
    const isIndeterminate = selectedRows.length > 0 && selectedRows.length < rows.length
    setChecked(selectedRows.length === rows.length)
    setIndeterminate(isIndeterminate)
    if (checkbox.current) {
      checkbox.current.indeterminate = isIndeterminate
    }
    onSelect?.(selectedRows)
  }, [selectedRows])

  const toggleAll = () => {
    setSelectedRows(checked || indeterminate ? [] : rows.map((_, index) => index))
    setChecked(!checked && !indeterminate)
    setIndeterminate(false)
  }

  if (rows.length === 0) {
    return <></>
  }

  return (
    <div className={classNames('h-full relative -mx-3 overflow-scroll', className)}>
      {selectedRows.length > 0 && typeof bulkActions !== 'boolean' && (
        <div className="absolute left-14 top-2 flex h-9 items-center space-x-3 site-bg sm:left-12">
          {bulkActions?.()}
        </div>
      )}
      <table className="relative min-w-full table-fixed divide-y site-divide-color">
        {columns && (
          <thead>
            <tr>
              {bulkActions && (
                <th scope="col" className="z-10 sticky top-0 bg-chrome-100 px-7 sm:w-12 sm:px-6">
                  <input
                    type="checkbox"
                    className="hover:cursor-pointer absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded site-border-color text-primary-600 focus:ring-primary-600"
                    ref={checkbox}
                    checked={checked}
                    onChange={toggleAll}
                  />
                </th>
              )}
              {columns.map((column, columnIndex) => (
                <th key={columnIndex} scope="col" className="z-10 sticky top-0 bg-chrome-100 py-3.5 px-3 text-left text-sm font-semibold">
                  {column !== null && <Heading title={column} type="h4" size="sm" className="whitespace-nowrap" />}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody className="divide-y site-divide-color">
          {rows.map((rowColumns, rowIndex) => (
            <tr key={rowIndex} className={selectedRows.includes(rowIndex) ? 'bg-black/5' : undefined}>
              {bulkActions && (
                <td className="relative px-7 sm:w-12 sm:px-6">
                  {selectedRows.includes(rowIndex) && (
                    <div className="absolute inset-y-0 left-0 w-0.5 bg-primary-600" />
                  )}
                  <input
                    type="checkbox"
                    className="hover:cursor-pointer absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded site-border-color text-primary-600 focus:ring-primary-600"
                    value={rowIndex}
                    checked={selectedRows.includes(rowIndex)}
                    onChange={(event: any) =>
                      setSelectedRows(
                        event.target.checked
                          ? [...selectedRows, rowIndex]
                          : selectedRows.filter((index) => index !== rowIndex)
                      )
                    }
                  />
                </td>
              )}
              {rowColumns.map((rowColumn, rowColumnIndex) => (
                <td key={rowColumnIndex} scope="col" className={classNames(
                  rowColumnIndex === 0 ? 'font-semibold' : 'font-normal',
                  'py-3.5 px-3 text-left text-sm whitespace-nowrap'
                )}>
                  {typeof rowColumn === 'function' ? rowColumn() : rowColumn}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {footerColumns && (
          <thead>
            <tr>
              {bulkActions && (
                <th scope="col" className="z-10 sticky bottom-0 bg-chrome-100 px-7 sm:w-12 sm:px-6"></th>
              )}
              {footerColumns.map((column, columnIndex) => (
                <th key={columnIndex} scope="col" className="z-10 sticky bottom-0 bg-chrome-100 py-3.5 px-3 text-left text-sm font-semibold">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
        )}
      </table>
    </div>
  )
}

export default Table
