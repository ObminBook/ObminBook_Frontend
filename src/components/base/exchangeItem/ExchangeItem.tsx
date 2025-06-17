import { ExchangeResponse } from '@/types/Exchange';
import styles from './ExchangeItem.module.scss';
import { BookOfferCard } from '../bookCards/BookOfferCard/BookOfferCard';
import { miniIcons } from '@/assets/images/miniIcons';
import { Button } from '../button/Button';
import { AnyBookCard } from '../bookCards/AnyBookCard/AnyBookCard';
import { useNavigate } from 'react-router-dom';
import { dispatch } from '@/reduxStore/store';
import { setSelectedUser } from '@/features/chatSlice/chatSlice';
import avatar from '../../../assets/images/common/avatar.svg';

interface ExchangeItemProps {
  exchange: ExchangeResponse;
  isUserInitiator?: boolean;
}

export const ExchangeItem: React.FC<ExchangeItemProps> = ({
  exchange,
  isUserInitiator,
}) => {
  const initiatorBook = exchange.initiatorBook;
  const recipientBook = exchange.recipientBook;
  const isAnyBookOffered = exchange.isAnyBookOffered;
  const navigate = useNavigate();

  return (
    <div className={styles.exchange__pairContainer}>
      <div className={styles.exchange__pair}>
        <div className={styles.itemContainer}>
          {isAnyBookOffered ? (
            <AnyBookCard book={{ text: 'Будь-яка з книжок юзера' }} hasLogic={false} />
          ) : (
            <BookOfferCard book={initiatorBook} />
          )}
        </div>
        <img className={styles.arrowsIcon} src={miniIcons.arrows} alt="arrowsIcon" />
        <div className={styles.itemContainer}>
          <BookOfferCard book={recipientBook} />
        </div>
      </div>

      {isUserInitiator ? (
        <div className={styles.pairAction}>
          <div style={{ width: '200px' }}>
            <Button
              _buttonVariant="social"
              _name="Скасувати обмін"
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
      ) : (
        <div className={styles.pairAction}>
          <img src={exchange.initiator.profilePicture || avatar} />
          <div>
            {exchange.initiator.firstName} {exchange.initiator.lastName}
          </div>
          <div style={{ width: '200px' }}>
            <Button
              _buttonVariant="blue"
              _name="Переглянути"
              _fontSize="bold"
              _type="button"
            />
          </div>
          <div
            style={{ width: '200px' }}
            onClick={(ev) => {
              ev.preventDefault();
              navigate('/messages');
              dispatch(setSelectedUser(exchange.initiator));
            }}
          >
            <Button
              _buttonVariant="social"
              _icon={miniIcons.buttMessage}
              _iconPosition="left"
              _name="Відкрити чат"
              _fontSize="bold"
              _type="button"
            />
          </div>
        </div>
      )}
    </div>
  );
};
