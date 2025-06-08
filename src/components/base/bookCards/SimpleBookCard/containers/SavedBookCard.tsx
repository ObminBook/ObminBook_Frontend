import React, { useState } from 'react';
import { Book } from '@/types/Book';
import { SimpleBookCardUI } from '../view/SimpleBookCardUI';
import { useAppDispatch } from '@/reduxHooks/useAppDispatch';
import {
  getSavedBooks,
  removeFromSavedBooks,
} from '@/features/manageBookSlice/manageBookSlice';

interface Props {
  book: Book;
}

export const SavedBookCard: React.FC<Props> = ({ book }) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false); // локальний статус

  const handleRemove = async () => {
    setIsLoading(true);
    await dispatch(removeFromSavedBooks(book.id));
    await dispatch(getSavedBooks());
    setIsLoading(false);
  };

  return (
    <SimpleBookCardUI
      book={book}
      showEdit={false}
      showInfo={true}
      isLoading={isLoading}
      onDelete={handleRemove}
    />
  );
};
