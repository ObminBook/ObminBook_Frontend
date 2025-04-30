import { buttonIcons } from '../../../../assets/images/all_imgs/buttonIcons';
import { cardIcons } from '../../../../assets/images/all_imgs/cardBook/cardDetails';
import { Book } from '../../../../types/Book';
import styles from './BookMiniCard.module.scss';

interface BookMiniCardProps {
  book: Book;
  onBookSelect?: (book: Book, isMyCard?: boolean) => void;
  isMyCard?: boolean;
  onRemoveCard?: (isMyCard: boolean) => void;
  withDeleteButton?: boolean;
}

export const BookMiniCard: React.FC<BookMiniCardProps> = ({
  book,
  onBookSelect,
  isMyCard,
  onRemoveCard,
  withDeleteButton,
}) => {
  const handleRemoveClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    if (onRemoveCard && typeof isMyCard === 'boolean') {
      onRemoveCard(isMyCard);
    }
  };

  return (
    <div className={styles.card} onClick={() => onBookSelect?.(book, isMyCard)}>
      {!withDeleteButton ? (
        <img
          className={styles.card__plusIcon}
          src={cardIcons.plusObminIcon}
          alt="icon"
        />
      ) : (
        <img
          className={styles.card__plusIcon}
          src={buttonIcons.buttRemoveCard}
          alt="icon"
          onClick={handleRemoveClick}
        />
      )}

      <img
        className={styles.card__image}
        src={book.coverImage}
        alt={book.title}
      />
      <div className={styles.card__info}>
        <h3 className={styles.card__title}>{book.title}</h3>
        <p className={styles.card__text}>{book.author}</p>
        <div className={styles.card__specification}>
          <div className={styles.card__textContainer}>
            <img src={cardIcons.imgLanguageBlue} alt="Мова" />
            <p className={styles.card__text}>{book.language || 'Укр'}</p>
          </div>
          <div className={styles.card__textContainer}>
            <img src={cardIcons.imgConditionBlue} alt="Стан" />
            <p className={styles.card__text}>{book.condition}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
