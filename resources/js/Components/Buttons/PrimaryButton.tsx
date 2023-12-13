import React from 'react'
import classNames from 'classnames'
import DefaultButton, { DefaultButtonProps } from './DefaultButton'

const PrimaryButton: React.FC<DefaultButtonProps> = ({ className, ...props }) => (
  <DefaultButton className={classNames([
    'bg-primary-800',
    'focus:bg-primary-700',
    'text-white',
    props.active ? 'bg-primary-900' : null,
    !props.disabled ? 'hover:bg-primary-700' : null,
  ], className)} {...props} />
)

export default PrimaryButton
