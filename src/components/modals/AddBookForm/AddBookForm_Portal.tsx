import ReactDOM from 'react-dom';
import { AddBookForm } from './AddBookForm';

interface Props {
  onClose: () => void;
}

export const AddBookForm_Portal: React.FC<Props> = ({ onClose }) => {
  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot) {
    return null;
  }

  return ReactDOM.createPortal(<AddBookForm onClose={onClose} />, modalRoot);
};
