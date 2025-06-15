// ExchangeProposalPage.tsx - виправлена версія
import styles from './ExchangeProposalPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState, useCallback, useMemo } from 'react';

import { miniIcons } from '../../assets/images/miniIcons';
import { Header } from '../../components/layout/Header/Header';
import { ListMiniCards } from '../../components/widgets/listMiniCards/ListMiniCards';
import { ExchangeBlock } from '../../components/layout/ExchangeBlock/ExchangeBlock';
import { Footer } from '../../components/layout/Footer/Footer';
import {
  getMyBooks,
  getTargetUser,
  select as manageSelect,
  setTargetUser,
  clearTargetUser,
} from '@/features/manageBookSlice/manageBookSlice';
import { useAppDispatch } from '@/reduxHooks/useAppDispatch';
import { select as exchangeSelect } from '@/features/exchangeSlice/exchangeSlice';
import { getTargetUserFromLocalStorage } from '@/utils/localStorage';
import { Loader } from '@/components/base/Loader/Loader';

export const ExchangeProposalPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const myBooks = useSelector(manageSelect.myBooks);
  const targetUser = useSelector(manageSelect.targetUser);
  const targetUserStatus = useSelector(manageSelect.targetUserStatus);
  const anotherUserBook = useSelector(exchangeSelect.anotherUserBook);

  // Локальний стан для відображення завантаження
  const [isLoadingTargetUser, setIsLoadingTargetUser] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Мемоізуємо ID для уникнення зайвих перерендерів
  const targetUserBookId = useMemo(
    () => anotherUserBook?.owner?.id,
    [anotherUserBook?.owner?.id]
  );
  const currentTargetUserId = useMemo(() => targetUser?.user?.id, [targetUser?.user?.id]);

  // Мемоізуємо функції для уникнення зайвих перерендерів
  const getTargetUserName = useCallback(() => {
    if (targetUser) {
      return `${targetUser.user.firstName} ${targetUser.user.lastName}`;
    }
    if (anotherUserBook) {
      return `${anotherUserBook.owner.firstName} ${anotherUserBook.owner.lastName}`;
    }
    return 'Користувач';
  }, [targetUser, anotherUserBook]);

  const getTargetUserBooks = useCallback(() => {
    if (targetUser) {
      return targetUser.books.content || [];
    }
    return [];
  }, [targetUser]);

  // Окремий useEffect для завантаження моїх книг
  useEffect(() => {
    if (myBooks.length === 0) {
      dispatch(getMyBooks());
    }
  }, [dispatch, myBooks.length]);

  // Основний useEffect для роботи з targetUser
  useEffect(() => {
    if (isInitialized) return;

    const loadTargetUser = async () => {
      try {
        const cachedUser = getTargetUserFromLocalStorage();

        // Якщо є anotherUserBook, працюємо з ним
        if (targetUserBookId) {
          // Перевіряємо, чи є вже правильний targetUser
          if (currentTargetUserId === targetUserBookId) {
            console.log('Target user вже завантажений');
            setIsInitialized(true);
            return;
          }

          // Перевіряємо кеш
          if (cachedUser && cachedUser.user.id === targetUserBookId) {
            dispatch(setTargetUser(cachedUser));
            console.log('Завантажено target user з localStorage');
          } else {
            // Завантажуємо з API
            setIsLoadingTargetUser(true);
            try {
              await dispatch(getTargetUser(String(targetUserBookId))).unwrap();
              console.log('Завантажено нового target user з API');
            } catch (error) {
              console.error('Помилка завантаження target user:', error);
              navigate(-1);
            } finally {
              setIsLoadingTargetUser(false);
            }
          }
        }
        // Якщо немає anotherUserBook, але є кешований користувач
        else if (cachedUser && !currentTargetUserId) {
          dispatch(setTargetUser(cachedUser));
          console.log('Відновлено target user з localStorage після оновлення сторінки');
        }
        // Якщо немає жодних даних
        else if (!cachedUser && !currentTargetUserId && !targetUserBookId) {
          console.warn('Немає даних про target user, перенаправлення...');
          navigate(-1);
          return;
        }

        setIsInitialized(true);
      } catch (error) {
        console.error('Помилка в loadTargetUser:', error);
        setIsInitialized(true);
      }
    };

    loadTargetUser();
  }, [dispatch, navigate, targetUserBookId, currentTargetUserId, isInitialized]);

  // useEffect для очищення при демонтажі компонента
  useEffect(() => {
    return () => {
      dispatch(clearTargetUser());
      console.log('Target user cleared from Redux state on page unmount');
    };
  }, [dispatch]);

  // Показуємо лоадер під час ініціалізації
  if (!isInitialized) {
    return (
      <div className={styles.exchangePage}>
        <Header />
        <main className={styles.exchangePage__content}>
          <div className={styles.targetUserSection__loading}>
            <Loader />
            <p>Ініціалізація...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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

          <div className={styles.targetUserSection}>
            {isLoadingTargetUser || targetUserStatus === 'pending' ? (
              <div className={styles.targetUserSection__loading}>
                <Loader />
                <p>Завантажуємо книги користувача...</p>
              </div>
            ) : (
              <ListMiniCards
                title={`Книги ${getTargetUserName()}`}
                books={getTargetUserBooks()}
                cardsType="anotherUserCards"
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
