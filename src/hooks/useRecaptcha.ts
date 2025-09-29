import { useState, useCallback } from 'react';
import { verifyRecaptcha } from '../utils/recaptchaService';

interface UseRecaptchaReturn {
  isVerified: boolean;
  token: string | null;
  error: string | null;
  isLoading: boolean;
  verify: (token: string | null) => Promise<void>;
  reset: () => void;
  setError: (error: string) => void;
}

export function useRecaptcha(): UseRecaptchaReturn {
  const [isVerified, setIsVerified] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
