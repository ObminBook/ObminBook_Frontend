// BookCard component
import React from 'react';
import styles from './BookCard.module.scss';
import { Book } from '../../types/Book';

import imgCategory from '../../assets/images/card_imgs/cardBook/cardDetails/category.svg';
import imgCondition from '../../assets/images/card_imgs/cardBook/cardDetails/condition.svg';
import imgCity from '../../assets/images/card_imgs/cardBook/cardDetails/city.svg';
import imgExchange from '../../assets/images/card_imgs/cardBook/cardDetails/exchange.svg';
import cardImage from '../../assets/images/card_imgs/cardBook/image.placeholder.svg';
import { useHover } from '../../hooks/useHover';

interface BookCardProps {
  book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { ref, isHovered } = useHover();

  return (
    <div className={styles.card} ref={ref}>
      <div className={styles['actionButtonsContainer']}></div>
      <div className={styles['card__image-container']}>
        {book.imgUrl ? (
          <img
            src={cardImage}
            alt={book.title}
            className={styles['card__image']}
          />
        ) : (
          <div className={styles.card__imagePlaceholder} />
        )}
      </div>
      <div className={styles.card__info}>
        <h4 className={styles.card__title}>{book.title}</h4>
        <p className={styles.card__author}>Автор: {book.author}</p>
        <div className={styles.card__details}>
          <div
            className={`${styles['card__detailsCol']} ${styles['card__detailsCol--left']}`}
          >
            <div className={styles.card__detail}>
              <img
                className={`${styles['card__detailImg']} ${styles['card__detailImg--category']}`}
                src={imgCategory}
                alt="imgCategory"
              />
              <p>{book.category}</p>
            </div>
            <div className={styles.card__detail}>
              <img
                className={`${styles['card__detailImg']} ${styles['card__detailImg--city']}`}
                src={imgCity}
                alt="imgCity"
              />
              <p>{book.city}</p>
            </div>
          </div>
          <div
            className={`${styles['card__detailsCol']} ${styles['card__detailsCol--right']}`}
          >
            <div className={styles.card__detail}>
              <img
                className={`${styles['card__detailImg']} ${styles['card__detailImg--condition']}`}
                src={imgCondition}
                alt="imgCondition"
              />
              <p>{book.condition}</p>
            </div>

            <div className={styles.card__detail}>
              <img
                className={`${styles['card__detailImg']} ${styles['card__detailImg--exchange']}`}
                src={imgExchange}
                alt="imgExchange"
              />
              <p>{book.exchangeType}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
