import ReactDOM from 'react-dom';
import { TermsModal } from './TermsModal';

interface Props {
  onClose: () => void;
}

export const Terms_Portal: React.FC<Props> = ({ onClose }) => {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return ReactDOM.createPortal(<TermsModal onClose={onClose} />, modalRoot);
};
