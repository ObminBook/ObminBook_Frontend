import React from 'react';
import styles from './BookListBlock.module.scss';
import { Book } from '../../../types/Book';
import { BookMiniCard } from '../../BookCards/BookMiniCard/views/BookMiniCard';

interface BookListBlockProps {
  myList?: boolean;
  title: string;
  books: Book[];
  onBookSelect: (book: Book, isMyCard?: boolean) => void;
}

export const BookListBlock: React.FC<BookListBlockProps> = ({
  title,
  books,
  onBookSelect,
  myList,
}) => {
  return (
    <div className={styles.block}>
      <h2 className={styles.block__title}>{title}</h2>

      <div className={styles.block__list}>
        {books.map((book) => (
          <BookMiniCard
            key={book.id}
            book={book}
            onBookSelect={onBookSelect}
            isMyCard={myList}
          />
        ))}
      </div>
    </div>
  );
};
