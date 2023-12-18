import React from 'react'
import { lang as __ } from '@inertia-ui/Hooks/useLang'
import { Pagination as PaginationInterface } from '@/types'
import classNames from 'classnames'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid'
import { router, Link } from '@inertiajs/react'
import useRoute from '@inertia-ui/Hooks/useRoute'

interface Props {
  pagination: PaginationInterface
  className?: string
}

const Pagination: React.FC<Props> = ({ pagination, ...props }) => {

  const { links, prev_page_url, next_page_url } = pagination,
        route = useRoute(),
        params = route().params

  return (
    <div className={classNames(props.className, 'site-text flex items-center justify-between border-t site-border-color py-3')}>
      <div className="flex flex-1 justify-between sm:hidden">
        {prev_page_url && (
          <Link
            href={prev_page_url}
            className="relative inline-flex items-center rounded-md border site-border-color px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            <ArrowLeftIcon className="h-4 w-4 -left-1 relative" aria-hidden="true" />
            {__('Previous')}
          </Link>
        )}
        {next_page_url && (
          <Link
            href={next_page_url}
            className="relative ml-3 inline-flex items-center rounded-md border site-border-color px-4 py-2 text-sm font-medium hover:bg-gray-50"
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
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">

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
                  'z-10',
                  'bg-primary-600',
                  'text-white',
                  'focus-visible:outline',
                  'focus-visible:outline-2',
                  'focus-visible:outline-offset-2',
                  'focus-visible:outline-primary-600'
                ], {
                  'site-text-muted hover:opacity-50': !active && url !== null,
                  'opacity-40': !url
                }, [
                  'relative',
                  'hidden',
                  'items-center',
                  'px-4',
                  'rounded',
                  'py-2',
                  'transition-all',
                  'text-sm',
                  'font-semibold',
                  'ring-1',
                  'ring-inset',
                  'ring-transparent',
                  'focus:z-20',
                  'focus:outline-offset-0',
                  'md:inline-flex',
                  'gap-x-1',
                ])}
              >
                {label.includes('Previous') ? (
                  <>
                    <ArrowLeftIcon className="h-4 w-4 -left-1 relative" aria-hidden="true" />
                    <span>{__('Previous')}</span>
                  </>
                ) : label.includes('Next') ? (
                  <>
                    <span>{__('Next')}</span>
                    <ArrowRightIcon className="h-4 w-4 -right-1 relative" aria-hidden="true" />
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
