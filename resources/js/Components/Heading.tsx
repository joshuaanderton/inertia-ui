import React, { PropsWithChildren } from 'react'
import classNames from 'classnames'
import { lang as __ } from '@inertia-ui/Hooks/useLang'
import AdminTranslationsModalTrigger from '@/Layouts/Partials/AdminTranslationsModalTrigger'

interface Props {
  title: string
  count?: number
  lang?: string
  disableTranslationsEditor?: true
  type?: "h1"|"h2"|"h3"|"h4"|"h5"
  size?: "sm"|"lg"
  className?: string
}

const Heading: React.FC<Props> = ({ title, count = 0, lang, size, className, type = "h3", disableTranslationsEditor }) => {

  lang = lang || `default.${title.toLowerCase().replaceAll(' ', '_')}`

  interface HeadingElementProps extends PropsWithChildren {
    type: "h1"|"h2"|"h3"|"h4"|"h5"
    className?: string
  }

  const titleText = __(lang, {}, title)

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
        'prose',
        'dark:prose-invert',
        'flex',
        'items-start',
        'gap-x-4',
        'group',
        className
      )}
    >
      <HeadingElement
        type={type}
        className={classNames('site-heading', className)}
      >
        {titleText} {count > 0 ? `(${count})` : null}
      </HeadingElement>

      {disableTranslationsEditor !== true && (
        <div className="relative">
          <AdminTranslationsModalTrigger
            className="absolute top-0 left-0 opacity-0 group-hover:opacity-100"
            languageLines={[{ key: lang, text: titleText }]} />
        </div>
      )}
    </div>
  )
}

export default Heading
