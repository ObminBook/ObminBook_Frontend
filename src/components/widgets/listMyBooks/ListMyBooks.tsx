import AddBookCard from '@/components/base/bookCards/AddBookCard/AddBookCard';
import { select as manageBooksSelect } from '@/features/manageBookSlice/manageBookSlice';
import { useSelector } from 'react-redux';
import styles from './ListMyBooks.module.scss';
import { MyBookCard } from '@/components/base/bookCards/SimpleBookCard/containers/MyBookCard';

export const ListMyBooks = () => {
  const userBooks = useSelector(manageBooksSelect.myBooks);

  return (
    <div className={styles.container}>
      <div className={styles.bookList}>
        <div className={styles.bookCard}>
          <AddBookCard isCard={true} />
        </div>
        {userBooks.map((book) => (
          <div className={styles.bookCard} key={book.id}>
            <MyBookCard book={book} />
          </div>
        ))}
      </div>
    </div>
  );
};
