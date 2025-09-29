'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface Translations {
  [key: string]: any;
}

export function useTranslations() {
  const params = useParams();
  const [translations, setTranslations] = useState<Translations>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const locale = params?.lang as string || 'en';

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Importar las traducciones dinámicamente
        const translationsModule = await import(`@/app/translations/${locale}.json`);
        setTranslations(translationsModule.default || translationsModule);
      } catch (err) {
        console.error('Error loading translations:', err);
        setError('Failed to load translations');
        if (locale !== 'en') {
          try {
            const fallbackModule = await import(`@/app/translations/en.json`);
            setTranslations(fallbackModule.default || fallbackModule);
          } catch (fallbackErr) {
            console.error('Error loading fallback translations:', fallbackErr);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [locale]);

  const t = (key: string, defaultValue = ''): string => {
    if (isLoading) return defaultValue;
    
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return defaultValue;
      }
    }
    
    return typeof value === 'string' ? value : defaultValue;
  };

  const f = (n: number): string => {
    try {
      return new Intl.NumberFormat(locale).format(n);
    } catch {
      return n.toString();
    }
  };

  const d = (date: Date): string => {
    try {
      return new Intl.DateTimeFormat(locale).format(date);
    } catch {
      return date.toLocaleDateString();
    }
  };

  return {
    t,
    f,
    d,
    locale,
    isLoading,
    error
  };
}
