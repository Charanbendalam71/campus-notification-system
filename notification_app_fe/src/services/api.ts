import axios from 'axios';
import { Log } from 'logging_middleware';

const API_BASE_URL = '/api/evaluation-service';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    Log('frontend', 'error', 'api', `API Error: ${error.message} - URL: ${error.config?.url}`);
    return Promise.reject(error);
  }
);
