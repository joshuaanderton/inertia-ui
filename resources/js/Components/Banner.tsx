import React, { Fragment, useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import { BellAlertIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/20/solid'
import useTypedPage from '@inertia-ui/Hooks/useTypedPage'

const Banner: React.FC = () => {

  const { props } = useTypedPage(),
        banner = props.jetstream?.flash?.banner,
        [message, setMessage] = useState<string|null>(banner || null),
        style = props.jetstream?.flash?.bannerStyle || 'success'

  useEffect(() => {
    if (props.jetstream?.flash?.banner) {
      setMessage(props.jetstream?.flash?.banner)
      setTimeout(() => setMessage(null), 3000)
    }
  }, [props])

  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed z-50 inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        <Transition
          show={message !== null}
          as={Fragment}
          enter="transform ease-out duration-300 transition"
          enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enterTo="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="pointer-events-auto w-full max-w-xs overflow-hidden rounded-lg bg-white dark:bg-chrome-700 shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {style === 'success' && (
                    <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
                  )}
                  {style === 'danger' && (
                    <BellAlertIcon className="h-6 w-6 text-red-500" aria-hidden="true" />
                  )}
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium">
                    {message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  )
}

export default Banner
