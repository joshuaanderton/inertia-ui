import React, { useState, forwardRef } from 'react'
import classNames from 'classnames'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

const TextInput = forwardRef<
  HTMLInputElement,
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
>(({ type, ...props }, ref) => {

  const [showPassword, setShowPassword] = useState(false)

  if (type === 'password') {
    return (
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          {...props}
          ref={ref}
          className={classNames('site-input pr-10', props.className)}
        />
        {type === 'password' && (
          <button
            type="button"
            className="h-full absolute right-0 inset-y-0 px-3 flex items-center hover:opacity-50 transition-opacity"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeSlashIcon className="w-5 h-auto" strokeWidth={2} />
            ) : (
              <EyeIcon className="w-5 h-auto" strokeWidth={2} />
            )}
          </button>
        )}
      </div>
    )
  }

  return (
    <input
      type={type}
      {...props}
      ref={ref}
      className={classNames('site-input', props.className)}
    />
  )
})

export default TextInput
