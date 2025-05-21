// HeaderSkeleton.tsx
import React from 'react';
import styles from './HeaderSkeleton.module.scss';

const HeaderSkeleton: React.FC = () => {
  return (
    <header className={styles.headerSkeleton}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <div className={styles.logoSkeleton} />
          <div className={styles.titleSkeleton} />
        </div>
        <div className={styles.authSkeleton} />
      </div>
    </header>
  );
};

export default HeaderSkeleton;
