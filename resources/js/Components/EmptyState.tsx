import React from 'react'
import { ArrowRightIcon, PlusIcon } from '@heroicons/react/20/solid'
import { FolderPlusIcon } from '@heroicons/react/24/outline'
import { lang as __ } from '@inertia-ui/Hooks/useLang'
import PrimaryButton from '@/Components/Buttons/PrimaryButton'
import classNames from 'classnames'

interface Props {
  title: string
  description?: string
  buttonText?: string
  onClick?(): void
  className?: string
  icon?: false|(() => JSX.Element)
  buttonIcon?(): JSX.Element
}

const EmptyState: React.FC<Props> = ({
  title,
  description,
  buttonText,
  icon = true,
  buttonIcon,
  onClick,
  className = ''
}) => {

  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames([
        'site-border',
        'border-opacity-50',
        'hover:border-opacity-100',
        'transition-all',
        'border-2',
        'border-dashed',
        'h-full',
        'w-full',
        'rounded-lg',
        'max-h-[20rem]',
        'flex',
        'flex-col',
        'justify-center',
        'items-center',
        'py-12'
      ], className)}
    >
      <div className="site-container max-w-md">

        {icon !== false && (
          <FolderPlusIcon className="mx-auto h-12 w-12 text-primary-600/50 -mt-2" />
        )}

        <h3 className="mt-2 text-sm font-semibold text-chrome-900 dark:text-chrome-200">
          {title}
        </h3>
        {description && (
          <p className="mt-1 site-text-muted">
            {description}
          </p>
        )}
        {buttonText && (
          <div className="mt-6">
            <PrimaryButton as="span">
              {buttonIcon?.()}
              <span>{buttonText}</span>
            </PrimaryButton>
          </div>
        )}
      </div>
    </button>
  )
}

export default EmptyState
