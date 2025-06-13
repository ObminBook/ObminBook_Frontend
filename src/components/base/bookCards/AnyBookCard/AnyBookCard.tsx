import { miniIcons } from '../../../../assets/images/miniIcons';
import { cardIcons } from '../../../../assets/images/cardBook/cardDetails';
import { removeAnyCard } from '../../../../features/exchangeSlice/exchangeSlice';
import { useAppDispatch } from '../../../../reduxHooks/useAppDispatch';
import styles from './AnyBookCard.module.scss';

interface AnyBookCardProps {
  book?: { text: string } | null;
  hasLogic?: boolean;
}

export const AnyBookCard: React.FC<AnyBookCardProps> = ({
  book = { text: 'Обмін на будь-яку вашу' },
  hasLogic = true,
}) => {
  const dispatch = useAppDispatch();
  const handleRemoveClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!hasLogic) {
      return;
    }
    e.stopPropagation();

    dispatch(removeAnyCard());
  };

  return (
    <div className={styles.card} onClick={handleRemoveClick}>
      {hasLogic && (
        <img className={styles.deleteIcon} src={miniIcons.buttRemoveCard} alt="icon" />
      )}

      <div className={styles.imageContainer}>
        <img className={styles.image} src={cardIcons.anyBookIcon} alt="anyBookImage" />
      </div>

      <div className={styles.info}>
        <p className={styles.description}>{book?.text}</p>
      </div>
    </div>
  );
};
