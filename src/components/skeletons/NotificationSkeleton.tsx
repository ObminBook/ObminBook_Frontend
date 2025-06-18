import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './NotificationSkeleton.module.scss';

export const NotificationSkeleton: React.FC = () => {
  return (
    <div className={styles.container}>
      <Skeleton highlightColor="white" width={40} height={40} circle />
      <div className={styles.info}>
        <Skeleton height={40} />
        <Skeleton height={50} width={200} />
        <div className={styles.buttons}>
          <Skeleton height={40} width={100} />
          <Skeleton height={40} width={100} />
        </div>
      </div>
    </div>
  );
};
