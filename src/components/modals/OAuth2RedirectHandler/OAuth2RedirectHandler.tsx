import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/reduxHooks/useAppDispatch';
import { oauth2Login } from '@/features/authSlice/authSlice';

export const OAuth2RedirectHandlerCookies = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const handleOAuth = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const error = urlParams.get('error');
        const code = urlParams.get('code');

        if (error) {
          console.error('OAuth error:', error);
          navigate('/login?error=oauth_failed');
          return;
        }

        if (!code) {
          console.error('No authorization code received');
          navigate('/login?error=oauth_failed');
          return;
        }

        // Використовуємо наявний oauth2Login thunk
        const result = await dispatch(oauth2Login({ code }));

        if (oauth2Login.fulfilled.match(result)) {
          navigate('/profile');
        } else {
          console.error('OAuth login failed:', result.payload);
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
