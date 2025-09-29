'use client';

import { useState, useCallback } from 'react';

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
      const response = await fetch('/api/verify-recaptcha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: recaptchaToken }),
      });

      const data = await response.json();

      if (data.success) {
        setToken(recaptchaToken);
        setIsVerified(true);
        setError(null);
      } else {
        setError(data.error || 'reCAPTCHA verification failed');
        setIsVerified(false);
      }
    } catch {
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
