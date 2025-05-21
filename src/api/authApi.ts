// src/api/authApi.ts
import { axiosInstance } from './axiosInstance';
import { User } from '@/types/User';

export const loginRequest = (email: string, password: string) =>
  axiosInstance.post('/auth/login', { email, password });

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
