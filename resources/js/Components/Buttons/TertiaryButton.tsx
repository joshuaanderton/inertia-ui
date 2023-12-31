import React from 'react'
import classNames from 'classnames'
import DefaultButton, { DefaultButtonProps } from './DefaultButton'

interface TertiaryButtonProps extends DefaultButtonProps { light?: boolean }

const TertiaryButton: React.FC<TertiaryButtonProps> = ({ className, ...props }) => {

  return (
    <DefaultButton
      {...props}
      className={classNames([
        'border-black',
        'text-black',
        'dark:border-white',
        'dark:text-white',
        'rounded-full',
        'bg-gradient-to-r',
        'hover:from-chrome-200',
        'focus:from-chrome-200',
        'hover:to-chrome-100',
        'focus:from-chrome-100',
        'dark:hover:from-chrome-700',
        'dark:hover:to-chrome-800',
        'dark:focus:from-chrome-700',
        'dark:focus:to-chrome-800',
      ], className)}
    />
  )
}

export default TertiaryButton
