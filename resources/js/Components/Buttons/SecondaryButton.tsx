import React from 'react'
import DefaultButton, { DefaultButtonProps } from '@inertia-ui/Components/Buttons/DefaultButton'
import classNames from 'classnames'

const SecondaryButton: React.FC<DefaultButtonProps> = ({ className, ...props }) => (
  <DefaultButton {...props} className={classNames([
    'site-bg',
    'site-border-color',
    'text-chrome-700',
    'dark:text-chrome-300',
    !props.disabled
      ? 'hover:bg-chrome-50 dark:hover:bg-chrome-700'
      : null,
  ], className)} />
)

export default SecondaryButton
