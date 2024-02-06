import { Transition } from '@headlessui/react'
import classNames from 'classnames'
import React, { PropsWithChildren, useState } from 'react'
import SecondaryButton from '@/Components/Buttons/SecondaryButton'

export interface DropdownProps extends PropsWithChildren {
  right?: boolean
  className?: string
  triggerClassName?: string
  triggerText?: string|(() => JSX.Element)
  triggerSize?: "base"|"sm"|"lg"|"xs"
  renderTrigger?: () => JSX.Element
  disabled?: boolean
  tooltip?: string
}

const Dropdown: React.FC<DropdownProps> = ({
  right = false,
  className,
  triggerClassName,
  triggerText,
  triggerSize,
  disabled,
  renderTrigger,
  tooltip,
  children,
}) => {

  const [open, setOpen] = useState(false)

  className = classNames('absolute mt-2 rounded shadow-lg', {
    'origin-top-right right-0': right,
    'origin-top-left left-0': !right,
    'w-48': !className?.includes('w-'),
  }, className)

  return (
    <div className="relative">
      <div onClick={() => setOpen(!open)}>
        {renderTrigger ? renderTrigger?.() : triggerText && (
          <SecondaryButton
            type="button"
            size={triggerSize}
            className={triggerClassName}
            disabled={disabled}
            data-tooltip-content={tooltip}
            data-tooltip-place="bottom"
            toggle
          >
            {typeof triggerText === 'string' ? triggerText : triggerText()}
          </SecondaryButton>
        )}
      </div>

      <div
        className="fixed inset-0 z-40"
        style={{ display: open ? 'block' : 'none' }}
        onClick={() => setOpen(false)}
      />

      <Transition
        show={open}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        className={'relative z-50'}
      >
        <div className={className} onClick={() => setOpen(false)}>
          <div className="rounded ring-1 ring-black ring-opacity-5 py-1 bg-chrome-300 dark:bg-chrome-900 max-h-64 overflow-y-scroll">
            {children}
          </div>
        </div>
      </Transition>
    </div>
  )
}

export default Dropdown
