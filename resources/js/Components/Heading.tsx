import React, { PropsWithChildren } from 'react'
import classNames from 'classnames'

interface Props extends PropsWithChildren {
  title?: string
  type?: "h1"|"h2"|"h3"|"h4"|"h5"
  size?: "sm"|"lg"
  className?: string
}

const Heading: React.FC<Props> = ({ title, size, type = "h3", className = '', children }) => {

  interface HeadingElementProps extends PropsWithChildren {
    type: "h1"|"h2"|"h3"|"h4"|"h5"
    className?: string
  }

  const HeadingElement: React.FC<HeadingElementProps> = ({ type, children, ...props }) => (
    <>
      {type == 'h1' && <h1 {...props}>{children}</h1>}
      {type == 'h2' && <h2 {...props}>{children}</h2>}
      {type == 'h3' && <h3 {...props}>{children}</h3>}
      {type == 'h4' && <h4 {...props}>{children}</h4>}
      {type == 'h5' && <h4 {...props}>{children}</h4>}
    </>
  )

  return (
    <div
      className={classNames(
        {
          'prose-sm': size === 'sm',
          'prose-lg': size === 'lg',
        },
        'prose dark:prose-invert',
        className
      )}
    >
      <HeadingElement
        type={type}
        className={classNames('site-heading', className)}
      >
        {title}{children}
      </HeadingElement>
    </div>
  )
}

export default Heading
