import styles from './AnyBookCard.module.scss';
import { cardIcons } from '../../../assets/images/all_imgs/cardBook/cardDetails';
import { buttonIcons } from '../../../assets/images/all_imgs/buttonIcons';
import { AnyBook } from '../../../types/AnyBook';

interface AnyBookCardProps {
  book: AnyBook | null;
  onRemoveCard: (isMyCard: boolean) => void;
  isMyCard: boolean;
}

export const AnyBookCard: React.FC<AnyBookCardProps> = ({
  onRemoveCard,
  isMyCard,
  book,
}) => {
  const handleRemoveClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    onRemoveCard(isMyCard);
  };

  return (
    <div className={styles.card}>
      <img
        className={styles.card__deleteIcon}
        src={buttonIcons.buttRemoveCard}
        alt="icon"
        onClick={handleRemoveClick}
      />

      <div className={styles.card__imageContainer}>
        <img
          className={styles.card__image}
          src={cardIcons.anyBookIcon}
          alt="anyBookImage"
        />
      </div>

      <div className={styles.card__info}>
        <p className={styles.card__description}>{book?.text}</p>
      </div>
    </div>
  );
};
