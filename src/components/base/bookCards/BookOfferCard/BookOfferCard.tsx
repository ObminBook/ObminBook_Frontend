import styles from './BookOfferCard.module.scss';
import { findLabelLanguage } from '@/resources/languages/languages';
import { Book } from '@/types/Book';
import { cardIcons } from '@/assets/images/cardBook/cardDetails';

interface BookOfferCardProps {
  book: Book;
}

export const BookOfferCard: React.FC<BookOfferCardProps> = ({ book }) => {
  return (
    <div className={styles.card}>
      <img
        className={styles.image}
        src={
          book?.coverImage === 'NOT FOUND' ? cardIcons.imgPlaceholder : book.coverImage
        }
        alt={book.title}
      />
      <div className={styles.info}>
        <h3 className={styles.title}>{book.title}</h3>
        <p className={styles.text}>{book.author}</p>
        <div className={styles.specification}>
          <div className={styles.textContainer}>
            <img src={cardIcons.imgLanguageBlue} alt="Мова" />
            <p className={styles.text}>{findLabelLanguage(book.language) || 'Укр'}</p>
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
