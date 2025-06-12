import { ExchangeResponse } from '@/types/Exchange';
import styles from './ExchangeItem.module.scss';
import { BookMiniCard } from '../bookCards/BookMiniCard/views/BookMiniCard';

interface ExchangeItemProps {
  exchange: ExchangeResponse;
  isUserInitiator?: boolean;
}

export const ExchangeItem: React.FC<ExchangeItemProps> = ({
  exchange,
  isUserInitiator = false,
}) => {
  const initiatorBook = exchange.initiatorBook;
  const recipientBook = exchange.recipientBook;

  return (
    <div className={styles.itemContainer}>
      <BookMiniCard
        // book={isUserInitiator ? initiatorBook : recipientBook}
        book={recipientBook}
        cardType={isUserInitiator ? 'myCards' : 'anotherUserCards'}
      />
      <BookMiniCard
        // book={isUserInitiator ? initiatorBook : recipientBook}
        book={recipientBook}
        cardType={isUserInitiator ? 'myCards' : 'anotherUserCards'}
      />
    </div>
  );
};
