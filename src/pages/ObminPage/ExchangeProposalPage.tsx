// ExchangeProposalPage.tsx
import styles from './ExchangeProposalPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { miniIcons } from '../../assets/images/miniIcons';
import { Header } from '../../components/layout/Header/Header';
import { ListMiniCards } from '../../components/widgets/listMiniCards/ListMiniCards';
import { ExchangeBlock } from '../../components/layout/ExchangeBlock/ExchangeBlock';
import { Footer } from '../../components/layout/Footer/Footer';
import {
  getMyBooks,
  getTargetUser,
  select as manageSelect,
} from '@/features/manageBookSlice/manageBookSlice';
import { useAppDispatch } from '@/reduxHooks/useAppDispatch';
import { useEffect } from 'react';
import { select as exchangeSelect } from '@/features/exchangeSlice/exchangeSlice';

export const ExchangeProposalPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const myBooks = useSelector(manageSelect.myBooks);
  const targetUser = useSelector(manageSelect.targetUser);
  const targetUserId = useSelector(exchangeSelect.anotherUserBook)?.owner.id;

  useEffect(() => {
    if (myBooks.length === 0) {
      dispatch(getMyBooks());
    }

    console.log(targetUserId);

    if (targetUserId) {
      dispatch(getTargetUser(String(targetUserId)));
    }
  }, []);

  return (
    <div className={styles.exchangePage}>
      <Header />
      <main className={styles.exchangePage__content}>
        <button className={styles.exchangePage__backButton} onClick={() => navigate(-1)}>
          <img
            src={miniIcons.backButton}
            alt="Назад"
            style={{ width: '16px', height: '16px' }}
          />
          Назад
        </button>

        <h1 className={styles.exchangePage__title}>Пропозиція обміну</h1>

        <div className={styles.exchangePage__blocks}>
          <ListMiniCards title="Мої книги" books={myBooks} cardsType="myCards" />

          <ExchangeBlock />

          <ListMiniCards
            title={`Книги ${targetUser?.user.firstName} ${targetUser?.user.lastName}`}
            books={targetUser?.books.content || []}
            cardsType="anotherUserCards"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};
