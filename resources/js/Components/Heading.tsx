import React, { PropsWithChildren } from 'react'
import classNames from 'classnames'

interface Props extends PropsWithChildren {
  title?: string
  type?: "h1"|"h2"|"h3"|"h4"
  size?: "sm"|"lg"
  className?: string
}

const Heading: React.FC<Props> = ({ title, size, type = "h3", className = '', children }) => {

  return (
    <div className={classNames(
      {
        'prose-xs md:prose-sm': size === 'sm',
        'prose-sm md:prose-lg': size === 'lg',
      },
      [
        'prose',
        'dark:prose-invert',
        'font-headings'
      ],
      className
    )}>
      {type == 'h1' && <h1 className={'leading-[1.1] font-semibold'}>{title}{children}</h1>}
      {type == 'h2' && <h2 className={'leading-[1.1] font-semibold'}>{title}{children}</h2>}
      {type == 'h3' && <h3 className={'leading-[1.1] font-semibold'}>{title}{children}</h3>}
      {type == 'h4' && <h4 className={'font-semibold'}>{title}{children}</h4>}
    </div>
  )
}

export default Heading
