import type { UserData } from "../models/user";
import { environment } from "../config/environments";

export interface UpdateDataPayload {
  fullname: string;
  country: string;
  address: string;
}

/**
 * Updates the user's data.
 * @param {Object} params - The parameters for the updateData function.
 * @param {string} params.userId - The ID of the user to update.
 * @param {UpdateDataPayload} params.data - The data to update.
 * @param {Headers} params.headers - The headers to use for the request.
 * @returns {Promise<UserData>} The updated user data.
 */
export const updateData = async ({
  userId,
  data,
  headers,
}: {
  userId: string;
  data: UpdateDataPayload;
  headers: Headers;
}) => {
  const response = await fetch(`${environment.apiBaseUrl}/users/${userId}/update_data`, {
    method: "POST",
    headers: {
      ...Object.fromEntries(headers.entries()),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Failed to update data: ${response.statusText}`);
  }
  const updatedData: UserData = await response.json();
  return updatedData;
};