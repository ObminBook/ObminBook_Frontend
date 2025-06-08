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
import { TargetUserPortal } from '@/components/modals/TargerUser/TargetUser_Portal';
import { BookModalPortal } from '@/components/modals/BookModal/BookModalPortal';
import { findCategoryLabel } from '@/resources/bookCategories/bookCategories';
import { useSelector } from 'react-redux';
import { select } from '@/features/authSlice/authSlice';
import { booksApi } from '@/api/booksApi';
import { showErrorToast, showSuccessToast } from '@/components/customToast/toastUtils';
import { Loader } from '../../Loader/Loader';

interface BookCardProps {
  book: Book;
}

export const BookCard = forwardRef<HTMLDivElement, BookCardProps>(({ book }, ref) => {
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const { hoverRef, isHovered } = useHover();
  const user = useSelector(select.user);
  const isUserBook = book.owner.id === user?.id;
  const [isSaveLoadind, setIsSaveLoading] = useState(false);

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

    if (isUserBook) {
      return;
    }

    navigate('/obmin');

    dispatch(setAnotherUserBook(book));
  }

  async function handleSaveButtonClick(bookId: number) {
    setIsSaveLoading(true);

    try {
      const data = await booksApi.saveBook(bookId);
      if (data) {
        showSuccessToast('Книжка успішно збережена');
      }
    } catch {
      showErrorToast('Не вдалося зберегти книжку');
    } finally {
      setIsSaveLoading(false);
    }
  }

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
          <TargetUserPortal targetUserId={book.owner.id} onClose={handleUserModalClose} />
        )}
        <div
          className={`${styles.actionButtons} ${
            isHovered ? styles.actionButtons__visible : ''
          }`}
        >
          <div
            className={styles.actionButton__left}
            onClick={(ev) => {
              ev.stopPropagation();
              if (isUserBook) {
                return;
              }
              handleSaveButtonClick(book.id);
            }}
          >
            <Button
              _name={isSaveLoadind ? <Loader /> : 'Зберегти'}
              _buttonVariant="transparent"
              _fontSize="bold"
              _icon={!isSaveLoadind ? miniIcons.buttHeart : null}
              _iconPosition="left"
              _type="button"
              _disabled={isUserBook ? true : false}
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
              _disabled={isUserBook ? true : false}
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
              className={
                book.coverImage === 'NOT FOUND' ? styles.mockedImage : styles.image
              }
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
                <p>{findCategoryLabel(book.categoryName) || 'Інше'}</p>
              </div>
              <div className={styles.detail}>
                <img
                  className={`${styles.detailImg} ${styles.detailImg__city}`}
                  src={cardIcons.city}
                  alt="imgCity"
                />
                <p className={styles.detail__city}>
                  {book.owner.city || 'Місто не вказано'}
                </p>
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
