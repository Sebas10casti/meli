import { useEffect, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from './Button';
import { environment } from '../config/environments';

interface GoogleCaptchaProps {
  onVerify: (token: string | null) => void;
  onError?: (error: string) => void;
  isVerified?: boolean;
  isLoading?: boolean;
}

declare global {
  interface Window {
    grecaptcha?: {
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
      ready: (callback: () => void) => void;
    };
  }
}

export function GoogleCaptcha({
  onVerify,
  onError,
  isVerified = false,
  isLoading = false,
}: GoogleCaptchaProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scriptError, setScriptError] = useState<string | null>(null);
  const scriptAddedRef = useRef(false);
  const { t } = useTranslation();

  // Cargar script de reCAPTCHA solo una vez
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.grecaptcha) {
      setIsLoaded(true);
      return;
    }

    if (scriptAddedRef.current) return;
    scriptAddedRef.current = true;

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${environment.publicRecaptchaSiteKey}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (window.grecaptcha && typeof window.grecaptcha.ready === 'function') {
        window.grecaptcha.ready(() => {
          setIsLoaded(true);
        });
      } else {
        setScriptError('Failed to load reCAPTCHA');
        onError?.('Failed to load reCAPTCHA');
      }
    };

    script.onerror = () => {
      setScriptError('Failed to load reCAPTCHA');
      onError?.('Failed to load reCAPTCHA');
    };

    document.head.appendChild(script);

    // Limpieza: eliminar el script si el componente se desmonta
    return () => {
      script.remove();
    };
    // eslint-disable-next-line
  }, [onError]);

  // Función para ejecutar reCAPTCHA
  const executeRecaptcha = useCallback(async () => {
    if (!isLoaded || !window.grecaptcha) {
      onError?.('reCAPTCHA not loaded');
      return;
    }

    try {
      const token = await window.grecaptcha.execute(
        environment.publicRecaptchaSiteKey!,
        { action: 'purchase_verification' }
      );
      onVerify(token);
    } catch (e) {
      onError?.('reCAPTCHA verification failed');
    }
  }, [isLoaded, onVerify, onError]);

  return (
    <div className="flex flex-col items-center space-y-2">
      <label className="text-xs font-medium text-gray-600">
        {t('recaptcha.title')}
      </label>

      {scriptError && (
        <div className="text-xs text-red-600">{scriptError}</div>
      )}

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
          disabled={!isLoaded || isLoading || !!scriptError}
          loading={isLoading}
          variant="secondary"
          size="sm"
          className="w-auto px-4"
        >
          {!isLoaded
            ? t('recaptcha.loading')
            : t('recaptcha.label')}
        </Button>
      )}
    </div>
  );
}
