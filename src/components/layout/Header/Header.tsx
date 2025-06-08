import styles from './Header.module.scss';
import logo from '../../../assets/images/common/logoObminBook.svg';
import { useNavigate } from 'react-router-dom';
import UserMenu from '../../widgets/userMenu/UserMenu';
import { useSelector } from 'react-redux';
import { select } from '@/features/authSlice/authSlice';
import { Navbar } from '@/components/widgets/navbar/Navbar';
import HeaderUserSkeleton from '@/components/skeletons/HeaderSkeleton';

interface HeaderProps {
  showLoginButton?: boolean;
  withSkeleton?: boolean;
  centerLogo?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  showLoginButton = false,
  withSkeleton,
  centerLogo = false,
}) => {
  const navigate = useNavigate();
  const loginStatus = useSelector(select.loginStatus);

  const isAuthenticated = loginStatus === 'authenticated';
  const isLoading = loginStatus === 'loading';

  return (
    <header className={styles.header}>
      <div className={`${centerLogo ? styles.container__center : styles.container}`}>
        <div
          className={`${centerLogo ? styles.brand__center : styles.brand}`}
          onClick={() => navigate('/')}
        >
          <img src={logo} alt="header__logo" />
          <span className={styles.title}>ObminBook</span>
        </div>
        {isAuthenticated && <Navbar />}

        {isLoading && withSkeleton ? (
          <HeaderUserSkeleton />
        ) : isAuthenticated ? (
          <UserMenu />
        ) : showLoginButton ? (
          <div className={styles.auth}>
            <div className={styles.authBtn} onClick={() => navigate('/login')}>
              Увійти
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
};
