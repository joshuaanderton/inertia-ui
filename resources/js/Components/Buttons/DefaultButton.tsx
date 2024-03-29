import React, { PropsWithChildren } from 'react'
import classNames from 'classnames'
import { Link } from '@inertiajs/react'
import LoadingIcon from '@inertia-ui/Components/Icons/LoadingIcon'
import { ChevronDownIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline'

export interface DefaultButtonProps extends PropsWithChildren {
  as?: "span"|"button"|"Link"
  text?: string
  href?: string
  target?: string // When href !== undefined
  onClick?: (event: React.MouseEvent) => void
  type?: "submit"|"button" // When onClick !== undefined
  size?: "xs"|"sm"|"base"|"lg"
  className?: string
  disabled?: boolean
  active?: boolean
  processing?: boolean
  toggle?: boolean
  'data-tooltip-content'?: string
}

const DefaultButton: React.FC<DefaultButtonProps> = ({
  as,
  text = '',
  type = 'submit',
  size = 'base',
  href,
  target,
  onClick,
  toggle,
  processing,
  active,
  children,
  ...props
}) => {

  const sizeClassNames: any = {
    xs: [
      'font-normal',
      'text-xs',
      'px-2',
      'py-1',
    ],
    sm: [
      'font-normal',
      'text-sm',
      'px-2.5',
      'py-1',
    ],
    base: [
      'font-bold',
      'text-xs',
      'px-3.5',
      'py-2',
    ],
    lg: [
      'font-semibold',
      'text-lg',
      'px-4',
      'py-2.5',
    ]
  }

  props.className = classNames([
    'inline-flex',
    'items-center',
    'gap-x-1',
    'border',
    'border-transparent',
    'rounded-lg',
    // 'text-white',
    'transition',
    'ease-in-out',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-primary-500/80',
    'disabled:opacity-50',
    'disabled:cursor-default',
  ], sizeClassNames[size], props.className)

  if (props.disabled && onClick) {
    onClick = () => null
  }

  if (processing && !props.disabled) {
    props.disabled = true
  }

  children = <>
    {text}{children}{processing ? (
      <LoadingIcon className="h-4 w-4 -mr-1" />
    ) : toggle && (
      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4 -mr-1" />
    )}
  </>

  if (as === 'span') {
    return <span {...props}>{children}</span>
  } else if (href) {
    return <Link target={target} href={href!} {...props}>{children}</Link>
  }

  return <button type={type} onClick={onClick} {...props}>{children}</button>
}

export default DefaultButton
