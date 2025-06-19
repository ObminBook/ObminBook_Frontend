import { ExchangeResponse } from '@/types/Exchange';
import { miniIcons } from '@/assets/images/miniIcons';
import styles from '../ui/ExchangeItemUI.module.scss';
import { useNavigate } from 'react-router-dom';
import { dispatch } from '@/reduxStore/store';
import { setSelectedUser } from '@/features/chatSlice/chatSlice';
import { Button } from '../../button/Button';
import { ExchangeItemUI } from '../ui/ExchangeItemUI';
import { useState } from 'react';
import { exchangeApi } from '@/api/booksApi';
import { showErrorToast, showSuccessToast } from '@/components/customToast/toastUtils';
import { Loader } from '../../Loader/Loader';
import { getMyExchangesAsync } from '@/features/exchangeSlice/exchangeSlice';

interface InitiatorExchangeItemProps {
  exchange: ExchangeResponse;
}

export const InitiatorExchangeItem: React.FC<InitiatorExchangeItemProps> = ({
  exchange,
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const cancelExchangeAsync = async () => {
    setIsLoading(true);
    try {
      const data = await exchangeApi.cancelRequest(exchange.id);
      showSuccessToast(
        `Скасовано обмін ${data.initiatorBook.title} -> ${data.recipientBook.title}`
      );
      dispatch(getMyExchangesAsync());
    } catch {
      showErrorToast('Не вдалося скасувати запит');
    } finally {
      setIsLoading(false);
    }
  };

  const actionSection = (
    <div className={styles.pairAction}>
      <div style={{ width: '200px' }} onClick={cancelExchangeAsync}>
        <Button
          _buttonVariant="social"
          _name={isLoading ? <Loader /> : 'Скасувати обмін'}
          _fontSize="bold"
          _type="button"
        />
      </div>
      <div
        style={{ width: '200px' }}
        onClick={(ev) => {
          ev.preventDefault();
          navigate('/messages');
          dispatch(setSelectedUser(exchange.recipient));
        }}
      >
        <Button
          _icon={miniIcons.buttMessage}
          _iconPosition="left"
          _buttonVariant="social"
          _name="Відкрити чат"
          _fontSize="bold"
          _type="button"
        />
      </div>
    </div>
  );

  return <ExchangeItemUI exchange={exchange} actionSection={actionSection} />;
};
