import styles from './ListExchanges.module.scss';
import { ExchangeItem } from '@/components/base/exchangeItem/ExchangeItem';
import { useSelector } from 'react-redux';
import { select as exchangeSelect } from '@/features/exchangeSlice/exchangeSlice';
import { select as userSelect } from '@/features/authSlice/authSlice';

export const ListExchanges = () => {
  const listOfMyExchanges = useSelector(exchangeSelect.listOfMyExchanges);
  const user = useSelector(userSelect.user);

  return (
    <div className={styles.container}>
      {listOfMyExchanges.map((exchange) => {
        const isUserInitiator = user?.id === exchange.initiator.id;

        return (
          <ExchangeItem
            exchange={exchange}
            isUserInitiator={isUserInitiator}
            key={exchange.id}
          />
        );
      })}
    </div>
  );
};
