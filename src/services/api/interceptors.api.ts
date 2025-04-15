import axios from "axios";
import { API_URL } from "@/config/api.config";
import { deleteTokens, getAccessToken } from "@/services/auth/auth.helper";
import { errorCatch } from "@/services/api/error.api";
import { refreshTokens } from "@/services/api/helper-auth.api";

export const EXPIRED_TOKEN_ERRORS = new Set([
  "jwt expired",
  "jwt must be provided",
]);

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 5000,
});

instance.interceptors.request.use(
  (config) => {
    if (__DEV__) {
      console.log(`[Request] ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => {
    if (__DEV__) {
      console.error("[Request Error]", error);
    }
    return Promise.reject(error);
  },
);

instance.interceptors.request.use(async (config) => {
  try {
    const accessToken = await getAccessToken();
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  } catch (error) {
    if (__DEV__) {
      console.error("[Token Error]", error);
    }
    return config;
  }
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (__DEV__) {
      console.error("[Response Error]", error);
    }

    const originalRequest = error.config;
    const errorMessage = errorCatch(error);

    const shouldRefreshToken =
      error.response?.status === 401 &&
      EXPIRED_TOKEN_ERRORS.has(errorMessage) &&
      !originalRequest._isRetry;

    if (shouldRefreshToken) {
      try {
        originalRequest._isRetry = true;
        await refreshTokens();
        return instance(originalRequest);
      } catch (refreshError) {
        if (EXPIRED_TOKEN_ERRORS.has(errorCatch(refreshError))) {
          await deleteTokens();
        }
        return Promise.reject(refreshError);
      }
    }

    if (!error.response && originalRequest._retryCount < 2) {
      originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;
      await new Promise((resolve) => setTimeout(resolve, 300));
      return instance(originalRequest);
    }

    return Promise.reject(error);
  },
);

export default instance;
