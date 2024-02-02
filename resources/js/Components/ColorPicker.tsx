import React from 'react'
import classNames from 'classnames'
import TextInput from '@inertia-ui/Components/TextInput'

const ColorPicker: React.FC<{ value: string, onChange: (event: any) => void, id?: string }> = ({ value, onChange, ...props }) => {
  return (
    <div className="relative flex">
      <label
        style={{ backgroundColor: value || '' }}
        className={classNames(
          !!value ? 'border-transparent' : 'site-border-color',
          'w-[1.85rem] absolute left-1.5 inset-y-1.5 border cursor-pointer shrink-0 rounded [&_input]:h-0 [&_input]:absolute [&_input]:bottom-0 [&_input]:opacity-0'
        )}
      >
        <input
          type="color"
          value={value || ''}
          onChange={onChange} />
      </label>
      <TextInput
        {...props}
        className="pl-10"
        value={value || ''}
        placeholder="#6875F5"
        onChange={onChange} />
    </div>
  )
}

export default ColorPicker
