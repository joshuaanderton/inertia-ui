import React, { useEffect, useState } from 'react'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Combobox } from '@headlessui/react'
import { lang as __ } from '@inertia-ui/Hooks/useLang'
import classNames from 'classnames'
import InputLabel from './InputLabel'
import PrimaryButton from '@/Components/Buttons/PrimaryButton'
import { set } from 'lodash'
import SecondaryButton from '@/Components/Buttons/SecondaryButton'

export interface ProfileSelectOption {
  handle: string
  image: string
  id: number
}

interface Props {
  value: ProfileSelectOption
  profiles?: ProfileSelectOption[]
  addOptions?: boolean
  onChange: (profile: ProfileSelectOption|null) => void
  disabled?: boolean
  placeholder?: string
  label?: string
}

const ProfileSelect: React.FC<Props> = ({
  value,
  profiles = [],
  onChange,
  label,
  placeholder,
  addOptions = false,
  ...props
}) => {

  const [query, setQuery] = useState(''),
        filteredOptions = (
          profiles
            .filter(op => value.handle.toLowerCase() === op.handle.toLowerCase() === undefined)
            .filter(op => query == '' || op.handle.toLowerCase().includes(query.toLowerCase()))
            .sort((a, b) => a.handle.toLowerCase().indexOf(query.toLowerCase()) - b.handle.toLowerCase().indexOf(query.toLowerCase()))
        ),
        showCreateOption = (
          addOptions && !!query && filteredOptions.filter(fo => fo.handle.toLowerCase() === query.toLowerCase()).length === 0
        ),
        handleChange = (profile: ProfileSelectOption|null) => {
          onChange(profile)
          setQuery('')
        }

  return (
    <Combobox value={value} onChange={handleChange}>
      {label && (
        <Combobox.Label>
          <InputLabel as="span" value={label} />
        </Combobox.Label>
      )}
      <div className="site-input min-h-[1.5rem] focus-within:ring-2 focus-within:ring-primary-500 relative flex flex-wrap items-center w-full">

        {/* Preview Tags */}
        <div className="px-2 py-1.5 flex flex-wrap items-center gap-1.5 w-full">

          {value && (
            <SecondaryButton
              size="xs"
              className="inline-flex gap-x-2 group rounded-full"
              type="button"
              onClick={() => handleChange(null)}
            >
              <img src={value.image} className="h-4 w-4 rounded-full" />
              <span>{value.handle}</span>
              <XMarkIcon className="h-3 w-3 -mr-1 opacity-50 group-hover:opacity-100 transition-opacity" strokeWidth={2} />
            </SecondaryButton>
          )}

          <div className="relative flex-1">
            <Combobox.Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event: any) => {
                if (event.key === 'Backspace' && query === '') {
                  handleChange(null)
                }
              }}
              className={classNames(
                'site-input !ring-transparent !border-none !bg-transparent shrink-0 min-w-[10rem] w-full !py-0 !px-2',
                props.disabled ? 'opacity-50 pointer-events-none' : ''
              )}
              placeholder={!value ? placeholder || __('Select profiles') : undefined}
            />

            {!props.disabled && (filteredOptions.length > 0 || showCreateOption) && (
              <Combobox.Options className={classNames(
                'absolute',
                'z-10',
                'mt-1',
                'max-h-32',
                'min-w-32',
                'overflow-auto',
                'rounded-md',
                'bg-chrome-300',
                'dark:bg-chrome-800',
                'py-1',
                'text-sm',
                'shadow-lg',
                'ring-1',
                'ring-black',
                'ring-opacity-5',
                'focus:outline-none',
                'sm:text-sm'
              )}>
                {/* {showCreateOption && (
                  <Combobox.Option
                    value={{ handle: query, value: query.toLowerCase().split(' ').join('-') }}
                    className={({ active }) => classNames(
                      'relative flex items-center gap-x-1 cursor-pointer select-none py-2 px-3',
                      active ? 'bg-primary-600 text-white' : 'text-chrome-900 dark:text-chrome-50 [&_svg]:text-primary-600'
                    )}
                  >
                    {__('Send request to ":query"', { query })}
                  </Combobox.Option>
                )} */}
                {filteredOptions.map(option => (
                  <Combobox.Option
                    key={option.handle}
                    value={option}
                    className={({ active }) => classNames(
                      'relative flex items-center gap-x-1 cursor-pointer select-none py-2 px-3',
                      active ? 'bg-primary-600 text-white' : 'text-chrome-900 dark:text-chrome-50 [&_svg]:text-primary-600'
                    )}
                  >
                    <span className={classNames('block truncate')}>
                      {option.handle}
                    </span>
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
          </div>

        </div>

      </div>
    </Combobox>
  )
}

export default ProfileSelect
