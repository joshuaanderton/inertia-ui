import React, { useLayoutEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { lang as __ } from '@inertia-ui/Hooks/useLang'
import Heading from '@inertia-ui/Components/Heading'
import { Link } from '@inertiajs/react'

interface Props {
  columns: Array<string|null|{title?: string, className?: string, mobile?: boolean}>
  rows: Array<string|number|(() => JSX.Element)>[]
  rowIdColumnIndex?: number
  footerRow?: Array<string|null>
  preSelectedRows?: number[]
  fixedHeader?: boolean
  pagination?: any
  bulkActions?(): JSX.Element
  onSelect?: (selectedRows: number[]) => void
  className?: string
}

const Table: React.FC<Props> = ({
  columns,
  rows,
  rowIdColumnIndex,
  footerRow,
  preSelectedRows,
  pagination,
  bulkActions,
  onSelect,
  fixedHeader = false,
  className = ''
}) => {

  const searchParams = new URL(window.location.href).searchParams

  searchParams.delete('page')

  const [selectedRows, setSelectedRows] = useState<any[]>(preSelectedRows || []),
        checkbox = useRef<HTMLInputElement>(null),
        [checked, setChecked] = useState(false),
        [indeterminate, setIndeterminate] = useState(false),
        paginationLinks = pagination?.links.filter((link: any) => (
          !(link.label.includes('Previous') && pagination.prev_page_url === null) &&
          !(link.label.includes('Next') && pagination.next_page_url === null)
        ))

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
    setSelectedRows(checked || indeterminate ? [] : rows.map((rowColumns, rowIndex) => (
      rowIdColumnIndex !== undefined && !!rowColumns[rowIdColumnIndex]
        ? rowColumns[rowIdColumnIndex] as number
        : rowIndex
    )))
    setChecked(!checked && !indeterminate)
    setIndeterminate(false)
  }

  if (rows.length === 0) {
    return <></>
  }

  return (
    <div className={classNames('flex-1 flex flex-col overflow-scroll px-3', className)}>
      <div className="flex-1 -mx-3">
        <table className="relative min-w-full table-fixed divide-y site-divide-color border-b site-border-color">

          {columns && (
            <thead>
              <tr>

                {bulkActions && (
                  <th scope="col" className={classNames({'sticky top-0 z-10 bg-gradient-to-t from-chrome-100 to-white': fixedHeader}, 'px-7 sm:w-12 sm:px-6')}>
                    <input
                      type="checkbox"
                      className="hover:cursor-pointer absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded site-border-color text-primary-600 focus:ring-primary-600"
                      ref={checkbox}
                      checked={checked}
                      onChange={toggleAll}
                    />
                  </th>
                )}

                {columns.map((column, columnIndex) => {

                  let columnTitle: string|null,
                      columnClassName = classNames({
                        'sticky top-0 z-10 bg-gradient-to-t from-chrome-100 to-white': fixedHeader
                      }, [
                        'py-3.5',
                        'px-3',
                        'text-left',
                        'text-sm',
                        'font-semibold'
                      ], (column as any)?.className || null)

                  if (!column) {
                    columnTitle = null
                  } else if (typeof column === 'object') {
                    columnTitle = column.title || null
                    columnClassName = classNames(columnClassName, column.mobile !== undefined ? (column.mobile ? '' : '!hidden md:!table-cell') : '')
                  } else {
                    columnTitle = column
                  }

                  return (
                    <th key={`${columnIndex}-header`} scope="col" className={columnClassName}>

                      {columnIndex === 0 && selectedRows.length > 0 && typeof bulkActions !== 'boolean' && (
                        <div className="absolute top-2 z-20 flex items-center space-x-3">
                          {bulkActions?.()}
                        </div>
                      )}

                      {columnTitle && (
                        <Heading title={columnTitle} type="h4" size="sm" className="whitespace-nowrap" />
                      )}

                    </th>
                  )
                })}

              </tr>
            </thead>
          )}

          <tbody className="divide-y site-divide-color">
            {rows.map((rowColumns, rowIndex) => {

              const id = rowIdColumnIndex !== undefined && !!rowColumns[rowIdColumnIndex]
                ? rowColumns[rowIdColumnIndex] as number
                : rowIndex

              return (
                <tr key={id} className={selectedRows.includes(id) ? 'bg-black/5' : undefined}>
                  {bulkActions && (
                    <td className="relative px-7 sm:w-12 sm:px-6">
                      {selectedRows.includes(id) && (
                        <div className="absolute inset-y-0 left-0 w-0.5 bg-primary-600" />
                      )}
                      <input
                        type="checkbox"
                        className="hover:cursor-pointer absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded site-border-color text-primary-600 focus:ring-primary-600"
                        value={id}
                        checked={selectedRows.includes(id)}
                        onChange={(event: any) =>
                          setSelectedRows(
                            event.target.checked
                              ? [...selectedRows, id]
                              : selectedRows.filter((index) => index !== id)
                          )
                        }
                      />
                    </td>
                  )}
                  {rowColumns.filter((_, rowColIdx) => rowIdColumnIndex === undefined || rowColIdx !== rowIdColumnIndex).map((rowColumn, rowColumnIndex) => (
                    <td key={rowColumnIndex} scope="col" className={classNames(
                      rowColumnIndex === 0 ? 'font-semibold' : 'font-normal',
                      'py-3.5 px-3 text-left text-sm whitespace-nowrap',
                      (
                        typeof columns[rowColumnIndex] === 'object' &&
                        (columns[rowColumnIndex] as any).mobile !== undefined
                      ) ? ((columns[rowColumnIndex] as any).mobile ? '' : '!hidden md:!table-cell') : ''
                    )}>
                      {typeof rowColumn === 'function' ? rowColumn() : rowColumn}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>

          {footerRow && (
            <tfoot>
              <tr>
                {bulkActions && (
                  <th scope="col" className="z-10 sticky bottom-0 bg-chrome-100 px-7 sm:w-12 sm:px-6"></th>
                )}
                {footerRow.map((column, columnIndex) => (
                  <th key={`${columnIndex}-footer`} scope="col" className="z-10 sticky bottom-0 bg-chrome-100 py-3.5 px-3 text-left text-sm font-semibold">
                    {column}
                  </th>
                ))}
              </tr>
            </tfoot>
          )}

        </table>

        {pagination && (
          <div className="w-full p-3 gap-x-3 flex whitespace-nowrap flex-nowrap justify-between">
            <span className="site-text-muted text-sm font-medium">
              {__('Showing')} {pagination.data.length} {__('of')} {pagination.total}
            </span>
            <div className="flex items-stretch text-sm">
              {paginationLinks.map((link: any, index: number) => (
                <span key={link.label+index}>
                  {pagination.links.current_page != link.label && link.label !== '...' ? (
                    <Link href={`${link.url}&${searchParams.toString()}`} className="px-3 site-text-muted">
                      <span dangerouslySetInnerHTML={{ __html: link.label }} />
                    </Link>
                  ) : (
                    <span className="px-3 site-text-muted">
                      {link.label}
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Table
