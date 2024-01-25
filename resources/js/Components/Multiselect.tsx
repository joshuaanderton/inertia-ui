import React, { useState } from 'react'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Combobox } from '@headlessui/react'
import { lang as __ } from '@inertia-ui/Hooks/useLang'
import classNames from 'classnames'
import InputLabel from './InputLabel'
import PrimaryButton from '@inertia-ui/Components/Buttons/PrimaryButton'

export interface MultiselectOption {
  label: string
  value: string
}

interface Props {
  value?: MultiselectOption[]
  options: MultiselectOption[]
  addOptions?: boolean
  onChange: (options: MultiselectOption[]) => void
  disabled?: boolean
  placeholder?: string
  label?: string
}

const Multiselect: React.FC<Props> = ({ value, options = [], onChange, label, placeholder, disabled, addOptions = false }) => {

  const [query, setQuery] = useState(''),
        [selectedOptions, setSelectedOptions] = useState<MultiselectOption[]>(value || []),
        filteredOptions = (
          options
            .filter(option => option.label.toLowerCase().includes(query.toLowerCase()))
            .filter(option => selectedOptions.map(sop => sop.label).includes(option.label) === false)
        ),
        showCreateOption = (
          addOptions &&
          query.length > 0 &&
          options.map(op => op.label.toLowerCase()).includes(query.toLowerCase()) === false
        ),
        handleChange = (selectedOptions: MultiselectOption[]) => {
          setSelectedOptions(selectedOptions)
          onChange(selectedOptions)
          setQuery('')
        }

  return (
    <Combobox value={selectedOptions} onChange={handleChange} multiple>
      {label && (
        <Combobox.Label>
          <InputLabel as="span" value={label} />
        </Combobox.Label>
      )}
      <div className="site-input min-h-[1.5rem] focus-within:ring-2 focus-within:ring-primary-500 relative flex flex-wrap items-center w-full">

        {/* Preview Tags */}
        <div className="px-2 py-1.5 flex flex-wrap items-center gap-1.5">

          {selectedOptions.map((sop) => (
            <Combobox.Option as="div" key={sop.label} value={sop}>
              <PrimaryButton
                key={sop.label}
                size="xs"
                className="group rounded-full"
              >
                <span>{sop.label}</span>
                <XMarkIcon className="h-3 w-3 -mr-1 opacity-50 group-hover:opacity-100 transition-opacity" strokeWidth={2} />
              </PrimaryButton>
            </Combobox.Option>
          ))}

          <div className="relative flex-1">
            <div className={disabled ? 'opacity-50 pointer-events-none' : ''}>
              <Combobox.Button className="relative flex items-center w-full">
                <Combobox.Input
                  value={query}
                  className="site-input !ring-transparent !border-none !bg-transparent w-full !py-0 !px-2"
                  placeholder={selectedOptions.length === 0 ? placeholder || __('Select options') : undefined}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </Combobox.Button>
            </div>

            {!disabled && (filteredOptions.length > 0 || showCreateOption) && (
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
                    value={{ label: query, value: query.toLowerCase().replaceAll(' ', '-') }}
                    className={({ active }) => classNames(
                      'relative flex items-center gap-x-1 cursor-pointer select-none py-2 px-3',
                      'text-chrome-900 whitespace-nowrap dark:text-chrome-50 [&_svg]:text-primary-600'
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
                    {({ active, selected }) => (
                      <>
                        {selected && (
                          <CheckIcon className="h-3.5 w-3.5" strokeWidth={2.5} />
                        )}
                        <span className={classNames('block truncate', selected && 'font-semibold')}>
                          {option.label}
                        </span>
                      </>
                    )}
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
