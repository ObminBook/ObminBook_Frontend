import React from 'react';
import ReactDOM from 'react-dom';
import { TargetUserModal } from './TargetUserModal';

interface TargetUserPortalProps {
  onClose: () => void;
  targetUserId: number;
}

export const TargetUserPortal: React.FC<TargetUserPortalProps> = ({
  onClose,
  targetUserId,
}) => {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <TargetUserModal onClose={onClose} targetUserId={targetUserId} />,
    modalRoot
  );
};
