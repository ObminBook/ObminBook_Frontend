import {
  getRecievedExchangesAsync,
  select,
} from '@/features/exchangeSlice/exchangeSlice';
import { useAppDispatch } from '@/reduxHooks/useAppDispatch';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './RecievedListExchanges.module.scss';
import { RecipientExchangeItem } from '@/components/base/exchangeItem/containers/RecipientExchangeItem';

export const RecievedListExchanges = () => {
  const dispatch = useAppDispatch();
  const recievedExchanges = useSelector(select.recievedExchanges);
  const pendingExchanges = recievedExchanges.filter(
    (ex) => ex.exchangeStatus === 'PENDING'
  );

  useEffect(() => {
    dispatch(getRecievedExchangesAsync());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      {pendingExchanges.length === 0 ? (
        <p className={styles.emptyMessage}>Немає отриманих запитів на обмін</p>
      ) : (
        pendingExchanges.map((el) => <RecipientExchangeItem key={el.id} exchange={el} />)
      )}
    </div>
  );
};
