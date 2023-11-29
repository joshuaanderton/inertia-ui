import translations from '@/../../lang/en.json?raw'

export const lang = (key: string, props?: {[key: string]: string|number}): string => {

  let translated = JSON.parse(translations)[key] || key

  if (props) {
    Object.entries(props).forEach(([key, value]: any) => {
      translated = translated.replace(`:${key}`, value)
    })
  }

  return translated
}

export default function useLang(): typeof lang {
  return lang
}
