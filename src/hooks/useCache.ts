import { useState, useEffect, useCallback } from 'react';

/**
 * Generic cache configuration interface
 */
interface CacheConfig<T> {
  key: string;
  timestampKey: string;
  expiryTime: number; // in milliseconds
  fallbackData: T;
  fetchData: () => Promise<T>;
}

/**
 * Generic cache hook for localStorage management
 * @param config - Cache configuration object
 * @returns Object with cached data, loading state, error state, and cache management functions
 */
export const useCache = <T>(config: CacheConfig<T>) => {
  const [data, setData] = useState<T | null>(() => {
    if (typeof window === 'undefined') return null;
    
    try {
      const cachedData = localStorage.getItem(config.key);
      const timestamp = localStorage.getItem(config.timestampKey);
      
      if (!cachedData || !timestamp) return null;
      
      const now = Date.now();
      const cacheTime = parseInt(timestamp);
      
      if (now - cacheTime < config.expiryTime) {
        return JSON.parse(cachedData);
      }
      
      // Cache expired, remove it
      localStorage.removeItem(config.key);
      localStorage.removeItem(config.timestampKey);
      return null;
    } catch (error) {
      console.error(`Error reading ${config.key} from localStorage:`, error);
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Save data to localStorage with timestamp
   */
  const setCachedData = useCallback((newData: T): void => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(config.key, JSON.stringify(newData));
      localStorage.setItem(config.timestampKey, Date.now().toString());
    } catch (error) {
      console.error(`Error saving ${config.key} to localStorage:`, error);
    }
  }, [config.key, config.timestampKey]);

  /**
   * Clear cached data from localStorage
   */
  const clearCache = useCallback((): void => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem(config.key);
      localStorage.removeItem(config.timestampKey);
      setData(null);
    } catch (error) {
      console.error(`Error clearing ${config.key} from localStorage:`, error);
    }
  }, [config.key, config.timestampKey]);

  /**
   * Force refresh data from source
   */
  const refreshData = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const newData = await config.fetchData();
      setData(newData);
      setCachedData(newData);
    } catch (err) {
      console.error(`Error fetching ${config.key}:`, err);
      setError(err instanceof Error ? err.message : `Error al cargar ${config.key}`);
      
      // Use fallback data on error
      setData(config.fallbackData);
      setCachedData(config.fallbackData);
    } finally {
      setIsLoading(false);
    }
  }, [config.fetchData, config.fallbackData, setCachedData]);

  /**
   * Load data if not already cached
   */
  useEffect(() => {
    if (data !== null) return; // Data already available

    refreshData();
  }, [data, refreshData]);

  return {
    data,
    isLoading,
    error,
    setCachedData,
    clearCache,
    refreshData
  };
};
