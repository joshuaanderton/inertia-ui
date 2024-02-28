import React, { useRef, useState } from 'react'
import { lang as __ } from '@inertia-ui/Hooks/useLang'
import { PaperClipIcon } from '@heroicons/react/20/solid'
import PrimaryButton from '@/Components/Buttons/PrimaryButton'
import InputLabel from './InputLabel'

interface Props {
  value?: string
  attachment?: File|null
  placeholder?: string
  disabled?: boolean
  buttonText?: string
  onChange: (event: any) => void
  onAttachmentChange?: (file: File) => void
}

const MessageField: React.FC<Props> = ({
  value = '',
  attachment = null,
  placeholder,
  disabled = false,
  buttonText,
  onChange,
  onAttachmentChange
}) => {

  const handleFileChange = () => {
    const file = fileInputRef.current?.files?.[0]

    if (!file) return

    setFileName(file.name)
    onAttachmentChange?.(file)
  }

  const fileInputRef = useRef<HTMLInputElement>(null),
        [fileName, setFileName] = useState<string|null>(attachment?.name || null)

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

        {!!onAttachmentChange && (
          <div className="flex items-center space-x-5">
            <div className="flex items-center">
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                multiple={false}
                onChange={handleFileChange}
              />

              <button
                type="button"
                className="text-xs flex p-2 items-center justify-center rounded-full text-chrome-600 hover:text-chrome-800"
                onClick={() => fileInputRef.current?.click()}
              >
                <PaperClipIcon className="h-5 w-5" aria-hidden="true" />
                {fileName ? (
                  <span className="truncate font-mono">{fileName}</span>
                ) : (
                  <span className="sr-only">{__('Attach a file')}</span>
                )}
              </button>
            </div>
          </div>
        )}

        <div className="flex-shrink-0 ml-auto">
          <PrimaryButton disabled={disabled} size="sm" text={buttonText || __('Send')} />
        </div>
      </div>
    </fieldset>
  )
}

export default MessageField
