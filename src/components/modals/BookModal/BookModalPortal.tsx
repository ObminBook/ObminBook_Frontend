import React from 'react';
import ReactDOM from 'react-dom';
import { BookModal } from './BookModal';
import { Book } from '../../../types/Book';

interface BookModalPortalProps {
  onClose: () => void;
  onUserClick: () => void;
  book: Book;
}

export const BookModalPortal: React.FC<BookModalPortalProps> = ({
  onClose,
  book,
  onUserClick,
}) => {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <BookModal onClose={onClose} onUserClick={onUserClick} book={book} />,
    modalRoot
  );
};
