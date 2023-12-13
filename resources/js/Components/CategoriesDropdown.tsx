import React, { useState } from 'react'
import Dropdown, { DropdownProps } from '@inertia-ui/Components/Dropdown'
import DropdownLink from '@inertia-ui/Components/DropdownLink'
import { lang as __ } from '@inertia-ui/Hooks/useLang'
import TextInput from './TextInput'

interface Category {
  id: number,
  name: string
}

interface Props extends DropdownProps {
  categories: Category[]
  value?: number|null
  onChange: (category: Category) => void
  placeholder?: string
}

const CategoriesDropdown: React.FC<Props> = ({ categories, value, onChange, placeholder, className, ...props }) => {

  const [currentCategory, setCurrentCategory] = useState(categories.find(c => c.id === value) || null),
        [query, setQuery] = useState('')

  return (
    <Dropdown triggerText={currentCategory?.name || placeholder || __('Categories')} {...props}>

      {/* <TextInput value={query} onChange={event => setQuery(event.currentTarget.value)} /> */}

      {categories.filter(cat => query.length === 0 || cat.name.toLowerCase().includes(query)).map(category => (
        <DropdownLink key={category.id} as="button" type="button" onClick={() => {
          setCurrentCategory(category)
          onChange(category)
        }}>
          {category.name}
        </DropdownLink>
      ))}

    </Dropdown>
  )
}

export default CategoriesDropdown
