import React from 'react';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.copyright}>
          <p>© 2025 ObminBook. Усі права захищені.</p>
        </div>
        <div className={styles.links}>
          <ul className={styles.linksList}>
            <li className={styles.link}>Умови</li>
            <li className={styles.link}>Конфіденційність</li>
            <li className={styles.link}>Контакти</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
