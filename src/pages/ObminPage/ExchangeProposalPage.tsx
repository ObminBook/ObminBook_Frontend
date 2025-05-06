// ExchangeProposalPage.tsx
import styles from './ExchangeProposalPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  setAnyCard,
  removeMyBook,
} from '../../features/exchangeSlice/exchangeSlice';

import { getMockBooksByPage } from '../../books/books';
import { miniIcons } from '../../assets/images/miniIcons';
import { Header } from '../../components/layout/Header/Header';
import { Button } from '../../components/base/button/Button';
import { ListMiniCards } from '../../components/widgets/listMiniCards/ListMiniCards';
import { ExchangeBlock } from '../../components/layout/ExchangeBlock/ExchangeBlock';
import { Footer } from '../../components/layout/Footer/Footer';

export const ExchangeProposalPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const myBooks = getMockBooksByPage(1, 4).content;
  const anotherUserBooks = getMockBooksByPage(2, 4).content;

  const handleSelectAnyCard = () => {
    dispatch(removeMyBook());
    dispatch(setAnyCard({ text: 'Обмін на будь-яку мою книгу' }));
  };

  return (
    <div className={styles.exchangePage}>
      <Header />
      <main className={styles.exchangePage__content}>
        <button
          className={styles.exchangePage__backButton}
          onClick={() => navigate(-1)}
        >
          <img
            src={miniIcons.backButton}
            alt="Назад"
            style={{ width: '16px', height: '16px' }}
          />
          Назад
        </button>

        <h1 className={styles.exchangePage__title}>Пропозиція обміну</h1>

        <div className={styles.exchangePage__blocks}>
          <div
            className={styles.exchangePage__anyButton}
            onClick={handleSelectAnyCard}
          >
            <Button
              _buttonVariant="blueTransparent"
              _name="Обмін на будь-яку мою книгу"
            />
          </div>

          <ListMiniCards
            title="Мої книги"
            books={myBooks}
            cardsType="myCards"
          />

          <ExchangeBlock />

          <ListMiniCards
            title="Книги користувача Піся Камушкін"
            books={anotherUserBooks}
            cardsType="anotherUserCards"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};
