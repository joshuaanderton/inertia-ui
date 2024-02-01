import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { lang as __ } from '@inertia-ui/Hooks/useLang'
import Heading from '@inertia-ui/Components/Heading'
import { Link } from '@inertiajs/react'
import { Pagination } from '@inertia-ui/jetstream-types'

interface BaseModelRow {[hash: string]: number|string|boolean|(() => JSX.Element)}

interface ModelRow extends BaseModelRow {
  'id': number
}

export interface ModelPagination extends Pagination {
  data: ModelRow[]
}

interface Props {
  titles: {[hash: string]: string}
  pagination: ModelPagination
  selected?: ModelRow[]
  fixedHeader?: boolean
  actions?:(item: ModelRow) => JSX.Element
  bulkActions?(): JSX.Element
  onSelect?(selected: ModelRow[]): void
  breakpoints?: {
    mobile: string[]
    tablet: string[]
    desktop: string[]
  }
  className?: string
}

const ModelTable: React.FC<Props> = ({
  titles,
  pagination,
  selected,
  breakpoints,
  fixedHeader = false,
  actions,
  bulkActions,
  onSelect,
  ...props
}) => {

  const items = pagination.data,
        [selectedItems, setSelectedItems] = useState<ModelRow[]>(selected || []),
        checkbox = useRef<HTMLInputElement>(null),
        [checked, setChecked] = useState(false),
        [indeterminate, setIndeterminate] = useState(false)

  useEffect(() => {
    if (!window) return
    const searchParams = new URL(window.location.href).searchParams
    searchParams.delete('page')
  }, [])

  useLayoutEffect(() => {
    const isIndeterminate = selectedItems.length > 0 && selectedItems.length < items.length

    setChecked(selectedItems.length === items.length)

    setIndeterminate(isIndeterminate)

    if (checkbox.current) {
      checkbox.current.indeterminate = isIndeterminate
    }

    onSelect?.(selectedItems)

  }, [selectedItems])

  const toggleAll = () => {
    setSelectedItems(
      !(checked || indeterminate)
        ? items
        : []
    )

    setChecked(!checked && !indeterminate)

    setIndeterminate(false)
  }

  if (items.length === 0) {
    return <></>
  }

  return (
    <div className={classNames('flex-1 flex flex-col px-3', props.className)}>
      {/* overflow-x-scroll */}
      <div className="flex-1 -mx-3">
        <table className="relative min-w-full table-fixed divide-y site-divide-color border-b site-border-color">

          {titles && (
            <thead>
              <tr>

                {!!bulkActions && (
                  <th scope="col" className={classNames({'sticky top-0 z-10 bg-gradient-to-t from-chrome-100 to-white': fixedHeader}, 'relative px-7 sm:w-12 sm:px-6')}>
                    <input
                      type="checkbox"
                      className="hover:cursor-pointer absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded site-border-color text-primary-600 focus:ring-primary-600"
                      ref={checkbox}
                      checked={checked}
                      onChange={toggleAll}
                    />
                  </th>
                )}

                {Object.entries(titles).map(([field, title], titleIdx) => (
                  <th
                    key={`${titleIdx}-header`}
                    scope="col"
                    className={classNames(
                      !fixedHeader ? [] : [
                        'sticky',
                        'top-0',
                        'z-10',
                        'bg-gradient-to-t',
                        'from-chrome-100',
                        'to-white'
                      ], [
                        'relative',
                        'py-3.5',
                        'px-3',
                        'text-left',
                        'text-sm',
                        'font-semibold'
                      ],
                      titleIdx === 0 ? '!hidden md:!table-cell' : ''
                    )}
                  >
                    {titleIdx === 0 && selectedItems.length > 0 && typeof bulkActions !== 'boolean' && (
                      <div className="absolute bg-white dark:bg-chrome-950 top-2 z-20 flex items-center space-x-3">
                        {bulkActions?.()}
                      </div>
                    )}
                    <Heading title={title} type="h4" size="sm" className="whitespace-nowrap" />
                  </th>
                ))}

                {!!actions && <th></th>}

              </tr>
            </thead>
          )}

          <tbody className="divide-y site-divide-color">
            {items.map(item => {

              const isSelected = selectedItems.map(selectedItem => selectedItem.id).includes(item.id)

              return (
                <tr key={item.id} className={isSelected ? 'bg-black/5' : undefined}>
                  {!!bulkActions && (
                    <td className="relative px-7 sm:w-12 sm:px-6">
                      {isSelected && (
                        <div className="absolute inset-y-0 left-0 w-0.5 bg-primary-600" />
                      )}
                      <input
                        type="checkbox"
                        className="hover:cursor-pointer absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded site-border-color text-primary-600 focus:ring-primary-600"
                        value={item.id}
                        checked={isSelected}
                        onChange={(event: any) =>
                          setSelectedItems(
                            event.target.checked
                              ? [...selectedItems, item]
                              : selectedItems.filter(selectedItem => selectedItem.id !== item.id)
                          )
                        }
                      />
                    </td>
                  )}
                  {Object.entries(titles).map(([field], titleIdx) => {
                    const value = item[field]
                    return (
                      <td key={field} scope="col" className={classNames(
                        'py-3.5 px-3 text-left text-sm whitespace-nowrap',
                        // Style first column
                        // Hide all except for first column on mobile
                        titleIdx === 0 ? 'font-semibold' : 'font-normal !hidden md:!table-cell',
                      )}>
                        {typeof value === 'function' ? value() : value}
                      </td>
                    )
                  })}
                  {!!actions && <td>{actions?.(item)}</td>}
                </tr>
              )
            })}
          </tbody>
        </table>

        {pagination && (
          <div className="w-full p-3 gap-x-3 flex whitespace-nowrap flex-nowrap justify-between">
            <span className="site-text-muted text-sm font-medium">
              {__('Showing')} {pagination.data.length} {__('of')} {pagination.total}
            </span>
            {!(pagination.current_page === 1 && pagination.next_page_url === null) && (
              <div className="flex items-stretch text-sm">
                {pagination.links.map((link, linkIdx) => (
                  <span key={link.label+linkIdx}>
                    {!link.active && link.label !== '...' ? (
                      <Link href={link.url} className="px-3 site-text-muted">
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
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ModelTable
