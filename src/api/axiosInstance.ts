import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { refreshAccessToken } from '@/utils/refreshAccessToken';
import { API_BASE } from '@/config/api';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

type TokenQueueItem = {
  resolve: (token: string) => void;
  reject: (error: Error | AxiosError) => void;
};

let isRefreshing = false;
let failedQueue: TokenQueueItem[] = [];

const processQueue = (error: Error | AxiosError | null, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token!);
    }
  });
  failedQueue = [];
};

export const axiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const noAuthEndpoints = ['/auth/login', '/auth/register'];

  const shouldSkipAuth = noAuthEndpoints.some((url) => config.url?.includes(url));

  if (shouldSkipAuth) return config;

  const accessToken = localStorage.getItem('accessToken');
  if (accessToken && config.headers) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers['Authorization'] = `Bearer ${token}`;
            }
            return axiosInstance(originalRequest);
          })
          .catch((err: Error | AxiosError) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newAccessToken = await refreshAccessToken();

        if (!newAccessToken) {
          throw new Error('Failed to refresh token');
        }

        localStorage.setItem('accessToken', newAccessToken);
        processQueue(null, newAccessToken);

        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        }

        return axiosInstance(originalRequest);
      } catch (err: unknown) {
        const typedError =
          err instanceof Error || axios.isAxiosError(err)
            ? err
            : new Error('Unknown error during token refresh');

        processQueue(typedError, null);
        return Promise.reject(typedError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
