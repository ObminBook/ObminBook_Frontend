import React from 'react';
import ReactDOM from 'react-dom';
import { ExchangeResponse } from '@/types/Exchange';
import { ConfirmExchangeModal } from './ConfirmExchangeModal';

interface Props {
  onClose: () => void;
  exchange: ExchangeResponse;
}

export const ConfirmExchangePortal: React.FC<Props> = ({ onClose, exchange }) => {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <ConfirmExchangeModal onClose={onClose} exchange={exchange} />,
    modalRoot
  );
};
