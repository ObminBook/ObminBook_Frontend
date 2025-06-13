import { ExchangeResponse } from '@/types/Exchange';
import styles from './ExchangeItem.module.scss';
import { BookOfferCard } from '../bookCards/BookOfferCard/BookOfferCard';
import { miniIcons } from '@/assets/images/miniIcons';
import { Button } from '../button/Button';
import { AnyBookCard } from '../bookCards/AnyBookCard/AnyBookCard';

interface ExchangeItemProps {
  exchange: ExchangeResponse;
  isUserInitiator?: boolean;
}

export const ExchangeItem: React.FC<ExchangeItemProps> = ({
  exchange,
  // isUserInitiator = false,
}) => {
  const initiatorBook = exchange.initiatorBook;
  const recipientBook = exchange.recipientBook;
  const isAnyBookOffered = exchange.isAnyBookOffered;

  return (
    <div className={styles.exchange__pairContainer}>
      <div className={styles.exchange__pair}>
        <div className={styles.itemContainer}>
          {isAnyBookOffered ? (
            <AnyBookCard hasLogic={false} />
          ) : (
            <BookOfferCard book={initiatorBook} />
          )}
        </div>
        <img className={styles.arrowsIcon} src={miniIcons.arrows} alt="arrowsIcon" />
        <div className={styles.itemContainer}>
          <BookOfferCard book={recipientBook} />
        </div>
      </div>

      <div className={styles.pairAction}>
        <div style={{ width: '200px' }}>
          <Button
            _buttonVariant="social"
            _name="Скасувати обмін"
            _fontSize="bold"
            _type="button"
          />
        </div>
        <div style={{ width: '200px' }}>
          <Button
            _buttonVariant="blueTransparent"
            _name="Відкрити чат"
            _fontSize="bold"
            _type="button"
          />
        </div>
      </div>
    </div>
  );
};
