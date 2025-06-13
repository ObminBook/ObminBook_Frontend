import { API_BASE } from '@/config/api';
import axios from 'axios';

export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const url = `${API_BASE}/auth/refresh`;

    const response = await axios.post<string>(
      url,
      {},
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 секунд таймаут
      }
    );

    const newAccessToken = response.data;

    localStorage.setItem('accessToken', newAccessToken);
    return newAccessToken;
  } catch {
    localStorage.removeItem('accessToken');
    return null;
  }
};
