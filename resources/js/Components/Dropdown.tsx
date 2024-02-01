import { Transition } from '@headlessui/react'
import React, { PropsWithChildren, useState } from 'react'
import SecondaryButton from './Buttons/SecondaryButton'
import { classList } from '@inertia-ui/Utils/theme-defaults'

export interface DropdownProps extends PropsWithChildren {
  right?: boolean
  className?: string
  triggerClassName?: string
  triggerText?: string|(() => JSX.Element)
  triggerToggle?: boolean
  renderTrigger?: () => JSX.Element
  disabled?: boolean
  tooltip?: string
}

const Dropdown: React.FC<DropdownProps> = ({
  right = false,
  triggerClassName,
  triggerText,
  triggerToggle = true,
  disabled,
  renderTrigger,
  tooltip,
  children,
  ...props
}) => {

  const [open, setOpen] = useState(false)

  return (
    <div className={classList('dropdown.wrap', 'relative')}>
      <div onClick={() => setOpen(!open)}>
        {renderTrigger ? renderTrigger?.() : triggerText && (
          <SecondaryButton
            type="button"
            className={triggerClassName}
            disabled={disabled}
            data-tooltip-content={tooltip}
            data-tooltip-place="bottom"
            toggle={triggerToggle}
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
        <div className={classList('dropdown.menu', [
            'absolute',
            'mt-2',
            'rounded',
            'shadow-lg'
          ],
          {
            'origin-top-right right-0': right,
            'origin-top-left left-0': !right,
            'w-48': !props.className?.includes('w-'),
          },
          props.className
        )}>
          <div className="rounded ring-1 ring-black/20 dark:ring-white/20 overflow-hidden py-1 site-bg">
            {children}
          </div>
        </div>
      </Transition>
    </div>
  )
}

export default Dropdown
