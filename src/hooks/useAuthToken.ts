import { useState, useEffect, useCallback } from 'react';

/**
 * Key used to store the authentication token in localStorage.
 * @type {string}
 */
const AUTH_TOKEN_KEY = 'mercadolibre_auth_token';

/**
 * Custom React hook for managing an authentication token using localStorage.
 *
 * Provides methods to get, set, clear, and check the token, as well as to generate
 * authorization headers for API requests.
 *
 * @returns {{
 *   token: string | null,
 *   setTokenFromQuery: (queryToken: string | null) => void,
 *   getAuthHeaders: () => Record<string, string>,
 *   hasValidToken: () => boolean,
 *   clearToken: () => void,
 *   setCachedToken: (authToken: string) => void
 * }}
 */
export const useAuthToken = () => {
  const [token, setToken] = useState<string | null>(null);

  /**
   * Retrieves the authentication token from localStorage.
   * @returns {string | null} The token if present, otherwise null.
   */
  const getCachedToken = (): string | null => {
    if (typeof window === 'undefined') return null;

    try {
      return localStorage.getItem(AUTH_TOKEN_KEY);
    } catch (error) {
      console.error('Error reading token from localStorage:', error);
      return null;
    }
  };

  /**
   * Stores the authentication token in localStorage.
   * @param {string} authToken - The token to store.
   * @returns {void}
   */
  const setCachedToken = (authToken: string): void => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(AUTH_TOKEN_KEY, authToken);
    } catch (error) {
      console.error('Error saving token to localStorage:', error);
    }
  };

  /**
   * Clears the authentication token from localStorage and state.
   * @returns {void}
   */
  const clearToken = useCallback((): void => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      setToken(null);
    } catch (error) {
      console.error('Error clearing token from localStorage:', error);
    }
  }, []);

  /**
   * Sets the authentication token from a query parameter, updating both state and localStorage.
   * @param {string | null} queryToken - The token to set.
   * @returns {void}
   */
  const setTokenFromQuery = useCallback((queryToken: string | null): void => {
    if (queryToken && queryToken.trim() !== '') {
      setToken(queryToken);
      setCachedToken(queryToken);
    }
  }, []);

  /**
   * Generates the headers required for authenticated API requests.
   * @returns {Record<string, string>} The headers object.
   */
  const getAuthHeaders = useCallback(() => {
    if (!token) {
      return {
        'Content-Type': 'application/json',
      };
    }

    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }, [token]);

  /**
   * Checks if a valid authentication token is present.
   * @returns {boolean} True if a token exists, false otherwise.
   */
  const hasValidToken = useCallback((): boolean => {
    return !!token;
  }, [token]);

  useEffect(() => {
    const cachedToken = getCachedToken();
    if (cachedToken) {
      setToken(cachedToken);
    }
  }, []);

  return {
    token,
    setTokenFromQuery,
    getAuthHeaders,
    hasValidToken,
    clearToken,
    setCachedToken
  };
};
