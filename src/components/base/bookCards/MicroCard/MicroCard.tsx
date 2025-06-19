import { Book } from '@/types/Book';
import styles from './MicroCard.module.scss';

import { cardIcons } from '@/assets/images/cardBook/cardDetails';

interface MicroCardProps {
  book: Book;
  isCardSelected: boolean;
  onSelect: (book: Book) => void;
}

export const MicroCard: React.FC<MicroCardProps> = ({
  book,
  isCardSelected,
  onSelect,
}) => {
  return (
    <div
      className={`${styles.container} ${isCardSelected && styles.container_selected}`}
      onClick={() => onSelect(book)}
    >
      <img
        className={styles.image}
        src={book.coverImage === 'NOT FOUND' ? cardIcons.imgPlaceholder : book.coverImage}
        alt={book.title}
      />
      <div className={styles.info}>
        <div className={styles.titleBox}>
          <div className={styles.comma}>"</div>
          <h3 className={styles.title}>{book.title}</h3>
          <div className={styles.comma}>"</div>
        </div>
        <p className={styles.text}>{book.author}</p>
      </div>
    </div>
  );
};
