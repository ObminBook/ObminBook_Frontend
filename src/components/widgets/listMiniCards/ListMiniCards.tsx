import styles from './ListMiniCards.module.scss';
import { Book } from '../../../types/Book';
import { BookMiniCard } from '../../base/bookCards/BookMiniCard/views/BookMiniCard';
import { Button } from '@/components/base/button/Button';
import { useAppDispatch } from '@/reduxHooks/useAppDispatch';
import { removeMyBook, setAnyCard } from '@/features/exchangeSlice/exchangeSlice';
import AddBookCard from '@/components/base/bookCards/AddBookCard/AddBookCard';

interface Props {
  title: string;
  books: Book[];
  cardsType: 'myCards' | 'anotherUserCards';
}

export const ListMiniCards = ({ title, books, cardsType }: Props) => {
  const dispatch = useAppDispatch();
  const haveBooks = books.length !== 0;
  const moreThanTwo = books.length >= 2;

  const handleSelectAnyCard = () => {
    dispatch(removeMyBook());
    dispatch(setAnyCard({ text: 'Обмін на будь-яку мою книгу' }));
  };

  return (
    <section className={styles.block}>
      <h2 className={styles.block__title}>{title}</h2>
      {cardsType === 'myCards' && moreThanTwo && (
        <div className={styles.exchangePage__anyButton} onClick={handleSelectAnyCard}>
          <Button _buttonVariant="blueTransparent" _name="Обмін на будь-яку мою книгу" />
        </div>
      )}

      {!haveBooks && (
        <>
          <div className={styles.noBooks}>У вас ще немає книжок для обміну</div>
        </>
      )}

      <div className={styles.block__list}>
        {books.map((book) => (
          <BookMiniCard key={book.id} book={book} cardType={cardsType} />
        ))}
      </div>
      {!moreThanTwo && cardsType === 'myCards' && (
        <div className={styles.addBookContainer}>
          <AddBookCard />
        </div>
      )}
    </section>
  );
};
