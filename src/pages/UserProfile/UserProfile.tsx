import React, { useEffect, useState } from 'react';
import styles from './UserProfile.module.scss';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import AddBookCard from '../../components/BookCards/AddBookCard/AddBookCard';
import { getMockBooksByPage } from '../../books/books';
import { BookSearchResponse } from '../../types/BookSearchResponse';
import { useAuth } from '../../context/AuthContext';
import NotificationsPanel from '../../components/2_MiddleComponents/NotificationPanel/NotificationPanel';
import { Footer } from '../../components/1_BigComponents/Footer/Footer';
import avatar from '../../assets/images/all_imgs/common/avatar.svg';
import { buttonIcons } from '../../assets/images/all_imgs/buttonIcons';
import { Header } from '../../components/1_BigComponents/Header/Header';
import { SimpleBookCard } from '../../components/BookCards/SimpleBookCard/SimpleBookCard';

const TABS = [
  { key: 'my', label: 'Мої книги', img: buttonIcons.iconOpenBook },
  { key: 'saved', label: 'Збережені книги', img: buttonIcons.buttHeartBlue },
  { key: 'requests', label: 'Всі запити', img: buttonIcons.iconObmin },
];

const UserProfile: React.FC = () => {
  const [books, setBooks] = useState<BookSearchResponse['content']>();
  const [activeTab, setActiveTab] = useState('my');
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const books = getMockBooksByPage(1, 4).content;
    setBooks(books);
    navigate('my');
  }, []);

  useEffect(() => {
    // Витягуємо таб з урла
    const tab = location.pathname.split('/').pop();
    if (TABS.some((t) => t.key === tab)) setActiveTab(tab as string);
  }, [location.pathname]);

  return (
    <div className={styles['user-profile']}>
      <Header />
      <main className={styles['user-profile__main']}>
        <div className={styles['user-profile__content']}>
          <div className={styles['user-profile__header']}>
            <div className={styles['user-profile__info']}>
              <div
                className={`${styles['owner']} ${styles['user-profile__owner']}`}
              >
                <div className={styles['owner__container']}>
                  <img
                    className={styles['owner__img']}
                    src={avatar}
                    alt="Марія Петренко"
                  />
                  <div>
                    <div className={styles['owner__name-location']}>
                      <div className={styles['owner__name']}>
                        {user
                          ? `${user?.firstName} ${user?.lastName}`
                          : 'Ігор Барбан'}
                      </div>
                      <p className={styles['owner__location']}>Київ, Україна</p>
                      <p className={styles['owner__config']}>Налаштування</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles['user-profile__notifications']}>
              <img
                src={buttonIcons.buttMessage}
                className={styles['user-profile__notifications-img']}
              ></img>
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
                      alt="tabImg"
                    />
                    {tab.label}
                    <div className={styles['user-profile__tab-count']}>
                      {books?.length || '4'}
                    </div>
                  </NavLink>
                ))}
              </div>
              <div className={styles['user-profile__book-list']}>
                <div className={styles['user-profile__user-book-card']}>
                  <AddBookCard />
                </div>
                {books?.map((book) => (
                  <div className={styles['user-profile__user-book-card']}>
                    <SimpleBookCard book={book} />
                  </div>
                ))}
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
