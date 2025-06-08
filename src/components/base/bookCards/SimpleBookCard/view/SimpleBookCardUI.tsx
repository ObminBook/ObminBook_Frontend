// SimpleBookCardUI.tsx
import React, { useState } from 'react';
import styles from './SimpleBookCardUI.module.scss';
import { Book } from '../../../../../types/Book';
import { cardIcons } from '../../../../../assets/images/cardBook/cardDetails';
import { transformDate } from '@/utils/transformData';
import { Loader } from '../../../Loader/Loader';
import { BookModalPortal } from '@/components/modals/BookModal/BookModalPortal';
import { TargetUserModal } from '@/components/modals/TargerUser/TargetUserModal';

interface Props {
  book: Book;
  showEdit?: boolean;
  showInfo?: boolean;
  isLoading?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const SimpleBookCardUI: React.FC<Props> = ({
  book,
  showEdit = true,
  showInfo = false,
  isLoading = false,
  onEdit,
  onDelete,
}) => {
  const addedDay = transformDate(book.creatingDate);
  const isCoverImage = book.coverImage !== 'NOT FOUND';

  const [showBookModal, setShowBookModal] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  function handleUserModalOpen() {
    setShowBookModal(false);
    setIsUserModalOpen(true);
  }

  return (
    <div className={styles.card}>
      {showBookModal && (
        <BookModalPortal
          onClose={() => setShowBookModal(false)}
          book={book}
          onUserClick={handleUserModalOpen}
        />
      )}
      {isUserModalOpen && (
        <TargetUserModal
          onClose={() => setIsUserModalOpen(false)}
          targetUserId={book.owner.id}
        />
      )}
      {isLoading ? (
        <div className={styles.loaderContainer}>
          <Loader size={50} />
        </div>
      ) : (
        <div className={styles.actionButtons}>
          {showInfo && (
            <button
              className={`${styles.actionButton} ${styles.actionButton__info}`}
              onClick={() => setShowBookModal(true)}
              aria-label="Редагувати книгу"
            />
          )}
          {showEdit && (
            <button
              className={`${styles.actionButton} ${styles.actionButton__edit}`}
              onClick={onEdit}
              aria-label="Редагувати книгу"
            />
          )}
          {onDelete && (
            <button
              className={`${styles.actionButton} ${styles.actionButton__delete}`}
              onClick={onDelete}
              aria-label="Видалити книгу"
            />
          )}
        </div>
      )}

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
