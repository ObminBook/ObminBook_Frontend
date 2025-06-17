import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './ChatListSkeleton.module.scss';

const ChatListSkeleton: React.FC = () => {
  return (
    <div className={styles.skeletonList}>
      {[1, 2, 3, 4, 5].map(() => {
        return (
          <div className={styles.container}>
            <Skeleton className={styles.avatar} highlightColor="white" circle />
            <div className={styles.textContainer}>
              <Skeleton className={styles.textTitle} highlightColor="white" />
              <Skeleton className={styles.textSubtitle} highlightColor="white" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatListSkeleton;
