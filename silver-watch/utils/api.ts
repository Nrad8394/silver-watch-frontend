import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { BASE_URL } from "@/handler/apiConfig";
import { REFRESH_TOKEN_URL } from "@/handler/apiConfig";
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// Redirect to login
const redirectToLogin = () => {
  console.warn("Redirecting to login...");
//   window.location.href = "/login";
};

// Handle API errors
export const handleApiError = (error: AxiosError) => {
  if (error.response?.data) {
    console.error("API Error:", error.response.data);
    throw error.response.data;
  } else {
    console.error("API Error:", error.message);
    throw error;
  }
};

// Create Axios instance
axios.defaults.withCredentials = true;
export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Ensures cookies are sent with requests
});

// Function to refresh token
const refreshAuthToken = async () => {
  try {
    const response = await axios.post<{ access_token: string }>(REFRESH_TOKEN_URL, {}, { withCredentials: true });
    return response.data.access_token;
  } catch (error) {
    console.error("Token refresh failed", error);
    throw error;
  }
};

// Queue failed requests while refreshing token
const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

// Response interceptor for handling 401 errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest?._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshSubscribers.push((token) => {
            if (originalRequest.headers) {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
            }
            resolve(api(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newAccessToken = await refreshAuthToken();
        onRefreshed(newAccessToken);
        
        if (originalRequest.headers) {
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        }

        return api(originalRequest);
      } catch (refreshError) {
        console.error("Session expired, redirecting to login.");
        redirectToLogin();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
