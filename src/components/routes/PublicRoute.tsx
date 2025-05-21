import { select } from '@/features/authSlice/authSlice';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const isAuthenticated = useSelector(select.loginStatus) === 'authenticated';

  if (isAuthenticated) {
    // Якщо юзер залогінений — редірект на profile
    return <Navigate to="/profile" replace />;
  }

  // Якщо не залогінений — показуємо сторінку (логін, реєстрація і т.п.)
  return <Outlet />;
};

export default PublicRoute;
