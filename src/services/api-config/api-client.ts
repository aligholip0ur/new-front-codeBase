import { ApiError } from '@/lib';
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: '',
  timeout: 15000,
});

apiClient.interceptors.request.use((config) => {
  config.headers.set('stk', sessionStorage.getItem('stk') || localStorage.getItem('stk') || '');
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    if (response.data?.resCode !== 1) {
      throw new ApiError(response.data?.resMessage || 'عملیات ناموفق بود');
    }
    return response;
  },
  (error) => {
    if (axios.isCancel(error)) throw error;
    throw new ApiError(error.response?.data?.resMessage || 'ارتباط با سرور برقرار نشد');
  }
);
