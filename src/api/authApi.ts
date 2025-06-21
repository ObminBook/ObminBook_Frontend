// src/api/authApi.ts
import { axiosInstance } from './axiosInstance';
import { User } from '@/types/User';

export const loginRequest = (email: string, password: string) =>
  axiosInstance.post('/auth/login', { email, password });

export const checkRefresh = async () => {
  const checkRefresh = await axiosInstance.get('/check-refresh');

  return checkRefresh;
};

export const fetchUserRequest = () => axiosInstance.get<User>('/me');

export const registerRequest = (payload: {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}) => axiosInstance.post<{ validationCode: string }>('/auth/register', payload);

export const verificationRequest = (email: string, code: string) =>
  axiosInstance.post('/auth/verification', { email, code });

export const userLogout = () => {
  const response = axiosInstance.post('/auth/logout');

  return response;
};

export const exchangeCodeForToken = (code: string) =>
  axiosInstance.post('/auth/oauth2/exchange', { code });
