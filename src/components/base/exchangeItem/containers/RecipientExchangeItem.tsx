import { ExchangeResponse } from '@/types/Exchange';
import { miniIcons } from '@/assets/images/miniIcons';
import styles from '../ui/ExchangeItemUI.module.scss';
import avatar from '@/assets/images/common/avatar.svg';
import { useNavigate } from 'react-router-dom';
import { dispatch } from '@/reduxStore/store';
import { setSelectedUser } from '@/features/chatSlice/chatSlice';
import { Button } from '../../button/Button';
import { ExchangeItemUI } from '../ui/ExchangeItemUI';

interface RecipientExchangeItemProps {
  exchange: ExchangeResponse;
}

export const RecipientExchangeItem: React.FC<RecipientExchangeItemProps> = ({
  exchange,
}) => {
  const navigate = useNavigate();

  const actionSection = (
    <div className={styles.pairAction}>
      <img src={exchange.initiator.profilePicture || avatar} />
      <div>
        {exchange.initiator.firstName} {exchange.initiator.lastName}
      </div>
      <div style={{ width: '200px' }}>
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
          navigate('/messages');
          dispatch(setSelectedUser(exchange.initiator));
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
