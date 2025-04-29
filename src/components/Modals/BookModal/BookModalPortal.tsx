import React from 'react';
import ReactDOM from 'react-dom';
import { BookModal } from './BookModal';
import { Book } from '../../types/Book';

interface BookModalPortalProps {
  onClose: () => void;
  book: Book;
}

export const BookModalPortal: React.FC<BookModalPortalProps> = ({
  onClose,
  book,
}) => {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;
  console.log('модалка їбаше');
  console.log('any');

  return ReactDOM.createPortal(
    <BookModal onClose={onClose} book={book} />,
    modalRoot
  );
};
