// src/components/base/LogoutOverlay/LogoutOverlay.tsx
import { useSelector } from 'react-redux';
import { select } from '@/features/authSlice/authSlice';
import styles from './LogoutOverlay.module.scss';
import { userMenuIcons } from '@/assets/images/userMenu';

export const LogoutOverlay = () => {
  const logoutStatus = useSelector(select.logoutStatus);

  if (logoutStatus !== 'loading') return null;

  return (
    <div className={styles.fadeOutScreen}>
      <img className={styles.logoutIcon} src={userMenuIcons.iconLogout} alt="logout" />
      <p>Вихід...</p>
    </div>
  );
};
