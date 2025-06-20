import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/reduxHooks/useAppDispatch';
import { checkAuth } from '@/features/authSlice/authSlice';
import { refreshAccessToken } from '@/utils/refreshAccessToken';

export const OAuth2RedirectHandlerCookies = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const handleOAuth = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const error = urlParams.get('error');

        if (error) {
          console.error('OAuth error:', error);
          navigate('/login?error=oauth_failed');
          return;
        }

        // Дати бекенду трохи часу для встановлення cookies
        await new Promise((resolve) => setTimeout(resolve, 300));

        // Отримати accessToken через cookies
        const accessToken = await refreshAccessToken();

        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
        } else {
          console.error('No access token received after OAuth');
          navigate('/login?error=oauth_failed');
          return;
        }

        // Перевірити користувача
        const result = await dispatch(checkAuth());

        if (checkAuth.fulfilled.match(result)) {
          navigate('/profile');
        } else {
          console.error('OAuth checkAuth failed:', result.payload);
          navigate('/login?error=oauth_failed');
        }
      } catch (error) {
        console.error('OAuth redirect error:', error);
        navigate('/login?error=oauth_failed');
      } finally {
        setIsProcessing(false);
      }
    };

    handleOAuth();
  }, [dispatch, navigate]);

  if (isProcessing) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <div>Завершення авторизації...</div>
        <div>Зачекайте, будь ласка</div>
      </div>
    );
  }

  return null;
};
