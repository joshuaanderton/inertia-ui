import React from 'react'
import { lang as __ } from '@inertia-ui/Hooks/useLang'
import { Pagination as PaginationInterface } from '@/types'
import classNames from 'classnames'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid'
import { router, Link } from '@inertiajs/react'
import useRoute from '@inertia-ui/Hooks/useRoute'
import SecondaryButton from '@/Components/Buttons/SecondaryButton'

interface Props {
  pagination: PaginationInterface
  className?: string
}

const Pagination: React.FC<Props> = ({ pagination, ...props }) => {

  const { links, prev_page_url, next_page_url } = pagination,
        route = useRoute(),
        params = route().params

  return (
    <div className={classNames(props.className, 'flex items-center justify-between')}>
      <div className="flex flex-1 justify-between sm:hidden">
        {prev_page_url && (
          <Link
            href={prev_page_url}
            className="relative inline-flex items-center rounded-md border site-border px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            <ArrowLeftIcon className="h-4 w-4 -left-1 relative" aria-hidden="true" />
            {__('Previous')}
          </Link>
        )}
        {next_page_url && (
          <Link
            href={next_page_url}
            className="relative ml-3 inline-flex items-center rounded-md border site-border px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            {__('Next')}
            <ArrowRightIcon className="h-4 w-4 -right-1 relative" aria-hidden="true" />
          </Link>
        )}
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm">
            Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
            <span className="font-medium">97</span> results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex divide-x site-divide border site-border rounded items-stretch" aria-label="Pagination">

            {links.map(({ label, url, active }, index) => (
              <button
                key={label}
                type="button"
                disabled={active || !url}
                onClick={() => {
                  if (active) return

                  const page = new URL(url).searchParams.get('page')!,
                        route = new URL(window?.location.href)

                  route.searchParams.set('page', page)

                  router.visit(route)
                }}
                className={classNames(active && [
                  'active',
                  'z-10',
                  '!bg-black',
                  '!text-white',
                ], {
                  'hover:bg-black/20 hover:text-black': !active && url !== null,
                  'opacity-40': !url && (label.includes('Previous') || label.includes('Next'))
                }, [
                  'py-2',
                  'px-3.5',
                  'transition-colors',
                  '!shadow-none',
                  'inline-flex',
                  'gap-x-1',
                  'items-center'
                ])}
              >
                {label.includes('Previous') ? (
                  <>
                    <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">{__('Previous')}</span>
                  </>
                ) : label.includes('Next') ? (
                  <>
                    <span className="sr-only">{__('Next')}</span>
                    <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                  </>
                ) : (
                  <>{label}</>
                )}
              </button>
            ))}

          </nav>
        </div>
      </div>
    </div>
  )
}

export default Pagination
