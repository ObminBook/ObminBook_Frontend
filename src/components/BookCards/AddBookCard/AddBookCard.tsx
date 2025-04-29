// BookCard component
import styles from './AddBookCard.module.scss';
import plusButton from '../../../assets/images/all_imgs/cardBook/cardDetails/PlusButton.svg';
import plusButtonBlue from '../../../assets/images/all_imgs/cardBook/cardDetails/PlusButtonBlue.svg';
import { useHover } from '../../../hooks/useHover';

const AddBookCard = () => {
  const { ref, isHovered } = useHover();

  return (
    <div className={styles['bookCard']} ref={ref}>
      <div className={styles['bookCard__face']}>
        <img
          className={styles['bookCard__plusImg']}
          src={isHovered ? plusButtonBlue : plusButton}
        />
        <p className={styles['bookCard__desc']}>Завантажити книгу</p>
      </div>

      <div className={styles['bookCard__info']}>
        <p className={styles['bookCard__info-addNew']}>Додати нову книгу</p>
        <p className={styles['bookCard__info-desc']}>
          Поділіться книгою для обміну
        </p>
      </div>
    </div>
  );
};

export default AddBookCard;
