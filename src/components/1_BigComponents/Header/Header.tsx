import styles from './Header.module.scss';
import logo from '../../../assets/images/all_imgs/common/logoObminBook.svg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import UserMenu from '../../2_MiddleComponents/UserMenu/UserMenu';

interface HeaderProps {
  showLoginButton?: boolean;
  centerLogo?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  showLoginButton = false,
  centerLogo = false,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <header className={styles['header']}>
      <div
        className={`${
          centerLogo
            ? styles['header__container--center']
            : styles['header__container']
        }`}
      >
        <div
          className={`${
            centerLogo
              ? styles['header__brand--center']
              : styles['header__brand']
          }`}
          onClick={() => navigate('/')}
        >
          <img src={logo} alt="header__logo" />
          <span className={styles['header__title']}>ObminBook</span>
        </div>
        {true && <UserMenu />}
        {showLoginButton && !user && (
          <div className={styles['header__auth']}>
            <div
              className={styles['header__auth-btn']}
              onClick={() => navigate('/login')}
            >
              Увійти
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
