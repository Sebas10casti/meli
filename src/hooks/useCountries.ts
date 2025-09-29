import { Country } from '@/models/country';
import { countryMocks } from '@/mocks/countryMocks';
import { delay } from '@/utils/utils';
import { useCache } from './useCache';
import { useAuthToken } from './useAuthToken';
import getCountries from '@/services/countryService';
import { environment } from '@/config/environments';

const COUNTRIES_DATA_KEY = 'mercadolibre_countries_data';
const COUNTRIES_DATA_TIMESTAMP_KEY = 'mercadolibre_countries_data_timestamp';
const CACHE_EXPIRY_TIME = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * Provides a fallback list of countries in case of error.
 * @returns {Country[]} The fallback list of countries.
 */
const getFallbackCountries = (): Country[] => [
  { id: 'AR', name: 'Argentina' },
  { id: 'BR', name: 'Brasil' },
  { id: 'CL', name: 'Chile' },
  { id: 'CO', name: 'Colombia' },
  { id: 'MX', name: 'México' },
  { id: 'PE', name: 'Perú' },
  { id: 'UY', name: 'Uruguay' },
  { id: 'US', name: 'Estados Unidos' }
];

/**
 * Fetches countries data from the mock source.
 * This function can be replaced with a real API call in the future.
 * @returns {Promise<Country[]>} A promise that resolves to the list of mock countries.
 */
const fetchMockCountries = async (): Promise<Country[]> => {
  await delay(200);
  return countryMocks;
};

/**
 * Custom React hook to manage countries data with caching and error handling.
 * @returns {{ countries: Country[], isLoading: boolean, error: string | null }} An object containing the countries list, loading state, and error state.
 */
export const useCountries = () => {
  const { getAuthHeaders, hasValidToken } = useAuthToken();
  
  const fetchCountriesData = async (): Promise<Country[]> => {
    // Use environment configuration to determine data source
    if (!environment.useMockData && hasValidToken()) {
      try {
        const headers = getAuthHeaders();
        const headersObj = new Headers();
        Object.entries(headers).forEach(([key, value]) => {
          if (value !== undefined) {
            headersObj.set(key, value);
          }
        });
        const data = await getCountries(headersObj);
        return data.countries || [];
      } catch (error) {
        console.error('Error fetching countries from API, falling back to mock:', error);
        // Fall back to mock data if API fails
        return fetchMockCountries();
      }
    }
    
    // Use mock data if configured to do so or if no valid token
    return fetchMockCountries();
  };

  const { data, isLoading, error } = useCache<Country[]>({
    key: COUNTRIES_DATA_KEY,
    timestampKey: COUNTRIES_DATA_TIMESTAMP_KEY,
    expiryTime: CACHE_EXPIRY_TIME,
    fallbackData: getFallbackCountries(),
    fetchData: fetchCountriesData
  });

  return {
    countries: data || [],
    isLoading,
    error
  };
};
