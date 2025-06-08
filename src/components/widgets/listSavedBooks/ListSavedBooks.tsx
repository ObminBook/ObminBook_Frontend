import { useSelector } from 'react-redux';
import styles from './ListSavedBooks.module.scss';
import { SavedBookCard } from '@/components/base/bookCards/SimpleBookCard/containers/SavedBookCard';
import { select as manageBooksSelect } from '@/features/manageBookSlice/manageBookSlice';

export const ListSavedBooks: React.FC = () => {
  const savedBooksItems = useSelector(manageBooksSelect.savedBooks);

  return (
    <div className={styles.container}>
      <div className={styles.savedBooksList}>
        {savedBooksItems.map((savedBooksItem) => (
          <div className={styles.savedBookCard} key={savedBooksItem.book.id}>
            <SavedBookCard book={savedBooksItem.book} />
          </div>
        ))}
      </div>
    </div>
  );
};
