import { select } from '@/features/authSlice/authSlice';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { Loader } from '../base/Loader/Loader';

const ProtectedRoute = () => {
  const authStatus = useSelector(select.loginStatus);
  const isAuthenticated = authStatus === 'authenticated';
  const isAuthLoading = authStatus === 'loading';

  if (isAuthLoading) {
    // Поки йде перевірка, можна показати спінер або пустий екран
    return (
      <div
        style={{
          display: 'flex',
          width: '100vw',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Якщо не авторизований — редірект на логін
    return <Navigate to="/login" replace />;
  }

  // Якщо авторизований — показуємо сторінку
  return <Outlet />;
};

export default ProtectedRoute;
