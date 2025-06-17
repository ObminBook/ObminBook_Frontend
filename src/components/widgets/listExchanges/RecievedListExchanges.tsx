import { ExchangeItem } from '@/components/base/exchangeItem/ExchangeItem';
import {
  getRecievedExchangesAsync,
  select,
} from '@/features/exchangeSlice/exchangeSlice';
import { useAppDispatch } from '@/reduxHooks/useAppDispatch';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './RecievedListExchanges.module.scss';

export const RecievedListExchanges = () => {
  const dispatch = useAppDispatch();
  const recievedExchanges = useSelector(select.recievedExchanges);

  useEffect(() => {
    dispatch(getRecievedExchangesAsync());
  }, []);
  return (
    <div className={styles.container}>
      {recievedExchanges.map((el) => {
        return <ExchangeItem isUserInitiator={false} exchange={el} key={el.id} />;
      })}
    </div>
  );
};
