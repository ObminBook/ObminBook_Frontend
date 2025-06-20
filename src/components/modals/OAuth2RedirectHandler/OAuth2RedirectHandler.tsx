import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/reduxHooks/useAppDispatch';
import { checkAuth } from '@/features/authSlice/authSlice';

export const OAuth2RedirectHandlerCookies = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const handleOAuth = async () => {
      try {
        // Перевіряємо URL параметри на помилки
        const urlParams = new URLSearchParams(window.location.search);
        const error = urlParams.get('error');

        if (error) {
          console.error('OAuth error:', error);
          navigate('/login?error=oauth_failed');
          return;
        }

        // Невелика затримка для того, щоб бекенд встиг встановити cookies
        await new Promise((resolve) => setTimeout(resolve, 300));

        // Викликаємо checkAuth - він має отримати access token через refresh token
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
