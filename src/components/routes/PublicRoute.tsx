import { select } from '@/features/authSlice/authSlice';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const isAuthenticated = useSelector(select.loginStatus) === 'authenticated';

  if (isAuthenticated) {
    return <Navigate to="/search" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
