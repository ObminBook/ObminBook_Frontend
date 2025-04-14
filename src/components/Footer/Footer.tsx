import React from 'react';
import styles from './Footer.module.scss';
import { useNavigate } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className={styles['footer']}>
      <div className={styles['footer__container']}>
        <div className={styles['footer__copyright']}>
          <p>© 2025 ObminBook. Усі права захищені.</p>
        </div>
        <div className={styles['footer__links']}>
          <ul className={styles['footer__linksList']}>
            <li className={styles['footer__link']}>Умови</li>
            <li className={styles['footer__link']}>Конфіденційність</li>
            <li className={styles['footer__link']}>Контакти</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
