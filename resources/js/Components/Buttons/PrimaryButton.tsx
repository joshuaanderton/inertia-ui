import React from 'react'
import classNames from 'classnames'
import DefaultButton, { DefaultButtonProps } from '@inertia-ui/Components/Buttons/DefaultButton'

const PrimaryButton: React.FC<DefaultButtonProps> = ({ className, ...props }) => (
  <DefaultButton className={classNames([
    'bg-primary-800',
    'border-primary-800',
    'focus:bg-primary-700',
    'focus:border-primary-700',
    props.active ? 'bg-primary-900 border-primary-900' : null,
    !props.disabled ? 'hover:bg-primary-700 hover:border-primary-700' : null,
  ], className)} {...props} />
)

export default PrimaryButton
