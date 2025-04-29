import React from 'react';
import styles from './BookMiniCard.module.scss';
import { Book } from '../../../types/Book';
import { cardIcons } from '../../../assets/images/all_imgs/cardBook/cardDetails';

interface BookCardProps {
  book: Book;
  onBookSelect?: (book: Book, isMy?: boolean) => void;
  isMy?: boolean;
}

export const BookMiniCard: React.FC<BookCardProps> = ({
  book,
  onBookSelect,
  isMy,
}) => {
  return (
    <div
      className={styles.card}
      onClick={() => {
        if (onBookSelect) {
          return onBookSelect(book, isMy);
        }
      }}
    >
      <img
        className={styles['card__plusIcon']}
        src={cardIcons.plusObminIcon}
        alt="plusIcon"
      />
      <img
        src={book.coverImage}
        alt={book.title}
        className={styles.card__image}
      />
      <div className={styles.card__info}>
        <h3 className={styles.card__title}>{book.title}</h3>
        <p className={styles.card__text}>{book.author}</p>
        <div className={styles['card__specification']}>
          <div className={styles['card__text-container']}>
            <img
              src={cardIcons.imgLanguageBlue}
              alt="langIcon"
              style={{ height: '16px', width: '16px' }}
            />
            <p className={styles.card__text}>{book.language || 'Укр'}</p>
          </div>
          <div className={styles['card__text-container']}>
            <img
              src={cardIcons.imgConditionBlue}
              alt="langIcon"
              style={{ height: '16px', width: '16px' }}
            />
            <p className={styles.card__text}>{book.condition}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
