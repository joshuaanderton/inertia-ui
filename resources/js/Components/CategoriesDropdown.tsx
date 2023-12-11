import React, { useState } from 'react'
import Dropdown, { DropdownProps } from '@inertia-ui/Components/Dropdown'
import DropdownLink from '@inertia-ui/Components/DropdownLink'
import useTypedPage from '@inertia-ui/Hooks/useTypedPage'
import { lang as __ } from '@inertia-ui/Hooks/useLang'

interface Props extends DropdownProps {
  value?: string|null
  onChange: (category: { id: string, slug: string, title: string }) => void
  placeholder?: string
}

const CategoriesDropdown: React.FC<Props> = ({ value, onChange, placeholder, className, ...props }) => {

  const { categories } = useTypedPage<{ categories: { id: string, slug: string, title: string }[] }>().props,
        [currentCategory, setCurrentCategory] = useState(value ? categories.find(c => c.slug === value) : null)

  return (
    <Dropdown triggerText={currentCategory?.title || placeholder || __('Categories')} {...props}>
      {categories.map(category => (
        <DropdownLink key={category.slug} as="button" type="button" onClick={() => {
          setCurrentCategory(category)
          onChange(category)
        }}>
          {category.title}
        </DropdownLink>
      ))}
    </Dropdown>
  )
}

export default CategoriesDropdown
