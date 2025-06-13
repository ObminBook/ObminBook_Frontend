import styles from './ListExchanges.module.scss';
import { ExchangeItem } from '@/components/base/exchangeItem/ExchangeItem';
import { useSelector } from 'react-redux';
import { select as exchangeSelect } from '@/features/exchangeSlice/exchangeSlice';
import { select as userSelect } from '@/features/authSlice/authSlice';
import { AnyBookCard } from '@/components/base/bookCards/AnyBookCard/AnyBookCard';

export const ListExchanges = () => {
  const listOfMyExchanges = useSelector(exchangeSelect.listOfMyExchanges);
  const pendingExchanges = listOfMyExchanges.filter(
    (exchange) => exchange.exchangeStatus === 'PENDING'
  );
  const goodExchanges = pendingExchanges.filter((exchange) => {
    return (
      (exchange.initiatorBook === null && exchange.isAnyBookOffered === true) ||
      (exchange.initiatorBook !== null && exchange.isAnyBookOffered === false)
    );
  });

  console.log(goodExchanges);

  const user = useSelector(userSelect.user);

  return (
    <div className={styles.container}>
      {goodExchanges.map((exchange) => {
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
