import { useState } from 'react'
import Dropdown, { DropdownProps } from '@inertia-ui/Components/Dropdown'
import DropdownLink from '@inertia-ui/Components/DropdownLink'
import { lang as __ } from '@inertia-ui/Hooks/useLang'
import TextInput from '@inertia-ui/Components/TextInput'

interface Props extends DropdownProps {
  options: { label: string, value: string|number }[]
  value?: string|number|null
  onChange: (option: { label: string, value: string|number }) => void
  placeholder?: string
}

const DropdownSearch: React.FC<Props> = ({ options, value, onChange, placeholder, className, ...props }) => {

  const [selectedOption, setSelectedOption] = useState(options.find(op => op.value === value) || null),
        [query, setQuery] = useState('')

  return (
    <Dropdown
      triggerText={selectedOption?.label || placeholder || __('Options')}
      className="[&>div]:max-h-[10rem] [&>div]:relative [&>div]:overflow-y-scroll [&>div]:!pt-0"
      {...props}
    >

      <div className="sticky top-0 px-2 pt-2 pb-1.5 bg-white">
        <TextInput
          value={query}
          placeholder={__('Search')}
          onChange={(event: any) => setQuery(event.currentTarget.value)}
          className="w-full max-w-full text-sm rounded border-none bg-chrome-50 px-2"/>
      </div>

      {options.filter(op => query.length === 0 || op.label.toLowerCase().includes(query.toLowerCase())).map(op => (
        <DropdownLink
          key={op.value}
          as="button"
          type="button"
          className="overflow-hidden"
          onClick={() => {
            setSelectedOption(op)
            onChange(op)
          }}
        >
          <span title={op.label} className="truncate">{op.label}</span>
        </DropdownLink>
      ))}

    </Dropdown>
  )
}

export default DropdownSearch
