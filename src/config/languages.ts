
export const SUPPORTED_LANGUAGES = ['es', 'en', 'pt'] as const;
export const DEFAULT_LANGUAGE = 'es';

export const LANGUAGE_NAMES = {
  es: 'Español',
  en: 'English', 
  pt: 'Português'
} as const;

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];
