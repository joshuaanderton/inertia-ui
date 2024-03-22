import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  message?: string
  overlay?: boolean
  className?: string
}

const InputError: React.FC<Props> = ({
  message,
  className = '',
  overlay = false,
  children,
}) => {
  if (!message && !children) {
    return null
  }
  return (
    <div className={`${className} relative text-xs font-medium text-red-600 dark:text-red-400`}>
      <span className={overlay ? 'absolute top-0 left-0' : ''}>{message || children}</span>
    </div>
  )
}

export default InputError
