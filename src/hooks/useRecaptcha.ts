import { useState, useCallback } from 'react';
import { verifyRecaptcha } from '../services/recaptchaService';

/**
 * The return type for the useRecaptcha hook.
 * @typedef {Object} UseRecaptchaReturn
 * @property {boolean} isVerified - Indicates if the reCAPTCHA has been successfully verified.
 * @property {string | null} token - The reCAPTCHA token if verification succeeded, otherwise null.
 * @property {string | null} error - The error message if verification failed, otherwise null.
 * @property {boolean} isLoading - Indicates if the verification process is ongoing.
 * @property {(token: string | null) => Promise<void>} verify - Function to verify the reCAPTCHA token.
 * @property {() => void} reset - Function to reset the verification state.
 * @property {(error: string) => void} setError - Function to manually set an error message.
 */
interface UseRecaptchaReturn {
  isVerified: boolean;
  token: string | null;
  error: string | null;
  isLoading: boolean;
  verify: (token: string | null) => Promise<void>;
  reset: () => void;
  setError: (error: string) => void;
}

/**
 * Custom React hook for managing Google reCAPTCHA verification state.
 *
 * Provides methods to verify a reCAPTCHA token, reset the verification state,
 * and manage loading and error states.
 *
 * @returns {UseRecaptchaReturn} The reCAPTCHA verification state and handlers.
 */
export function useRecaptcha(): UseRecaptchaReturn {
  const [isVerified, setIsVerified] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Verifies the provided reCAPTCHA token by calling the verification service.
   *
   * @param {string | null} recaptchaToken - The reCAPTCHA token to verify.
   * @returns {Promise<void>} A promise that resolves when verification is complete.
   */
  const verify = useCallback(async (recaptchaToken: string | null) => {
    if (!recaptchaToken) {
      setError('No reCAPTCHA token provided');
      setIsVerified(false);
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const result = await verifyRecaptcha(recaptchaToken);

      if (result.success) {
        setToken(recaptchaToken);
        setIsVerified(true);
        setError(null);
      } else {
        setError(result.error || 'reCAPTCHA verification failed');
        setIsVerified(false);
      }
    } catch (err) {
      setError('Network error during verification');
      setIsVerified(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Resets the reCAPTCHA verification state, clearing token, error, and loading status.
   *
   * @returns {void}
   */
  const reset = useCallback(() => {
    setIsVerified(false);
    setToken(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    isVerified,
    token,
    error,
    isLoading,
    verify,
    reset,
    setError
  };
}
