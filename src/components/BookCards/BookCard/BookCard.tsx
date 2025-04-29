// BookCard component
import React, { useState } from 'react';
import styles from './BookCard.module.scss';
import { Book } from '../../../types/Book';
import { useHover } from '../../../hooks/useHover';
import { cardIcons } from '../../../assets/images/all_imgs/cardBook/cardDetails';
import { buttonIcons } from '../../../assets/images/all_imgs/buttonIcons';
import { Button } from '../../3_SmallComponents/Button/views/Button';
import { BookModalPortal } from '../../Modals/BookModal/BookModalPortal';

interface BookCardProps {
  book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ref, isHovered } = useHover();

  function handleCardClick() {
    setIsModalOpen(true);
  }

  function handleObminButtonClick() {}

  function handleSaveButtonClick() {}

  return (
    <div className={styles.card} ref={ref} onClick={handleCardClick}>
      {isModalOpen && (
        <BookModalPortal onClose={() => setIsModalOpen(false)} book={book} />
      )}
      <div
        className={`${styles['card__actionButtons']} ${
          isHovered ? styles['card__actionButtons--visible'] : ''
        }`}
      >
        <Button
          _classname="card__actionButton--left"
          _name="Зберегти"
          _buttonColor="transparent"
          _fontSize="bold"
          _icon={buttonIcons.buttHeart}
          _iconPosition="left"
          _type="button"
          onClick={handleSaveButtonClick}
        />
        <Button
          _classname="card__actionButton--right"
          _name="Обмін"
          _buttonColor="blue"
          _fontSize="bold"
          _icon={buttonIcons.buttObmin}
          _iconPosition="left"
          _type="button"
          onClick={handleObminButtonClick}
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
        <p className={styles.card__author}>Автор: {book.author}</p>
        <div className={styles.card__details}>
          <div
            className={`${styles['card__detailsCol']} ${styles['card__detailsCol--left']}`}
          >
            <div className={styles.card__detail}>
              <img
                className={`${styles['card__detailImg']} ${styles['card__detailImg--category']}`}
                src={cardIcons.category}
                alt="imgCategory"
              />
              <p>{book.categoryName}</p>
            </div>
            <div className={styles.card__detail}>
              <img
                className={`${styles['card__detailImg']} ${styles['card__detailImg--city']}`}
                src={cardIcons.city}
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
                src={cardIcons.condition}
                alt="imgCondition"
              />
              <p>{book.condition}</p>
            </div>

            <div className={styles.card__detail}>
              <img
                className={`${styles['card__detailImg']} ${styles['card__detailImg--exchange']}`}
                src={cardIcons.exchange}
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
