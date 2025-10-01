import { useCallback } from "react";
import { type UserData } from "../models/user";
import { userMocks } from "../mocks/userMocks";
import { useCache } from "./useCache";
import { useAuthToken } from "./useAuthToken";
import { getUser } from "../services/userService";
import { environment } from "../config/environments";

const USER_DATA_KEY = "mercadolibre_user_data";
const USER_DATA_TIMESTAMP_KEY = "mercadolibre_user_data_timestamp";
const CACHE_EXPIRY_TIME = 24 * 60 * 60 * 1000;

/**
 * Fetches user data from the mock source.
 * @returns {Promise<UserData>} A promise that resolves to the user data.
 */
const fetchMockUserData = async (): Promise<UserData> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return userMocks;
};

/**
 * Custom React hook to manage user data with caching and error handling.
 *
 * @param {string} [userId] - The ID of the user to fetch.
 * @returns {{
 *   userData: UserData | null,
 *   isLoading: boolean,
 *   error: string | null,
 *   getFullName: () => string,
 *   getFullAddress: () => string
 * }} An object containing the user data, loading state, error state, and helper functions.
 */
export const useUser = (userId?: string) => {
  const { getAuthHeaders, hasValidToken } = useAuthToken();

  /**
   * Fetches user data from the API or falls back to mock data if necessary.
   * @returns {Promise<UserData>} A promise that resolves to the user data.
   */
  const fetchUserData = async (): Promise<UserData> => {
    if (!environment.useMockData && hasValidToken() && userId) {
      try {
        const headers = getAuthHeaders();
        const headersObj = new Headers();
        Object.entries(headers).forEach(([key, value]) => {
          if (value !== undefined) {
            headersObj.set(key, value);
          }
        });
        const data = await getUser({ userId, headers: headersObj });
        return data;
      } catch (error) {
        console.error('Error fetching user data from API, falling back to mock:', error);
        return fetchMockUserData();
      }
    }
    return fetchMockUserData();
  };

  const { data: userData, isLoading, error } = useCache<UserData>({
    key: USER_DATA_KEY,
    timestampKey: USER_DATA_TIMESTAMP_KEY,
    expiryTime: CACHE_EXPIRY_TIME,
    fallbackData: userMocks,
    fetchData: fetchUserData
  });

  /**
   * Returns the user's full name.
   * @returns {string} The full name, or an empty string if user data is not available.
   */
  const getFullName = useCallback((): string => {
    if (!userData) return "";
    return `${userData.first_name} ${userData.last_name}`.trim();
  }, [userData]);

  /**
   * Returns the user's full address.
   * @returns {string} The full address, or an empty string if user data is not available.
   */
  const getFullAddress = useCallback((): string => {
    if (!userData) return "";
    const { address, city, state } = userData.address;
    return `${address}, ${city}, ${state}`.trim();
  }, [userData]);

  return {
    userData,
    isLoading,
    error,
    getFullName,
    getFullAddress,
  };
};
