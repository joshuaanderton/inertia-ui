import React, { useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'
import classNames from 'classnames'
import InputLabel from '@inertia-ui/Components/InputLabel'

interface Props {
  enabled?: boolean
  onChange?: (enabled: boolean) => void
  label?: string
  disabled?: boolean
  className?: string
}

const Toggle: React.FC<Props> = ({ enabled, onChange, label, disabled = false, className = '' }) => {

  const [isEnabled, setIsEnabled] = useState(enabled || false)

  useEffect(() => onChange?.(isEnabled), [isEnabled])

  return (
    <div className={classNames('flex items-center gap-x-2', className)}>
      <Switch
        disabled={disabled}
        checked={isEnabled}
        onChange={setIsEnabled}
        className={`${isEnabled ? 'bg-primary' : 'site-bg dark:bg-chrome-700'}
        ring-1 ring-chrome-600 dark:ring-transparent relative inline-flex h-[30px] w-[56px] shrink-0 cursor-pointer rounded-full border-[3px] border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
      >
        <span
          aria-hidden="true"
          className={`${isEnabled ? 'translate-x-[26px]' : 'translate-x-0'}
            pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full site-bg border site-border dark:bg-chrome-950 ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>

      {label && (
        <InputLabel className="hover:cursor-pointer" value={label} />
      )}
    </div>
  )
}

export default Toggle
