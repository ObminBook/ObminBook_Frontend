import { Book } from '../../../types/Book';
import { BookMiniCard } from '../../BookCards/BookMiniCard/BookMiniCard';
import styles from './ExchangeBlock.module.scss';

interface Props {
  selectedMyBook: Book | null;
  selectedAnotherUserBook: Book | null;
}

export const ExchangeBlock: React.FC<Props> = ({
  selectedMyBook,
  selectedAnotherUserBook,
}) => {
  return (
    <div className={styles.exchangeBlock}>
      <h2 className={styles.exchangeBlock__title}>Обмін</h2>

      <div className={styles.exchangeBlock__section}>
        <p className={styles.exchangeBlock__label}>Я віддаю</p>
        {selectedMyBook ? (
          <div className={styles.exchangeBlock__cardContainer}>
            <BookMiniCard book={selectedMyBook} />
          </div>
        ) : (
          <button className={styles.exchangeBlock__selectButton}>
            Виберіть книги зі свого списку
          </button>
        )}
      </div>

      <div className={styles.exchangeBlock__iconWrapper}>
        <div className={styles.exchangeBlock__icon}>
          <img src="/path/to/arrow-icon.svg" alt="Обмін" />
        </div>
      </div>

      <div className={styles.exchangeBlock__section}>
        <p className={styles.exchangeBlock__label}>Я отримую</p>
        {selectedAnotherUserBook && (
          <BookMiniCard book={selectedAnotherUserBook} />
        )}
      </div>

      <button className={styles.exchangeBlock__submitButton}>
        Запропонувати обмін
      </button>
    </div>
  );
};
