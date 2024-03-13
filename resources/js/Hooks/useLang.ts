interface Translations {[key: string]: string}

interface TranslationsConfig {[key: string]: Translations}

let translations: TranslationsConfig

export const lang = (key: string, props?: {[key: string]: string|number}, fallback?: string): string => {

  const locale = document?.documentElement?.lang || 'en'

  if (!translations) {
    translations = (window as any).Translations || {}
  }

  let translated = translations[locale][key] || ''

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
