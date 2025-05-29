import React, { forwardRef, useState } from 'react';
import styles from './BookCard.module.scss';
import { useHover } from '../../../../hooks/useHover';
import { useNavigate } from 'react-router-dom';
import { Book } from '../../../../types/Book';
import { useAppDispatch } from '../../../../reduxHooks/useAppDispatch';
import { setAnotherUserBook } from '../../../../features/exchangeSlice/exchangeSlice';
import { Button } from '../../button/Button';
import { miniIcons } from '../../../../assets/images/miniIcons';
import { cardIcons } from '../../../../assets/images/cardBook/cardDetails';
import { TargetUserPortal } from '@/components/Modals/TargerUser/TargetUser_Portal';
import { BookModalPortal } from '@/components/Modals/BookModal/BookModalPortal';
import { userMenuIcons } from '@/assets/images/userMenu';

interface BookCardProps {
  book: Book;
}

export const BookCard = forwardRef<HTMLDivElement, BookCardProps>(({ book }, ref) => {
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const { hoverRef, isHovered } = useHover();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function handleCardClick() {
    setIsUserModalOpen(false);
    setIsBookModalOpen(true);
  }

  function handleUserModalOpen() {
    setIsBookModalOpen(false);
    setIsUserModalOpen(true);
  }

  function handleUserModalClose() {
    setIsBookModalOpen(true);
    setIsUserModalOpen(false);
  }

  function handleObminButtonClick(ev: React.MouseEvent, book: Book) {
    ev.stopPropagation();

    navigate('/obmin');

    dispatch(setAnotherUserBook(book));
  }

  function handleSaveButtonClick() {} // Функціонал збереження книжок буде додане після MVP

  return (
    <div className={styles.cardContainer} ref={ref}>
      <div className={styles.card} ref={hoverRef} onClick={handleCardClick}>
        {isBookModalOpen && (
          <BookModalPortal
            onClose={() => setIsBookModalOpen(false)}
            onUserClick={handleUserModalOpen}
            book={book}
          />
        )}
        {isUserModalOpen && (
          <TargetUserPortal
            targetUser={userMenuIcons.iconUserProfile}
            onClose={handleUserModalClose}
          />
        )}
        <div
          className={`${styles.actionButtons} ${
            isHovered ? styles.actionButtons__visible : ''
          }`}
        >
          <div className={styles.actionButton__left} onClick={handleSaveButtonClick}>
            <Button
              _name="Зберегти"
              _buttonVariant="transparent"
              _fontSize="bold"
              _icon={miniIcons.buttHeart}
              _iconPosition="left"
              _type="button"
            />
          </div>

          <div
            className={styles.actionButton__right}
            onClick={(ev) => handleObminButtonClick(ev, book)}
          >
            <Button
              _name="Обмін"
              _buttonVariant="blue"
              _fontSize="bold"
              _icon={miniIcons.buttObmin}
              _iconPosition="left"
              _type="button"
            />
          </div>
        </div>

        <div className={styles.imageContainer}>
          {book.coverImage ? (
            <img
              src={
                book.coverImage === 'NOT FOUND'
                  ? cardIcons.imgPlaceholder
                  : book.coverImage
              }
              alt={book.title}
              className={styles.image}
            />
          ) : (
            <img
              src={cardIcons.imgPlaceholder}
              alt="Зображення відсутнє"
              className={styles.image}
            />
          )}
        </div>
        <div className={styles.info}>
          <h4 className={styles.title}>{book.title}</h4>
          <p className={styles.author}>Автор: {book.author}</p>
          <div className={styles.details}>
            <div className={`${styles.detailsCol} ${styles.detailsCol__left}`}>
              <div className={styles.detail}>
                <img
                  className={`${styles.detailImg} ${styles.detailImg__category}`}
                  src={cardIcons.category}
                  alt="imgCategory"
                />
                <p>{book.categoryName}</p>
              </div>
              <div className={styles.detail}>
                <img
                  className={`${styles.detailImg} ${styles.detailImg__city}`}
                  src={cardIcons.city}
                  alt="imgCity"
                />
                <p>{book.owner.city}</p>
              </div>
            </div>
            <div className={`${styles.detailsCol} ${styles.detailsCol__right}`}>
              <div className={styles.detail}>
                <img
                  className={`${styles.detailImg} ${styles.detailImg__condition}`}
                  src={cardIcons.condition}
                  alt="imgCondition"
                />
                <p>{book.condition}</p>
              </div>

              <div className={styles.detail}>
                <img
                  className={`${styles.detailImg} ${styles.detailImg__exchange}`}
                  src={cardIcons.exchange}
                  alt="imgExchange"
                />
                <p>{book.exchangeType}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
