import { checkAuth } from '@/features/authSlice/authSlice';
import { useAppDispatch } from '@/reduxHooks/useAppDispatch';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  console.log('OAuth2RedirectHandler rendered');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await dispatch(checkAuth()).unwrap();
        navigate('/search');
      } catch {
        navigate('/login');
      }
    };
    fetchUser();
  }, [dispatch, navigate]);

  return <p>Авторизація через Google... Зачекайте</p>;
};

export default OAuth2RedirectHandler;
