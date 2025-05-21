import axios from 'axios';
import { API_BASE } from '@/config/api';

export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const response = await axios.post<string>(
      `${API_BASE}auth/refresh`,
      {},
      { withCredentials: true } // обов'язково, якщо refreshToken у cookie
    );

    const newAccessToken = response.data;
    console.log(newAccessToken);

    localStorage.setItem('accessToken', newAccessToken);
    return newAccessToken;
  } catch {
    localStorage.removeItem('accessToken');
    return null;
  }
};
