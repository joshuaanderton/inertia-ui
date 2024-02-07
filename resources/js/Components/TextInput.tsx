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

  return (
    <div className="relative">
      <input
        type={type === 'password' && showPassword ? 'text' : type}
        {...props}
        ref={ref}
        className={classNames('site-input', type === 'password' ? 'pr-10' : '', props.className)}
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
})

export default TextInput
