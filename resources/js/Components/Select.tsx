import classNames from 'classnames'
import { PropsWithChildren, useEffect, useState } from 'react'

interface Props extends PropsWithChildren {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  value?: string | number
  size?: "sm"
  name?: string
  options?: { value: string | number, label: string }[]
  className?: string
  disabled?: boolean
  required?: boolean
}

const Select: React.FC<Props> = ({
  onChange,
  value,
  options = [],
  size,
  className = '',
  children,
  ...props
}) => {

  const [selected, setSelected] = useState<string|number|undefined>(undefined),
        handleSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
          setSelected(event.target.value)
          if (event.target.value !== value) {
            onChange(event)
          }
        }

  // Watch for changes to the value prop
  useEffect(() => {
    if (!value || selected === value) {
      return
    }
    setSelected(value)
  }, [value])

  return (
    <select
      value={selected}
      onChange={handleSelected}
      className={classNames({
        'py-1 !text-sm': size === 'sm',
        '!h-[2.6rem]': !size
      }, [
        'site-input',
        'max-w-full',
      ], className)}
      {...props}
    >
      {children}
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default Select
