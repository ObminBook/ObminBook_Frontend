import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/reduxHooks/useAppDispatch';
import { oauth2Login } from '@/features/authSlice/authSlice';

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        await dispatch(oauth2Login()).unwrap();
        navigate('/search');
      } catch {
        navigate('/login');
      }
    };

    authenticateUser();
  }, [dispatch, navigate]);

  return <p>Авторизація через Google... Зачекайте</p>;
};

export default OAuth2RedirectHandler;
