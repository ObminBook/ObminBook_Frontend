import { API_BASE } from '@/config/api';
import axios from 'axios';

export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const url = `${API_BASE}/auth/refresh`;

    // Debug логування
    console.log('=== REFRESH TOKEN DEBUG ===');
    console.log('API_BASE:', API_BASE);
    console.log('Full URL:', url);
    console.log('Environment:', import.meta.env.MODE);
    console.log('VITE_API_BASE:', import.meta.env.VITE_API_BASE);
    console.log('User agent:', navigator.userAgent);
    console.log('Current origin:', window.location.origin);

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
    console.log('✅ Refresh successful, token length:', newAccessToken?.length || 0);

    localStorage.setItem('accessToken', newAccessToken);
    return newAccessToken;
  } catch (error: any) {
    console.log('❌ REFRESH TOKEN ERROR ===');
    console.log('Error type:', error.constructor.name);
    console.log('Status:', error.response?.status);
    console.log('Status text:', error.response?.statusText);
    console.log('Response data:', error.response?.data);
    console.log('Request URL:', error.config?.url);
    console.log('Full error:', error);

    localStorage.removeItem('accessToken');
    return null;
  }
};
