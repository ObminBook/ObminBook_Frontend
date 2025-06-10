import ReactDOM from 'react-dom';
import { TermsModal } from './TermsModal';

export interface TermsPortalProps {
  onClose: () => void;
}

export const TermsPortal: React.FC<TermsPortalProps> = ({ onClose }) => {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return ReactDOM.createPortal(<TermsModal onClose={onClose} />, modalRoot);
};
