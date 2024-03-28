interface Translations {[key: string]: string}

let translations: Translations = {}

export const setTranslations = (config: Translations) => translations = config

export const lang = (key: string, props?: {[key: string]: string|number}, fallback?: string): string => {

  let translated = translations[key] || ''

  if (!translated) {
    translated = fallback !== undefined
      ? fallback
      : key
  }

  if (props) {
    Object.entries(props).forEach(([key, value]: any) => {
      translated = translated.replace(`:${key}`, value)
    })
  }

  return translated
}

export default lang
