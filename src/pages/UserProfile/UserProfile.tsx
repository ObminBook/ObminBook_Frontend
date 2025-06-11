import React, { useEffect } from 'react';
import styles from './UserProfile.module.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import NotificationsPanel from '../../components/widgets/notificationPanel/NotificationPanel';
import { Footer } from '../../components/layout/Footer/Footer';
import avatar from '../../assets/images/common/avatar.svg';
import { miniIcons } from '../../assets/images/miniIcons';
import { Header } from '../../components/layout/Header/Header';
import { useSelector } from 'react-redux';
import { select as authSelect } from '@/features/authSlice/authSlice';
import {
  getMyBooks,
  getSavedBooks,
  select as manageBooksSelect,
} from '@/features/manageBookSlice/manageBookSlice';
import { useAppDispatch } from '@/reduxHooks/useAppDispatch';
import { ListSavedBooks } from '@/components/widgets/listSavedBooks/ListSavedBooks';
import { ListMyBooks } from '@/components/widgets/listMyBooks/ListMyBooks';
import classNames from 'classnames';

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
  const [searchParams, setSearchParams] = useSearchParams();
  const savedBooksItems = useSelector(manageBooksSelect.savedBooks);

  const tab = searchParams.get('tab') || 'my';

  useEffect(() => {
    dispatch(getSavedBooks());
  }, [dispatch]);

  useEffect(() => {
    if (!searchParams.get('tab')) {
      setSearchParams({ tab: 'my' });
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    dispatch(getMyBooks());
  }, [dispatch]);

  const handleTabChange = (tabKey: string) => {
    setSearchParams({ tab: tabKey });
  };

  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.page}>
        <main className={styles.main}>
          <div className={styles.content}>
            <div className={styles.header}>
              <div className={styles.info}>
                <div className={styles.owner}>
                  <div className={styles.ownerContainer}>
                    <img
                      className={styles.avatar}
                      src={user?.profilePicture || avatar}
                      alt="Аватар користувача"
                    />
                    <div className={styles.details}>
                      <div className={styles.name}>
                        {user ? `${user.firstName} ${user.lastName}` : 'Непрацюючий Юзер'}
                      </div>
                      <p className={styles.location}>{user?.city || 'Київ, Україна'}</p>
                      <p className={styles.config} onClick={() => navigate('/personal')}>
                        Налаштування
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.body}>
              <div className={styles.manager}>
                <div className={styles.tabs}>
                  {TABS.map((tabItem) => (
                    <button
                      key={tabItem.key}
                      onClick={() => handleTabChange(tabItem.key)}
                      className={classNames(styles.tab, {
                        [styles.activeTab]: tab === tabItem.key,
                      })}
                    >
                      <img
                        className={styles.tabImg}
                        src={tabItem.img}
                        alt={tabItem.label}
                      />
                      {tabItem.label}
                      <div className={styles.count}>
                        {tabItem.key === 'my' ? userBooks?.length || 0 : ''}
                        {tabItem.key === 'saved' ? savedBooksItems?.length || 0 : ''}
                      </div>
                    </button>
                  ))}
                </div>

                {tab === 'my' && <ListMyBooks />}
                {tab === 'saved' && <ListSavedBooks />}
                {tab === 'requests' && <p>Тут буде компонент запитів</p>}
              </div>

              <NotificationsPanel />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
