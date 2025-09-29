import { useCallback } from "react";
import { type UserData } from "../models/user";
import { userMocks } from "../mocks/userMocks";
import { useCache } from "./useCache";
import { useAuthToken } from "./useAuthToken";
import { getUser } from "../services/userService";
import { environment } from "../config/environments";

const USER_DATA_KEY = "mercadolibre_user_data";
const USER_DATA_TIMESTAMP_KEY = "mercadolibre_user_data_timestamp";
const CACHE_EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Fetches user data from the mock source.
 * This function can be replaced with a real API call in the future.
 * @returns {Promise<UserData>} A promise that resolves to the user data.
 */
const fetchMockUserData = async (): Promise<UserData> => {
  // Simulamos delay de red (reducido para mejor UX)
  await new Promise((resolve) => setTimeout(resolve, 300));
  return userMocks;
};

export const useUser = (userId?: string) => {
  const { getAuthHeaders, hasValidToken } = useAuthToken();
  
  const fetchUserData = async (): Promise<UserData> => {
    // Use environment configuration to determine data source
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
        // Fall back to mock data if API fails
        return fetchMockUserData();
      }
    }
    
    // Use mock data if configured to do so or if no valid token/userId
    return fetchMockUserData();
  };

  const { data: userData, isLoading, error } = useCache<UserData>({
    key: USER_DATA_KEY,
    timestampKey: USER_DATA_TIMESTAMP_KEY,
    expiryTime: CACHE_EXPIRY_TIME,
    fallbackData: userMocks,
    fetchData: fetchUserData
  });

  // Función helper para obtener el nombre completo
  const getFullName = useCallback(() => {
    if (!userData) return "";
    return `${userData.first_name} ${userData.last_name}`.trim();
  }, [userData]);

  // Función helper para obtener la dirección completa
  const getFullAddress = useCallback(() => {
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
