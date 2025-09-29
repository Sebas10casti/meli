'use client';

import { useEffect, useCallback, useState } from 'react';
import { Button } from './Button';
import { useTranslations } from '@/hooks/useTranslations';

interface GoogleCaptchaProps {
  onVerify: (token: string | null) => void;
  onError?: (error: string) => void;
  isVerified?: boolean;
  isLoading?: boolean;
}

export function GoogleCaptcha({ onVerify, onError, isVerified = false, isLoading = false }: GoogleCaptchaProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const {t} = useTranslations();

  // Cargar script de reCAPTCHA
  useEffect(() => {
    const loadRecaptcha = () => {
      // Verificar si ya está cargado
      if (window.grecaptcha) {
        setIsLoaded(true);
        return;
      }

      // Cargar script dinámicamente
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        setIsLoaded(true);
      };
      
      script.onerror = () => {
        onError?.('Failed to load reCAPTCHA');
      };

      document.head.appendChild(script);
    };

    loadRecaptcha();
  }, [onError]);

  // Función para ejecutar reCAPTCHA
  const executeRecaptcha = useCallback(async () => {
    if (!isLoaded || !window.grecaptcha) {
      onError?.('reCAPTCHA not loaded');
      return;
    }

    try {
      const token = await window.grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
        { action: 'purchase_verification' }
      );
      onVerify(token);
    } catch (error) {
      onError?.('reCAPTCHA verification failed');
    }
  }, [isLoaded, onVerify, onError]);

  return (
    <div className="flex flex-col items-center space-y-2">
      <label className="text-xs font-medium text-gray-600">
        {t('recaptcha.title')}
      </label>
      
      {isVerified ? (
        <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-md">
          <svg 
            className="w-5 h-5 text-green-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
          <span className="text-sm font-medium text-gray-700">
            {t('recaptcha.verified')}
          </span>
        </div>
      ) : (
        <Button
          type="button"
          onClick={executeRecaptcha}
          disabled={!isLoaded || isLoading}
          loading={isLoading}
          variant="secondary"
          size="sm"
          className="w-auto px-4"
        >
          {!isLoaded ? t('recaptcha.loading') : t('recaptcha.label')}
        </Button>
      )}
    </div>
  );
}

// Declarar tipos globales para TypeScript
declare global {
  interface Window {
    grecaptcha: {
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
      ready: (callback: () => void) => void;
    };
  }
}
