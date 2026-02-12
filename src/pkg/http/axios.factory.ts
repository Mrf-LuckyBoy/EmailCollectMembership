import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface HttpClientOptions {
  baseURL: string;
  headers?: Record<string, string>;
  timeout?: number;
}

export function createHttpClient(options: HttpClientOptions): AxiosInstance {
  const instance = axios.create({
    baseURL: options.baseURL,
    timeout: options.timeout ?? 50000,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  instance.interceptors.request.use(
    config => {
      console.log(`[HTTP REQUEST] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
      return config;
    },
    error => Promise.reject(error)
  );

  // 🔥 Response Interceptor
  instance.interceptors.response.use(
    response => {
      console.log(`[HTTP RESPONSE] ${response.status}`);
      return response;
    },
    error => {
      console.error('[HTTP ERROR]', error.response?.data || error.message);
      return Promise.reject(error);
    }
  );

  return instance;
}
