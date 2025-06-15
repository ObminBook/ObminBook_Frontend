import ReactDOM from 'react-dom';
import { useEffect, useRef } from 'react';
import { Verif } from './Verif';
import { useAppDispatch } from '@/reduxHooks/useAppDispatch';
import { setDefault } from '@/features/authSlice/authSlice';

interface Props {
  email: string;
  onResend: () => void;
}

export const VerifPortal: React.FC<Props> = ({ email, onResend }) => {
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDivElement>(null);
  const modalRoot = document.getElementById('modal-root');

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        dispatch(setDefault());
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch(setDefault());
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <Verif ref={modalRef} enteredEmail={email} onResend={onResend} />,
    modalRoot
  );
};
