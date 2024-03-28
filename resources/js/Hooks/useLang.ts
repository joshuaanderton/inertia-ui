// interface Translations {[key: string]: string}
// interface TranslationsConfig {[key: string]: Translations}

let translations: any

export const lang = (key: string, props?: {[key: string]: string|number}, fallback?: string): string => {

  if (!translations) {
    translations = (window as any).Translations || {}
  }

  let locale = document?.documentElement?.lang || 'en',
      localeTranslations = locale in translations ? translations[locale] : {},
      translated = localeTranslations[key] || ''

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
