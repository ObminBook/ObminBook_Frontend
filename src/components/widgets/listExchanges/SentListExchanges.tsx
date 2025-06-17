import { ExchangeItem } from '@/components/base/exchangeItem/ExchangeItem';
import { getMyExchangesAsync, select } from '@/features/exchangeSlice/exchangeSlice';
import { useAppDispatch } from '@/reduxHooks/useAppDispatch';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './SentListExchanges.module.scss';

export const SentListExchanges = () => {
  const dispatch = useAppDispatch();
  const myExchanges = useSelector(select.myExchanges);

  useEffect(() => {
    dispatch(getMyExchangesAsync());
  }, []);
  return (
    <div className={styles.container}>
      {myExchanges.map((el) => {
        return <ExchangeItem isUserInitiator={true} exchange={el} key={el.id} />;
      })}
    </div>
  );
};
