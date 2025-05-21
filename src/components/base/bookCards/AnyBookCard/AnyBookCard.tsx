import { miniIcons } from '../../../../assets/images/miniIcons';
import { cardIcons } from '../../../../assets/images/cardBook/cardDetails';
import { removeAnyCard } from '../../../../features/exchangeSlice/exchangeSlice';
import { useAppDispatch } from '../../../../reduxHooks/useAppDispatch';
import { AnyBook } from '../../../../types/AnyBook';
import styles from './AnyBookCard.module.scss';

interface AnyBookCardProps {
  book: AnyBook | null;
}

export const AnyBookCard: React.FC<AnyBookCardProps> = ({ book }) => {
  const dispatch = useAppDispatch();
  const handleRemoveClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();

    dispatch(removeAnyCard());
  };

  return (
    <div className={styles.card}>
      <img
        className={styles.deleteIcon}
        src={miniIcons.buttRemoveCard}
        alt="icon"
        onClick={handleRemoveClick}
      />

      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src={cardIcons.anyBookIcon}
          alt="anyBookImage"
        />
      </div>

      <div className={styles.info}>
        <p className={styles.description}>{book?.text}</p>
      </div>
    </div>
  );
};
