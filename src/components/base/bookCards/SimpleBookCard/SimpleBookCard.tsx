import React from 'react';
import styles from './SimpleBookCard.module.scss';
import { Book } from '../../../../types/Book';
import { cardIcons } from '../../../../assets/images/cardBook/cardDetails';
import { transformDate } from '@/utils/transformData';

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

  const addedDay = transformDate(book.creatingDate);
  const isCoverImage = book.coverImage !== 'NOT FOUND';

  return (
    <div className={styles.card}>
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
      <div className={styles.imageContainer}>
        <img
          src={isCoverImage ? book.coverImage : cardIcons.imgPlaceholder}
          alt={book.title || 'Без назви'}
          className={isCoverImage ? styles.imageFromApi : styles.mockedImage}
        />
      </div>

      <div className={styles.info}>
        <h4 className={styles.title}>{book.title}</h4>
        <div className={styles.bookAdded}>{`Додано ${addedDay}`}</div>
      </div>
    </div>
  );
};
