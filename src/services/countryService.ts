import { CountriesResponse } from "@/models/country";
import { environment } from "@/config/environments";

const API_TIMEOUT = 10000; // 10 seconds

const getCountries = async (headers: Headers) => {
    const response = await fetch(`${environment.apiBaseUrl}/classified_locations/countries`, { 
        headers,
        signal: AbortSignal.timeout(API_TIMEOUT)
    });
    const data: CountriesResponse = await response.json();
    return data;
};

export default getCountries;