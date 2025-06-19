import { ExchangeResponse } from '@/types/Exchange';
import styles from './ConfirmExchangeModal.module.scss';
import { SmallExtendedCard } from '@/components/base/bookCards/SmallExtendedCard/SmallExtendedCard';
import { miniIcons } from '@/assets/images/miniIcons';
import { useEffect, useState } from 'react';
import { booksApi, exchangeApi } from '@/api/booksApi';
import { TargetUser } from '@/types/User';
import { MicroCard } from '@/components/base/bookCards/MicroCard/MicroCard';
import { Book } from '@/types/Book';
import { Button } from '@/components/base/button/Button';
import { showSuccessToast } from '@/components/customToast/toastUtils';
import { Loader } from '@/components/base/Loader/Loader';
import { useAppDispatch } from '@/reduxHooks/useAppDispatch';
import { getRecievedExchangesAsync } from '@/features/exchangeSlice/exchangeSlice';
import Skeleton from 'react-loading-skeleton';

interface Props {
  exchange: ExchangeResponse;
  onClose: () => void;
}

export const ConfirmExchangeModal: React.FC<Props> = ({ exchange, onClose }) => {
  const [targetUser, setTargetUser] = useState<TargetUser>();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const targetUserBooks = targetUser?.books.content;
  const initiatorName = `${exchange.initiator.firstName} ${exchange.initiator.lastName}`;
  const isAnyBookOffered = exchange.isAnyBookOffered;
  const [isConfirmLoading, setIsConfirmLoading] = useState(false);
  const [isRejectLoading, setIsRejectLoading] = useState(false);
  const [isCardsLoading, setIsCardsLoading] = useState(false);
  const dispatch = useAppDispatch();

  function handleBookSelect(book: Book) {
    setSelectedBook(book);
  }

  async function handleAcceptOffer(ev: React.MouseEvent<HTMLDivElement>) {
    ev.preventDefault();
    setIsConfirmLoading(true);
    try {
      if (isAnyBookOffered && selectedBook !== null) {
        await exchangeApi.acceptOfferAny(exchange.id, selectedBook?.id);
      } else {
        await exchangeApi.acceptOffer(exchange.id);
      }
      showSuccessToast('Запит на обмін підтверджено!');
      dispatch(getRecievedExchangesAsync());
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsConfirmLoading(false);
    }
  }

  async function handleRejectOffer(ev: React.MouseEvent<HTMLDivElement>) {
    ev.preventDefault();
    setIsRejectLoading(true);
    try {
      await exchangeApi.cancelRequest(exchange.id);
      showSuccessToast('Запит успішно відхилено!');
      dispatch(getRecievedExchangesAsync());
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsRejectLoading(false);
    }
  }

  useEffect(() => {
    if (exchange.isAnyBookOffered === false) {
      return;
    }

    setIsCardsLoading(true);

    const fetchTargetUser = async () => {
      try {
        const data = await booksApi.fetchTargetUser(exchange.initiator.id);
        setTargetUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsCardsLoading(false);
      }
    };

    fetchTargetUser();
  }, []);

  return (
    <div className={styles.container}>
      <img
        className={styles.closeIcon}
        src={miniIcons.closeIcon}
        alt="close"
        onClick={onClose}
      />
      <div className={styles.content}>
        <h1 className={styles.confirmTitle}>{initiatorName}</h1>
        <h2 className={styles.confirmSubTitle}>
          {isAnyBookOffered ? 'Пропонує обмін на одну з його книг' : 'Пропонує обмін'}
        </h2>
        <SmallExtendedCard book={exchange.recipientBook} />

        <div className={styles.arrows}>
          <img
            className={styles.imgArrowDown}
            src={miniIcons.arrowDown}
            alt="arrowDown"
          />
          <img className={styles.imgArrowUp} src={miniIcons.arrowDown} alt="arrowDown" />
        </div>

        <div className={styles.initiatorBookContainer}>
          <SmallExtendedCard
            book={exchange.isAnyBookOffered ? selectedBook : exchange.initiatorBook}
          />
          {!selectedBook && exchange.isAnyBookOffered && (
            <div className={styles.boxText}>Оберіть одну книжку зі списку юзера</div>
          )}
        </div>

        {exchange.isAnyBookOffered && (
          <div className={styles.cardsBox}>
            {isCardsLoading
              ? [1, 2, 3, 4, 5].map(() => (
                  <Skeleton height={160} width={120} borderRadius={12} />
                ))
              : targetUserBooks?.map((book) => {
                  const isCardSelected = book.id === selectedBook?.id;

                  return (
                    <MicroCard
                      isCardSelected={isCardSelected}
                      book={book}
                      onSelect={handleBookSelect}
                    />
                  );
                })}
          </div>
        )}

        <div className={styles.buttonsContainer}>
          <div className={styles.button} onClick={handleAcceptOffer}>
            <Button
              _buttonVariant="blue"
              _name={isConfirmLoading ? <Loader /> : 'Підвтердити'}
              _disabled={selectedBook === null && isAnyBookOffered}
              _fontSize="bold"
              _icon={isConfirmLoading ? null : miniIcons.checkmark}
              _iconPosition="left"
            />
          </div>
          <div className={styles.button} onClick={handleRejectOffer}>
            <Button
              _buttonVariant="social"
              _name={isRejectLoading ? <Loader /> : 'Відхилити'}
              _fontSize="bold"
              _icon={isRejectLoading ? null : miniIcons.cross}
              _iconPosition="left"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
