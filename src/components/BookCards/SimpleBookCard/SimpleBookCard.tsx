// BookCard component
import React from 'react';
import styles from './SimpleBookCard.module.scss';
import { Book } from '../../../types/Book';
import { useHover } from '../../../hooks/useHover';
import { cardIcons } from '../../../assets/images/all_imgs/cardBook/cardDetails';

interface BookCardProps {
  book: Book;
}

export const SimpleBookCard: React.FC<BookCardProps> = ({ book }) => {
  const { ref, isHovered } = useHover();

  function handleBookDelete() {}

  function handleBookEdit() {}

  return (
    <div className={styles.card} ref={ref}>
      <div
        className={`${styles['card__actionButtons']} ${
          isHovered && styles['card__actionButtons--visible']
        }`}
      >
        <button
          className={`${styles['card__actionButton--left']} ${styles['card__actionButton']}`}
          onClick={() => handleBookEdit}
        />
        <button
          className={`${styles['card__actionButton--right']} ${styles['card__actionButton']}`}
          onClick={() => handleBookDelete}
        />
      </div>

      <div className={styles['card__image-container']}>
        {book.coverImage ? (
          <img
            src={cardIcons.imgPlaceholder}
            alt={book.title}
            className={styles['card__image']}
          />
        ) : (
          <img
            src={cardIcons.imgPlaceholder}
            alt="Зображення відсутнє"
            className={styles['card__image']}
          />
        )}
      </div>
      <div className={styles.card__info}>
        <h4 className={styles.card__title}>{book.title}</h4>
        <div className={styles.card__bookAdded}>
          {book.addedOn || 'Додано 5 квітня, 2025'}
        </div>
      </div>
    </div>
  );
};
