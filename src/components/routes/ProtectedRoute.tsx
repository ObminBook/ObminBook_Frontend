import { select } from '@/features/authSlice/authSlice';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { Loader } from '../base/Loader/Loader';
import styles from './ProtectedRoute.module.scss'; // додаємо fadeOut клас
import { userMenuIcons } from '@/assets/images/userMenu';

const ProtectedRoute = () => {
  const authStatus = useSelector(select.loginStatus);
  const logoutStatus = useSelector(select.logoutStatus);

  if (logoutStatus === 'loading') {
    return (
      <div className={styles.fadeOutScreen}>
        <img className={styles.logoutIcon} src={userMenuIcons.iconLogout} alt="logout" />
        <p>Вихід...</p>
      </div>
    );
  }

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
