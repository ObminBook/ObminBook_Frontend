import React, { useEffect } from 'react';
import styles from './UserProfile.module.scss';
import { useNavigate, NavLink } from 'react-router-dom';
import NotificationsPanel from '../../components/widgets/notificationPanel/NotificationPanel';
import { Footer } from '../../components/layout/Footer/Footer';
import avatar from '../../assets/images/common/avatar.svg';
import { miniIcons } from '../../assets/images/miniIcons';
import { Header } from '../../components/layout/Header/Header';
import AddBookCard from '../../components/base/bookCards/AddBookCard/AddBookCard';
import { SimpleBookCard } from '../../components/base/bookCards/SimpleBookCard/SimpleBookCard';
import { useSelector } from 'react-redux';
import { select as authSelect } from '@/features/authSlice/authSlice';
import {
  getMyBooks,
  select as manageBooksSelect,
  setMyBooksPageNumber,
} from '@/features/manageBookSlice/manageBookSlice';
import { useAppDispatch } from '@/reduxHooks/useAppDispatch';

const TABS = [
  { key: 'my', label: 'Мої книги', img: miniIcons.iconOpenBook },
  { key: 'saved', label: 'Збережені книги', img: miniIcons.buttHeartBlue },
  { key: 'requests', label: 'Всі запити', img: miniIcons.iconObmin },
];

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useSelector(authSelect.user);
  const userBooks = useSelector(manageBooksSelect.myBooks);
  const pageNumber = useSelector(manageBooksSelect.myBooksPageNumber);
  const fetchStatus = useSelector(manageBooksSelect.fetchMyStatus);

  useEffect(() => {
    // Завантажуємо першу сторінку книг
    dispatch(getMyBooks());
  }, [dispatch]);

  // Функція для завантаження наступної сторінки книг
  const loadMoreBooks = () => {
    if (fetchStatus !== 'pending') {
      dispatch(setMyBooksPageNumber(pageNumber + 1));
      dispatch(getMyBooks());
    }
  };

  return (
    <div className={styles['user-profile']}>
      <Header />
      <main className={styles['user-profile__main']}>
        <div className={styles['user-profile__content']}>
          <div className={styles['user-profile__header']}>
            <div className={styles['user-profile__info']}>
              <div className={`${styles['owner']} ${styles['user-profile__owner']}`}>
                <div className={styles['owner__container']}>
                  <img
                    className={styles['owner__img']}
                    src={avatar}
                    alt={'Аватар користувача'}
                  />
                  <div>
                    <div className={styles['owner__name-location']}>
                      <div className={styles['owner__name']}>
                        {user ? `${user.firstName} ${user.lastName}` : 'Непрацюючий Юзер'}
                      </div>
                      <p className={styles['owner__location']}>
                        {user?.city || 'Київ, Україна'}
                      </p>
                      <p
                        className={styles['owner__config']}
                        onClick={() => navigate('/personal')}
                      >
                        Налаштування
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles['user-profile__notifications']}>
              <img
                src={miniIcons.buttMessage}
                className={styles['user-profile__notifications-img']}
                alt="Повідомлення"
              />
              <span className={styles['user-profile__notifications-text']}>
                Повідомлення
              </span>
            </div>
          </div>
          <div className={styles['user-profile__body']}>
            <div className={styles['user-profile__books']}>
              <div className={styles['user-profile__tabs']}>
                {TABS.map((tab) => (
                  <NavLink
                    key={tab.key}
                    to={`/profile/${tab.key}`}
                    className={({ isActive }) =>
                      `${styles['user-profile__tab']} ${
                        isActive ? styles['user-profile__tab--active'] : ''
                      }`
                    }
                  >
                    <img
                      className={styles['user-profile__tab-img']}
                      src={tab.img}
                      alt={tab.label}
                    />
                    {tab.label}
                    <div className={styles['user-profile__tab-count']}>
                      {userBooks?.length || '0'}
                    </div>
                  </NavLink>
                ))}
              </div>
              <div className={styles['user-profile__book-list']}>
                <div className={styles['user-profile__user-book-card']}>
                  <AddBookCard />
                </div>
                {userBooks.map((book) => (
                  <div className={styles['user-profile__user-book-card']} key={book.id}>
                    <SimpleBookCard book={book} />
                  </div>
                ))}
              </div>
              {/* Кнопка для підвантаження ще книг */}
              <div style={{ textAlign: 'center', margin: '20px 0' }}>
                {fetchStatus === 'pending' ? (
                  <span>Завантаження...</span>
                ) : (
                  <button onClick={loadMoreBooks}>Завантажити ще</button>
                )}
              </div>
            </div>
            <NotificationsPanel />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfile;
