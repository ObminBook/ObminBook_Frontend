import styles from './ExchangeBlock.module.scss';
import { buttonIcons } from '../../../assets/images/all_imgs/buttonIcons';
import { Book } from '../../../types/Book';
import { Button } from '../../3_SmallComponents/Button/views/Button';
import { AnyBook } from '../../../types/AnyBook';
import { AnyBookCard } from '../../BookCards/AnyBookCard/AnyBookCard';
import { BookMiniCard } from '../../BookCards/BookMiniCard/views/BookMiniCard';

interface Props {
  selectedMyBook: Book | null;
  selectedAnotherUserBook: Book | null;
  selectedAnyCard: AnyBook | null;
  onRemoveCard: (isMyCard: boolean) => void;
}

export const ExchangeBlock: React.FC<Props> = ({
  selectedMyBook,
  selectedAnotherUserBook,
  selectedAnyCard,
  onRemoveCard,
}) => {
  return (
    <div className={styles.exchangeBlock}>
      <h2 className={styles.exchangeBlock__title}>Обмін</h2>

      <div className={styles.exchangeBlock__section}>
        <p className={styles.exchangeBlock__label}>Я віддаю</p>

        <div className={styles.exchangeBlock__cardContainer}>
          {selectedMyBook ? (
            <BookMiniCard
              book={selectedMyBook}
              isMyCard
              withDeleteButton
              onRemoveCard={onRemoveCard}
            />
          ) : selectedAnyCard ? (
            <AnyBookCard
              book={selectedAnyCard}
              isMyCard={true}
              onRemoveCard={onRemoveCard}
            />
          ) : (
            <button className={styles.exchangeBlock__selectButton}>
              Виберіть книгу зі свого списку
            </button>
          )}
        </div>
      </div>

      <div className={styles.exchangeBlock__iconWrapper}>
        <div className={styles.exchangeBlock__icon}>
          <img src={buttonIcons.arrows} alt="Обмін" />
        </div>
      </div>

      <div className={styles.exchangeBlock__section}>
        <p className={styles.exchangeBlock__label}>Я отримую</p>
        <div className={styles.exchangeBlock__cardContainer}>
          {selectedAnotherUserBook ? (
            <BookMiniCard
              book={selectedAnotherUserBook}
              isMyCard={false}
              withDeleteButton
              onRemoveCard={onRemoveCard}
            />
          ) : (
            <button className={styles.exchangeBlock__selectButton}>
              Виберіть книгу зі списку користувача
            </button>
          )}
        </div>
      </div>

      <div className={styles.exchangeBlock__submitButton}>
        <Button
          _buttonColor="blue"
          _name="Запропонувати обмін"
          _type="button"
          _disabled={
            !selectedAnotherUserBook || (!selectedMyBook && !selectedAnyCard)
          }
        />
      </div>
    </div>
  );
};
