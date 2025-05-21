import { useSelector } from 'react-redux';
import styles from './BookMiniCard.module.scss';
import {
  removeAnotherUserBook,
  removeMyBook,
  select,
  setAnotherUserBook,
  setMyBook,
} from '../../../../../features/exchangeSlice/exchangeSlice';
import { useAppDispatch } from '../../../../../reduxHooks/useAppDispatch';
import { miniIcons } from '../../../../../assets/images/miniIcons';
import { cardIcons } from '../../../../../assets/images/cardBook/cardDetails';
import { Book } from '../../../../../types/Book';

interface BookMiniCardProps {
  withDeleteButton?: boolean;
  book: Book;
  cardType: 'myCards' | 'anotherUserCards';
}

export const BookMiniCard: React.FC<BookMiniCardProps> = ({
  cardType,
  withDeleteButton,
  book,
}) => {
  const myBookSelected = useSelector(select.myBook);
  const anotherUserBookSelected = useSelector(select.anotherUserBook);

  const dispatch = useAppDispatch();

  const handleBookSelect = () => {
    if (withDeleteButton) {
      if (cardType === 'myCards') {
        dispatch(removeMyBook());
      } else {
        dispatch(removeAnotherUserBook());
      }
    } else {
      if (cardType === 'myCards') {
        dispatch(setMyBook(book));
      } else {
        dispatch(setAnotherUserBook(book));
      }
    }
  };

  const actualIcon = () => {
    const img = {
      delete: (
        <img
          className={styles.icon}
          src={miniIcons.buttRemoveCard}
          alt="icon"
        />
      ),
      plus: (
        <img className={styles.icon} src={cardIcons.plusObminIcon} alt="icon" />
      ),
      checkMark: (
        <img className={styles.icon} src={cardIcons.checkMarkBlue} alt="icon" />
      ),
    };

    if (withDeleteButton) {
      return img.delete;
    }

    if (cardType === 'myCards' && book.id === myBookSelected?.id) {
      return img.checkMark;
    }

    if (
      cardType === 'anotherUserCards' &&
      book.id === anotherUserBookSelected?.id
    ) {
      return img.checkMark;
    }

    return img.plus;
  };

  const cardClass = `${styles.card} ${
    (cardType === 'myCards' &&
      book.id === myBookSelected?.id &&
      !withDeleteButton) ||
    (cardType === 'anotherUserCards' &&
      book.id === anotherUserBookSelected?.id &&
      !withDeleteButton)
      ? styles.selected
      : ''
  }`;

  return (
    <div className={cardClass} onClick={handleBookSelect}>
      {actualIcon()}

      <img className={styles.image} src={book.coverImage} alt={book.title} />
      <div className={styles.info}>
        <h3 className={styles.title}>{book.title}</h3>
        <p className={styles.text}>{book.author}</p>
        <div className={styles.specification}>
          <div className={styles.textContainer}>
            <img src={cardIcons.imgLanguageBlue} alt="Мова" />
            <p className={styles.text}>{book.language || 'Укр'}</p>
          </div>
          <div className={styles.textContainer}>
            <img src={cardIcons.imgConditionBlue} alt="Стан" />
            <p className={styles.text}>{book.condition}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
