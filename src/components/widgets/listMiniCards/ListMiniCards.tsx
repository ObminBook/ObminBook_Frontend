import styles from './ListMiniCards.module.scss';
import { Book } from '../../../types/Book';
import { BookMiniCard } from '../../base/bookCards/BookMiniCard/views/BookMiniCard';

interface Props {
  title: string;
  books: Book[];
  cardsType: 'myCards' | 'anotherUserCards';
}

export const ListMiniCards = ({ title, books, cardsType }: Props) => {
  return (
    <section className={styles.block}>
      <h2 className={styles.block__title}>{title}</h2>
      <div className={styles.block__list}>
        {books.map((book) => (
          <BookMiniCard key={book.id} book={book} cardType={cardsType} />
        ))}
      </div>
    </section>
  );
};
