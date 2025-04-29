import React from 'react';
import styles from './BookListBlock.module.scss';
import { Book } from '../../../types/Book';
import { BookMiniCard } from '../../BookCards/BookMiniCard/BookMiniCard';
import { Button } from '../../3_SmallComponents/Button/views/Button';

interface BookListBlockProps {
  myList?: boolean;
  title: string;
  books: Book[];
  onBookSelect?: (book: Book, isMy?: boolean) => void;
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
      <div className={styles.block__anyButton}>
        {myList && (
          <Button
            _buttonColor="blueTransparent"
            _name="Обмін на будь-яку мою книгу"
          />
        )}
      </div>

      <div className={styles.block__list}>
        {books.map((book) => (
          <BookMiniCard
            key={book.id}
            book={book}
            onBookSelect={onBookSelect}
            isMy={myList}
          />
        ))}
      </div>
    </div>
  );
};
