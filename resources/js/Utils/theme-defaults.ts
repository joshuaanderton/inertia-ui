import classNames from "classnames"
import { get } from "lodash"

type ClassNameValue = string|string[]|{[key: string]: boolean}|null|undefined

export interface ThemeDefaults {
  dropdown: {
    className: ClassNameValue
  }
}

let extendTheme: ThemeDefaults,
    defaultTheme: ThemeDefaults

const theme = (key?: string): ThemeDefaults|ClassNameValue => {

  if (!extendTheme) {
    extendTheme = (import.meta as any).THEME_DEFAULTS || {}
  }

  if (!defaultTheme) {
    defaultTheme = {
      dropdown: {
        className: 'relative inline-block text-left'
      }
    }
  }

  const mergeTheme = {
    ...defaultTheme,
    ...extendTheme
  }

  if (! key) {
    return mergeTheme
  }

  return get(mergeTheme, key, null)
}

export const classList = (key: string, ...className: ClassNameValue[]): string => (
  classNames(theme(key), ...className)
)
