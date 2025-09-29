import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import es from './locales/es.json';
import pt from './locales/pt.json';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '../config/languages';

const resources = {
  en: { translation: en },
  es: { translation: es },
  pt: { translation: pt }
};

const getLanguageFromURL = (): string => {
  const segments = window.location.pathname.split('/').filter(Boolean);
  let lang = segments[0];

  if (
    segments.length > 1 &&
    segments[0] === 'meli' &&
    SUPPORTED_LANGUAGES.includes(segments[1] as any)
  ) {
    lang = segments[1];
  }

  if (SUPPORTED_LANGUAGES.includes(lang as any)) return lang;

  const storedLang = localStorage.getItem('i18nextLng');
  if (storedLang && SUPPORTED_LANGUAGES.includes(storedLang as any)) return storedLang;

  const browserLang = navigator.language.split('-')[0];
  return SUPPORTED_LANGUAGES.includes(browserLang as any) ? browserLang : DEFAULT_LANGUAGE;
};

export const changeLanguage = (lng: string) => {
  const segments = window.location.pathname.split('/').filter(Boolean);
  const isProd = segments[0] === 'meli';

  if (isProd) {
    if (segments.length > 1 && SUPPORTED_LANGUAGES.includes(segments[1] as any)) {
      segments[1] = lng;
    } else {
      segments.push(lng);
    }
  } else {
    if (segments.length > 0 && SUPPORTED_LANGUAGES.includes(segments[0] as any)) {
      segments[0] = lng;
    } else {
      segments.unshift(lng);
    }
  }

  window.history.pushState({}, '', '/' + segments.join('/'));
  i18n.changeLanguage(lng);
  localStorage.setItem('i18nextLng', lng);
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getLanguageFromURL(),
    fallbackLng: DEFAULT_LANGUAGE,
    debug: import.meta.env.DEV,
    interpolation: { escapeValue: false }
  });

export default i18n;