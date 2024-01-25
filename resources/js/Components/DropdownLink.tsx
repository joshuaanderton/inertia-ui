import React, { PropsWithChildren } from 'react'
import { Link } from '@inertiajs/react'
import classNames from 'classnames'

interface Props extends PropsWithChildren {
  as?: string
  href?: string
  active?: boolean
  type?: "button"|"submit"|"reset"
  target?: string
  onClick?: (event: any) => void
  disabled?: boolean
  className?: string
}

const DropdownLink: React.FC<Props> = ({
  as,
  type = 'submit',
  href,
  active = false,
  onClick,
  target,
  children,
  ...props
}) => {

  props.className = classNames({
    'font-bold': active,
    'hover:bg-chrome-400 dark:hover:bg-chrome-950/50': !active
  }, [
    'text-chrome-700',
    'dark:text-chrome-300',
    'flex',
    'items-center',
    'font-medium',
    'gap-x-1.5',
    'w-full',
    'px-4',
    'py-2',
    'text-left',
    'text-sm',
    'leading-5',
    'focus:outline-none',
    'focus:bg-chrome-100',
    'dark:focus:bg-chrome-800',
    'transition',
    'duration-150',
    'ease-in-out',
    'disabled:opacity-50',
    'disabled:pointer-events-none',
  ], props.className)

  return (
    <div>
      {(() => {
        switch (as) {
          case 'button':
            return <button type={type} onClick={onClick} {...props}>{children}</button>
          case 'a':
            return <a href={href} target={target} {...props}>{children}</a>
          default:
            return <Link href={href || ''} {...props}>{children}</Link>
        }
      })()}
    </div>
  )
}

export default DropdownLink
