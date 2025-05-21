import React from 'react';
import ReactDOM from 'react-dom';
import { User } from '../../../types/User';
import { TargetUserModal } from './TargetUserModal';

interface TargetUserPortalProps {
  onClose: () => void;
  targetUser: User;
}

export const TargetUserPortal: React.FC<TargetUserPortalProps> = ({
  onClose,
  targetUser,
}) => {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <TargetUserModal onClose={onClose} targetUser={targetUser} />,
    modalRoot
  );
};
