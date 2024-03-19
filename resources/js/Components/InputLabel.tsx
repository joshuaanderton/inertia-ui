import classNames from 'classnames'
import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  value?: string
  as?: "label" | "span"
  htmlFor?: string
  className?: string
}

const InputLabel: React.FC<Props> = ({ value, htmlFor, as = 'label', children, ...props }) => {

  const className = classNames('block font-medium text-sm', props.className)

  return <>
    {as === 'label' ? (
      <label className={className} htmlFor={htmlFor}>
        {value || children}
      </label>
    ) : (
      <span className={className}>
        {value || children}
      </span>
    )}
  </>
}

export default InputLabel
