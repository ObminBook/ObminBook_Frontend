import styles from './ExchangeBlock.module.scss';
import { miniIcons } from '../../../assets/images/miniIcons';
import { Button } from '../../base/button/Button';
import { useSelector } from 'react-redux';
import {
  select,
  startExchangeAsync,
} from '../../../features/exchangeSlice/exchangeSlice';
import { BookMiniCard } from '../../base/bookCards/BookMiniCard/views/BookMiniCard';
import { AnyBookCard } from '../../base/bookCards/AnyBookCard/AnyBookCard';
import { dispatch } from '@/reduxStore/store';
import { ExchangeRequest } from '@/types/Exchange';
import { Loader } from '@/components/base/Loader/Loader';

export const ExchangeBlock: React.FC = () => {
  const myBookSelected = useSelector(select.myBook);
  const anotherUserBookSelected = useSelector(select.anotherUserBook);
  const isAnyCardSelected = useSelector(select.isAny);
  const anyCard = useSelector(select.anyCard);
  const offerStatus = useSelector(select.offerExchangeStatus);
  const isLoading = offerStatus === 'loading';

  const handleStartExchange = () => {
    if (!anotherUserBookSelected) return;

    const requestParams: ExchangeRequest = {
      initiatorBookId: myBookSelected?.id ?? null,
      recipientBookId: anotherUserBookSelected.id,
      isAnyBookOffered: isAnyCardSelected,
    };

    dispatch(startExchangeAsync(requestParams));
  };

  return (
    <div className={styles.exchangeBlock}>
      <h2 className={styles.title}>Обмін</h2>

      <div className={styles.section}>
        <div className={styles.cardContainer}>
          {myBookSelected ? (
            <BookMiniCard
              book={myBookSelected}
              withDeleteButton={true}
              cardType="myCards"
            />
          ) : isAnyCardSelected ? (
            <AnyBookCard book={anyCard} />
          ) : (
            <button className={styles.selectButton}>
              Виберіть книгу зі свого списку
            </button>
          )}
        </div>
      </div>

      <div className={styles.iconWrapper}>
        <div className={styles.icon}>
          <img src={miniIcons.arrows} alt="Обмін" />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.cardContainer}>
          {anotherUserBookSelected ? (
            <BookMiniCard
              book={anotherUserBookSelected}
              withDeleteButton
              cardType="anotherUserCards"
            />
          ) : (
            <button className={styles.selectButton}>
              Виберіть книгу зі списку користувача
            </button>
          )}
        </div>
      </div>

      <div className={styles.submitButton} onClick={handleStartExchange}>
        <Button
          _buttonVariant="blue"
          _name={isLoading ? <Loader /> : 'Запропонувати обмін'}
          _type="button"
          _fontSize="bold"
          _disabled={!anotherUserBookSelected || (!myBookSelected && !isAnyCardSelected)}
        />
      </div>
    </div>
  );
};
