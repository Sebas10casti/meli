import type { UserData } from "../models/user";
import { environment } from "../config/environments";

const API_TIMEOUT = 10000; // 10 seconds

export const getUser = async ({userId, headers}: {userId: string, headers: Headers}) => {
    const response = await fetch(`${environment.apiBaseUrl}/users/${userId}`, { 
        headers,
        signal: AbortSignal.timeout(API_TIMEOUT)
    });
    const data: UserData = await response.json();
    return data;
};