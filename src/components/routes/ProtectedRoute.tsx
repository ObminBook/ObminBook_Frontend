import { select } from '@/features/authSlice/authSlice';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { Loader } from '../base/Loader/Loader';

const ProtectedRoute = () => {
  const authStatus = useSelector(select.loginStatus);

  if (authStatus === 'unauthenticated') {
    return <Navigate to="/login" replace />;
  }

  if (authStatus === 'idle' || authStatus === 'loading') {
    return (
      <div
        style={{
          display: 'flex',
          width: '100vw',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.35)',
          zIndex: 9999,
        }}
      >
        <Loader size={60} />
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
