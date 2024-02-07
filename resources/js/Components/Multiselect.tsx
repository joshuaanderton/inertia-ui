import React, { useEffect, useState } from 'react'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Combobox } from '@headlessui/react'
import { lang as __ } from '@inertia-ui/Hooks/useLang'
import classNames from 'classnames'
import InputLabel from './InputLabel'
import PrimaryButton from '@/Components/Buttons/PrimaryButton'
import { set } from 'lodash'

export interface MultiselectOption {
  label: string
  value: string
}

interface Props {
  values?: MultiselectOption[]
  options?: MultiselectOption[]
  addOptions?: boolean
  onChange: (options: MultiselectOption[]) => void
  disabled?: boolean
  placeholder?: string
  label?: string
}

const Multiselect: React.FC<Props> = ({
  values = [],
  options = [],
  onChange,
  label,
  placeholder,
  addOptions = false,
  ...props
}) => {

  const [query, setQuery] = useState(''),
        filteredOptions = (
          options
            .filter(op => values.find(({ label }) => label.toLowerCase() === op.label.toLowerCase()) === undefined)
            .filter(op => query == '' || op.label.toLowerCase().includes(query.toLowerCase()))
            .sort((a, b) => a.label.toLowerCase().indexOf(query.toLowerCase()) - b.label.toLowerCase().indexOf(query.toLowerCase()))
        ),
        showCreateOption = (
          addOptions && !!query && filteredOptions.filter(fo => fo.label.toLowerCase() === query.toLowerCase()).length === 0
        ),
        handleChange = (newValues: MultiselectOption[]) => {
          onChange(newValues)
          setQuery('')
        }

  return (
    <Combobox value={values} onChange={handleChange} multiple>
      {label && (
        <Combobox.Label>
          <InputLabel as="span" value={label} />
        </Combobox.Label>
      )}
      <div className="site-input min-h-[1.5rem] focus-within:ring-2 focus-within:ring-primary-500 relative flex flex-wrap items-center w-full">

        {/* Preview Tags */}
        <div className="px-2 py-1.5 flex flex-wrap items-center gap-1.5 w-full">

          {values.map((sop) => (
            <PrimaryButton
              key={sop.label}
              size="xs"
              className="group rounded-full"
              type="button"
              onClick={() => handleChange(values.filter(({ label }) => label !== sop.label))}
            >
              <span>{sop.label}</span>
              <XMarkIcon className="h-3 w-3 -mr-1 opacity-50 group-hover:opacity-100 transition-opacity" strokeWidth={2} />
            </PrimaryButton>
          ))}

          <div className="relative flex-1">
            <Combobox.Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event: any) => {
                if (event.key === 'Backspace' && query === '') {
                  handleChange(values.slice(0, -1))
                }
              }}
              className={classNames(
                'site-input !ring-transparent !border-none !bg-transparent shrink-0 min-w-[10rem] w-full !py-0 !px-2',
                props.disabled ? 'opacity-50 pointer-events-none' : ''
              )}
              placeholder={values.length === 0 ? placeholder || __('Select options') : undefined}
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
                {showCreateOption && (
                  <Combobox.Option
                    value={{ label: query, value: query.toLowerCase().split(' ').join('-') }}
                    className={({ active }) => classNames(
                      'relative flex items-center gap-x-1 cursor-pointer select-none py-2 px-3',
                      active ? 'bg-primary-600 text-white' : 'text-chrome-900 dark:text-chrome-50 [&_svg]:text-primary-600'
                    )}
                  >
                    {__('Create ":query"', { query })}
                  </Combobox.Option>
                )}
                {filteredOptions.map(option => (
                  <Combobox.Option
                    key={option.label}
                    value={option}
                    className={({ active }) => classNames(
                      'relative flex items-center gap-x-1 cursor-pointer select-none py-2 px-3',
                      active ? 'bg-primary-600 text-white' : 'text-chrome-900 dark:text-chrome-50 [&_svg]:text-primary-600'
                    )}
                  >
                    <span className={classNames('block truncate')}>
                      {option.label}
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

export default Multiselect
