import { useEffect, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from './Button';
import { environment } from '../config/environments';

/**
 * Props for the GoogleCaptcha component.
 * @typedef {Object} GoogleCaptchaProps
 * @property {(token: string | null) => void} onVerify - Callback fired when the captcha is successfully verified.
 * @property {(error: string) => void} [onError] - Optional callback fired when an error occurs.
 * @property {boolean} [isVerified] - Optional flag indicating if the captcha has already been verified.
 * @property {boolean} [isLoading] - Optional flag indicating if the verification is in progress.
 */
interface GoogleCaptchaProps {
  onVerify: (token: string | null) => void;
  onError?: (error: string) => void;
  isVerified?: boolean;
  isLoading?: boolean;
}

declare global {
  interface Window {
    /**
     * Google reCAPTCHA object injected by the reCAPTCHA script.
     */
    grecaptcha?: {
      /**
       * Executes the reCAPTCHA verification.
       * @param {string} siteKey - The site key for reCAPTCHA.
       * @param {{ action: string }} options - Options for the execution, including the action.
       * @returns {Promise<string>} - A promise that resolves to the verification token.
       */
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
      /**
       * Registers a callback to be executed when reCAPTCHA is ready.
       * @param {() => void} callback - The callback function.
       */
      ready: (callback: () => void) => void;
    };
  }
}

/**
 * GoogleCaptcha React component for integrating Google reCAPTCHA v3.
 *
 * Loads the reCAPTCHA script, handles verification, and displays status.
 *
 * @param {GoogleCaptchaProps} props - The props for the component.
 * @returns {JSX.Element} The rendered GoogleCaptcha component.
 */
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

  /**
   * Loads the reCAPTCHA script only once when the component mounts.
   * Sets the loaded state or error state accordingly.
   */
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

    return () => {
      script.remove();
    };
    // eslint-disable-next-line
  }, [onError]);

  /**
   * Executes the reCAPTCHA verification and calls the onVerify callback with the token.
   * Calls onError if verification fails or reCAPTCHA is not loaded.
   */
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
