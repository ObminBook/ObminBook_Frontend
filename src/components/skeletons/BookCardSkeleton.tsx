import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './BookCardSkeleton.module.scss';

const BookCardSkeleton: React.FC = () => {
  return (
    <div>
      <Skeleton className={styles.skeleton} highlightColor="white" />
    </div>
  );
};

export default BookCardSkeleton;
