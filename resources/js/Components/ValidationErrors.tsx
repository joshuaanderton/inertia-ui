import { lang as __ } from '@inertia-ui/Hooks/useLang'
import InputError from '@inertia-ui/Components/InputError'
import Dropdown from '@inertia-ui/Components/Dropdown'
import DropdownLink from '@inertia-ui/Components/DropdownLink'
import clsx from 'clsx'
import { ChevronUpIcon } from '@heroicons/react/24/outline'

const ValidationErrors: React.FC<{ errors: {[key: string]: string}, className?: string }> = ({ errors, className }) => {

  const validationErrors = Object.values<string>(errors).reverse()

  let dropdownTriggerText = ''

  if (validationErrors.length === 2) {
    dropdownTriggerText+= __(' (and 1 other error)')
  } else if (validationErrors.length > 2) {
    dropdownTriggerText+= __(' (and :count other errors)', { count: validationErrors.length - 1 })
  }

  return (
    <div className={clsx(className, 'inline-flex flex-wrap gap-x-2')}>
      <InputError message={validationErrors[0]} />
      {validationErrors.length > 1 && (
        <Dropdown
          up={true}
          className="rounded-none site-bg"
          renderTrigger={() => (
            <InputError
              className="whitespace-nowrap underline hover:no-underline hover:cursor-pointer"
              message={dropdownTriggerText} />
          )}
        >
          <ul>
            {validationErrors.map((error, index) => (
              <li key={`error-${index}`} className="px-2 py-1.5">
                <InputError message={error} />
              </li>
            ))}
          </ul>
        </Dropdown>
      )}
    </div>
  )
}

export default ValidationErrors
