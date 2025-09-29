import { getLocale, hasPathnameLocale, supportedLocales, defaultLocale } from '../i18n'

describe('i18n utils', () => {
  it('returns correct locale from headers', () => {
    const headers = { 'accept-language': 'es-ES,es;q=0.9,en;q=0.8' }
    const locale = getLocale(headers)
    
    expect(supportedLocales).toContain(locale)
    expect(locale).toBe('es')
  })

  it('returns default locale when no match', () => {
    const headers = { 'accept-language': 'fr-FR,fr;q=0.9' }
    const locale = getLocale(headers)
    
    expect(locale).toBe(defaultLocale)
  })

  it('checks if pathname has locale', () => {
    expect(hasPathnameLocale('/es/page')).toBe(true)
    expect(hasPathnameLocale('/en/page')).toBe(true)
    expect(hasPathnameLocale('/pt/page')).toBe(true)
    expect(hasPathnameLocale('/page')).toBe(false)
    expect(hasPathnameLocale('/fr/page')).toBe(false)
  })
})
