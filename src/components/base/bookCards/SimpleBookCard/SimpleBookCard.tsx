import React from 'react';
import styles from './SimpleBookCard.module.scss';
import { Book } from '../../../../types/Book';
import { cardIcons } from '../../../../assets/images/cardBook/cardDetails';

interface BookCardProps {
  book: Book;
  onEdit?: (book: Book) => void;
  onDelete?: (book: Book) => void;
}

export const SimpleBookCard: React.FC<BookCardProps> = ({
  book,
  onEdit,
  onDelete,
}) => {
  const handleBookEdit = () => {
    onEdit?.(book);
  };

  const handleBookDelete = () => {
    onDelete?.(book);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={book.coverImage || cardIcons.imgPlaceholder}
          alt={book.title || 'Без назви'}
          className={styles.image}
        />

        <div className={styles.actionButtons}>
          <button
            className={`${styles.actionButton} ${styles.actionButton__left}`}
            onClick={handleBookEdit}
            aria-label="Редагувати книгу"
          />
          <button
            className={`${styles.actionButton} ${styles.actionButton__right}`}
            onClick={handleBookDelete}
            aria-label="Видалити книгу"
          />
        </div>
      </div>

      <div className={styles.info}>
        <h4 className={styles.title}>{book.title}</h4>
        <div className={styles.bookAdded}>
          {book.addedOn || 'Додано 5 квітня, 2025'}
        </div>
      </div>
    </div>
  );
};
