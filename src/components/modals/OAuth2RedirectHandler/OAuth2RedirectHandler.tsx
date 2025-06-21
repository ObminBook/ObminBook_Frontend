import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/reduxHooks/useAppDispatch';
import { checkAuth } from '@/features/authSlice/authSlice';

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('fetchUser started');
    const fetchUser = async () => {
      try {
        await dispatch(checkAuth()).unwrap();
        console.log('checkAuth success');
        navigate('/search');
      } catch (err) {
        console.error('checkAuth error', err);
        navigate('/login');
      }
    };
    fetchUser();
  }, [dispatch, navigate]);

  return <p>Авторизація через Google... Зачекайте</p>;
};

export default OAuth2RedirectHandler;
