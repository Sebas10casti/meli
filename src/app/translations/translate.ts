// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dictionaries: Record<string, () => Promise<Record<string, any>>> = {
  es: () => import("./es.json").then((module) => module.default),
  en: () => import("./en.json").then((module) => module.default),
  pt: () => import("./pt.json").then((module) => module.default),
}

export async function getTranslations(locale: string) {
  const dictionary = await dictionaries[locale]()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = (key: string, defaultValue = ""): any => {
    const keys = key.split('.');
    let value: any = dictionary;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return defaultValue;
      }
    }
    
    return typeof value === 'string' ? value : defaultValue;
  }

  const numberFormatter = new Intl.NumberFormat(locale).format
  const f = (n: number): string => {
    return numberFormatter(n)
  }

  const dateFormatter = new Intl.DateTimeFormat(locale).format
  const d = (date: Date): string => {
    return dateFormatter(date)
  }

  return { t, f, d }
}