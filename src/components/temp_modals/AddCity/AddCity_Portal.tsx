import React from 'react';
import ReactDOM from 'react-dom';
import { AddCity } from './AddCity';

interface TargetUserPortalProps {
  onClose: () => void;
}

export const AddCityPortal: React.FC<TargetUserPortalProps> = ({ onClose }) => {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return ReactDOM.createPortal(<AddCity onClose={onClose} />, modalRoot);
};
