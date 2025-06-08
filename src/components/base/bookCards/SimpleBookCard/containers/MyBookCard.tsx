import React, { useState } from 'react';
import { showSuccessToast } from '@/components/customToast/toastUtils';
import { Book } from '@/types/Book';
import { SimpleBookCardUI } from '../view/SimpleBookCardUI';
import { deleteMyBook } from '@/features/manageBookSlice/manageBookSlice';
import { useAppDispatch } from '@/reduxHooks/useAppDispatch';

interface Props {
  book: Book;
  onEdit?: (book: Book) => void;
}

export const MyBookCard: React.FC<Props> = ({ book, onEdit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const result = await dispatch(deleteMyBook(book.id));
      if (deleteMyBook.fulfilled.match(result)) {
        showSuccessToast(`"${book.title}" успішно видалена!`);
      }
    } catch (error) {
      console.error('Помилка при видаленні книги:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    onEdit?.(book);
  };

  return (
    <SimpleBookCardUI
      book={book}
      showEdit={true}
      showInfo={true}
      isLoading={isLoading}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};
