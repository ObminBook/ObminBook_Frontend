import { getMyExchangesAsync, select } from '@/features/exchangeSlice/exchangeSlice';
import { useAppDispatch } from '@/reduxHooks/useAppDispatch';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './SentListExchanges.module.scss';
import { InitiatorExchangeItem } from '@/components/base/exchangeItem/containers/InitiatorExchangeItem';

export const SentListExchanges = () => {
  const dispatch = useAppDispatch();
  const myExchanges = useSelector(select.myExchanges);
  const pendingExchanges = myExchanges.filter((ex) => ex.exchangeStatus === 'PENDING');

  useEffect(() => {
    dispatch(getMyExchangesAsync());
  }, []);

  return (
    <div className={styles.container}>
      {pendingExchanges.map((el) => {
        return <InitiatorExchangeItem exchange={el} />;
      })}
    </div>
  );
};
