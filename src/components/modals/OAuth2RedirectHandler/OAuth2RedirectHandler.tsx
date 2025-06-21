import { checkAuth } from '@/features/authSlice/authSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await checkAuth(); // Запит до бекенду
        navigate('/search'); // Перенаправити на головну чи куди треба
      } catch (error) {
        console.error('Auth check failed', error);
        navigate('/login'); // На всякий випадок
      }
    };

    fetchUser();
  }, [navigate]);

  return <p>Авторизація через Google... Зачекайте</p>;
};

export default OAuth2RedirectHandler;
