import styles from './Header.module.scss';
import logo from '../../../assets/images/common/logoObminBook.svg';
import { useNavigate } from 'react-router-dom';
import UserMenu from '../../widgets/userMenu/UserMenu';
import { useSelector } from 'react-redux';
import { select } from '@/features/authSlice/authSlice';
import HeaderSkeleton from '@/components/skeletons/HeaderSkeleton';

interface HeaderProps {
  showLoginButton?: boolean;
  withSkeleton?: boolean;
  centerLogo?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  showLoginButton = false,
  withSkeleton = true,
  centerLogo = false,
}) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(select.loginStatus) === 'authenticated';
  const isLoading = useSelector(select.loginStatus) === 'loading';

  if (isLoading && withSkeleton) {
    return <HeaderSkeleton />;
  }

  // const handleFakeAccess = () => {
  //   console.log('Fake token generated');

  //   localStorage.setItem(
  //     'accessToken',
  //     'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiYXJiYW5paG8yQGdtYWlsLmNvbSIsImlhdCI6MTc0Nzc2NDE5NywiZXhwIjoxNzQ3NzY1Mzk3fQ.zVXEwzCSbMEqxtJ7s1QSn-uJXN_KIstm3uHCcxUGUys'
  //   );
  // };

  return (
    <header className={styles.header}>
      <div
        className={`${
          centerLogo ? styles.container__center : styles.container
        }`}
      >
        <div
          className={`${centerLogo ? styles.brand__center : styles.brand}`}
          onClick={() => navigate('/')}
        >
          <img src={logo} alt="header__logo" />
          <span className={styles.title}>ObminBook</span>
        </div>
        {isAuthenticated && <UserMenu />}

        {/* <button onClick={() => handleFakeAccess()}>
          Set random access token
        </button> */}

        {showLoginButton && !isAuthenticated && (
          <div className={styles.auth}>
            <div className={styles.authBtn} onClick={() => navigate('/login')}>
              Увійти
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
