import { ExchangeResponse } from '@/types/Exchange';
import { miniIcons } from '@/assets/images/miniIcons';
import styles from '../ui/ExchangeItemUI.module.scss';
import avatar from '@/assets/images/common/avatar.svg';
import { useNavigate } from 'react-router-dom';
import { dispatch } from '@/reduxStore/store';
import { setSelectedUser } from '@/features/chatSlice/chatSlice';
import { Button } from '../../button/Button';
import { ExchangeItemUI } from '../ui/ExchangeItemUI';
import { useState } from 'react';
import { ConfirmExchangeModal } from '@/components/modals/ConfirmExchange/ConfirmExchangeModal';

interface RecipientExchangeItemProps {
  exchange: ExchangeResponse;
}

export const RecipientExchangeItem: React.FC<RecipientExchangeItemProps> = ({
  exchange,
}) => {
  const navigate = useNavigate();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const actionSection = (
    <div className={styles.pairAction}>
      {isConfirmModalOpen && (
        <ConfirmExchangeModal
          exchange={exchange}
          onClose={() => setIsConfirmModalOpen(false)}
        />
      )}
      <img className={styles.avatar} src={exchange.initiator.profilePicture || avatar} />
      <div>
        {exchange.initiator.firstName} {exchange.initiator.lastName}
      </div>
      <div
        style={{ width: '200px' }}
        onClick={(ev) => {
          ev.preventDefault();
          setIsConfirmModalOpen(true);
        }}
      >
        <Button
          _buttonVariant="blue"
          _name="Переглянути"
          _fontSize="bold"
          _type="button"
        />
      </div>
      <div
        style={{ width: '200px' }}
        onClick={(ev) => {
          ev.preventDefault();
          localStorage.removeItem('selectedUser');
          dispatch(setSelectedUser(exchange.initiator));
          navigate('/messages');
        }}
      >
        <Button
          _buttonVariant="social"
          _icon={miniIcons.buttMessage}
          _iconPosition="left"
          _name="Відкрити чат"
          _fontSize="bold"
          _type="button"
        />
      </div>
    </div>
  );

  return <ExchangeItemUI exchange={exchange} actionSection={actionSection} />;
};
