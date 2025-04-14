import React from 'react';
import styles from './Header.module.scss';
import logo from '../../assets/images/logoObminBook.svg';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  showLoginButton?: boolean;
  centerLogo?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  showLoginButton = false,
  centerLogo = false,
}) => {
  const navigate = useNavigate();

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
        >
          <img src={logo} alt="header__logo" />
          <span className={styles['header__title']}>ObminBook</span>
        </div>
        {showLoginButton && (
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
