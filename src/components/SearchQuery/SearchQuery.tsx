import React from 'react';
import loopa from '../../assets/images/card_imgs/input/Loopa.svg';
import styles from './SearchQuery.module.scss';

export const SearchQuery = () => {
  return (
    <div className={styles['searchQuery']}>
      <img src={loopa} className={styles['searchQuery__img']} />
      <input
        type="text"
        placeholder="Пошук у результатах"
        className={styles['searchQuery__input']}
      />
    </div>
  );
};
