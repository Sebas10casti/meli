import { useState, useEffect, useCallback } from 'react';

// Clave para localStorage del token
const AUTH_TOKEN_KEY = 'mercadolibre_auth_token';

export const useAuthToken = () => {
  const [token, setToken] = useState<string | null>(null);

  // Función para obtener token del localStorage
  const getCachedToken = (): string | null => {
    if (typeof window === 'undefined') return null;
    
    try {
      return localStorage.getItem(AUTH_TOKEN_KEY);
    } catch (error) {
      console.error('Error reading token from localStorage:', error);
      return null;
    }
  };

  // Función para guardar token en localStorage
  const setCachedToken = (authToken: string): void => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(AUTH_TOKEN_KEY, authToken);
    } catch (error) {
      console.error('Error saving token to localStorage:', error);
    }
  };

  // Función para limpiar token
  const clearToken = useCallback((): void => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      setToken(null);
    } catch (error) {
      console.error('Error clearing token from localStorage:', error);
    }
  }, []);

  // Función para establecer token desde query param
  const setTokenFromQuery = useCallback((queryToken: string | null): void => {
    if (queryToken && queryToken.trim() !== '') {
      setToken(queryToken);
      setCachedToken(queryToken);
    }
  }, []);

  // Función para obtener headers de autorización
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

  // Función para verificar si el token está disponible
  const hasValidToken = useCallback((): boolean => {
    return !!token;
  }, [token]);

  // Inicializar token desde localStorage al cargar
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
