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

  useEffect(() => {
    dispatch(getRecievedExchangesAsync());
  }, []);
  return (
    <div className={styles.container}>
      {recievedExchanges.map((el) => {
        return <RecipientExchangeItem exchange={el} />;
      })}
    </div>
  );
};
