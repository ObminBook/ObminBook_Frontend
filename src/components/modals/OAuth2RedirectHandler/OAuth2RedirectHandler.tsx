import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/reduxHooks/useAppDispatch';
import { fetchUser } from '@/features/authSlice/authSlice';

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      console.log('handlerworks');

      try {
        await dispatch(fetchUser()).unwrap();
        // navigate('/search');
      } catch {
        // navigate('/login');
      }
    };

    fetchCurrentUser();
  }, [dispatch, navigate]);

  return <p>Авторизація через Google... Зачекайте</p>;
};

export default OAuth2RedirectHandler;
