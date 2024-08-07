'use client';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { handleRefreshToken } from './api';
// import { message } from 'lib/utils';

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

axiosClient.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken && config.url !== '/register') {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response.data,

  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      alert('Your session has expired. Please login again.');

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newAccessToken = await handleRefreshToken();
          console.log('newAccessToken', newAccessToken);

          useAuthStore
            .getState()
            .login(newAccessToken, useAuthStore.getState().refreshToken || '');
          isRefreshing = false;
          onRefreshed(newAccessToken);
        } catch (refreshError) {
          useAuthStore.getState().logout();
          isRefreshing = false;
          throw refreshError;
        }
      }

      return new Promise((resolve) => {
        addRefreshSubscriber((newToken: string) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          resolve(axiosClient(originalRequest));
        });
      });
    }
    throw error;
  }
);

const apiRequest = async (
  config: AxiosRequestConfig
): Promise<AxiosResponse<any>> => {
  const accessToken = useAuthStore.getState().accessToken;
  const refreshToken = useAuthStore.getState().refreshToken;

  const loginPath = '/login/';
  const registerPath = '/register/';
  const homePath = '/';

  const { pathname } = window.location;

  if (
    (!accessToken || !refreshToken) &&
    pathname !== loginPath &&
    pathname !== registerPath &&
    pathname !== homePath
  ) {
    throw new Error('Access token or refresh token not found');
  }

  if (accessToken && isTokenExpired(accessToken)) {
    try {
      const newAccessToken = await handleRefreshToken();
      useAuthStore.getState().login(newAccessToken, refreshToken || '');
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${newAccessToken}`
      };
    } catch (error) {
      useAuthStore.getState().logout();
      throw error;
    }
  } else if (accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`
    };
  }

  return axiosClient(config);
};

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    return true;
  }
};

export default apiRequest;
