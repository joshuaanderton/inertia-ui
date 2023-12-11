import React, { forwardRef } from 'react'
import classNames from 'classnames'

const TextInput = forwardRef<
  HTMLInputElement,
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
>((props, ref) => (
  <input
    {...props}
    ref={ref}
    className={classNames('site-input', props.className)}
  />
));

export default TextInput
