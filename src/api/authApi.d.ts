import { AxiosResponse } from 'axios';
import { User } from '../types/User';

export declare const loginRequest: (
  email: string,
  password: string
) => Promise<AxiosResponse<Record<string, unknown>>>;

export declare const fetchUserRequest: () => Promise<AxiosResponse<User>>;

export declare const registerRequest: (payload: {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}) => Promise<AxiosResponse<{ validationCode: string }>>;

export declare const verificationRequest: (
  email: string,
  code: string
) => Promise<AxiosResponse<Record<string, unknown>>>;
