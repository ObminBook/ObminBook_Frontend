// BookCard component
import React from 'react';
import styles from './BookCard.module.scss';
import { Book } from '../../types/Book';
import { useHover } from '../../hooks/useHover';
import { cardIcons } from '../../assets/images/card_imgs/cardBook/cardDetails';
import { buttonIcons } from '../../assets/images/card_imgs/buttonIcons';
import { Button } from '../Button/views/Button';

interface BookCardProps {
  book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { ref, isHovered } = useHover();

  function handleObminButtonClick() {}
  function handleSaveButtonClick() {}

  return (
    <div className={styles.card} ref={ref}>
      <div
        className={`${styles['card__actionButtons']} ${
          styles[`card__actionButtons--${isHovered && 'visible'}`]
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
        {book.imgUrl ? (
          <img
            src={cardIcons.imgPlaceholder}
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
                src={cardIcons.category}
                alt="imgCategory"
              />
              <p>{book.category}</p>
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
