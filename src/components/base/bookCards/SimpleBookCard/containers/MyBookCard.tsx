import React, { useState } from 'react';
import { showErrorToast, showSuccessToast } from '@/components/customToast/toastUtils';
import { Book } from '@/types/Book';
import { SimpleBookCardUI } from '../view/SimpleBookCardUI';
import { deleteMyBook, getMyBooks } from '@/features/manageBookSlice/manageBookSlice';
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
      await dispatch(deleteMyBook(book.id));
      showSuccessToast(`Книжка ${book.title} успішно видалена.`);
      dispatch(getMyBooks());
    } catch {
      showErrorToast('Помилка при видаленні книги');
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
