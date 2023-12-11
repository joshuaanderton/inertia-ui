import React from 'react'
import { lang as __ } from '@inertia-ui/Hooks/useLang'
import { PaperClipIcon } from '@heroicons/react/20/solid'
import PrimaryButton from '@inertia-ui/Components/Buttons/PrimaryButton'
import classNames from 'classnames'
import InputLabel from './InputLabel'

interface Props {
  value?: string
  placeholder?: string
  disabled?: boolean
  buttonText?: string
  onChange: (event: any) => void
}

const MessageField: React.FC<Props> = ({
  value = '',
  placeholder,
  disabled = false,
  buttonText,
  onChange
}) => {

  return (
    <fieldset className="relative">
      <InputLabel htmlFor="comment" className="sr-only">
        {__('Send message')}
      </InputLabel>

      <textarea
        rows={3}
        value={value}
        disabled={disabled}
        onChange={onChange}
        required
        placeholder={placeholder || __('Type a message...')}
        className="site-input block w-full resize-none pt-2.5 pb-12 sm:leading-6"
      />

      <div className="absolute right-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
        {/* <div className="flex items-center space-x-5">
          <div className="flex items-center">
            <button
              type="button"
              className="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-chrome-400 hover:text-chrome-500"
            >
              <PaperClipIcon className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">{__('Attach a file')}</span>
            </button>
          </div>
        </div> */}
        <div className="flex-shrink-0 ml-auto">
          <PrimaryButton disabled={disabled} text={buttonText || __('Send')} />
        </div>
      </div>
    </fieldset>
  )
}

export default MessageField
