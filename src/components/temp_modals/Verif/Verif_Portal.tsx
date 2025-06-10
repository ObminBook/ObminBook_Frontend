import ReactDOM from 'react-dom';
import { Verif } from './Verif';

interface Props {
  email: string;
  onResend: () => void;
}

export const VerifPortal: React.FC<Props> = ({ email, onResend }) => {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <Verif enteredEmail={email} onResend={onResend} />,
    modalRoot
  );
};
