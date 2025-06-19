import React, { useEffect } from 'react';
import styles from './UserProfile.module.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import avatar from '../../assets/images/common/avatar.svg';
import { miniIcons } from '../../assets/images/miniIcons';

import { Header } from '@/components/layout/Header/Header';
import { Footer } from '@/components/layout/Footer/Footer';
import { ListSavedBooks } from '@/components/widgets/listSavedBooks/ListSavedBooks';
import { ListMyBooks } from '@/components/widgets/listMyBooks/ListMyBooks';
import { ListExchanges } from '@/components/widgets/listExchanges/ListExchanges';

import { useAppDispatch } from '@/reduxHooks/useAppDispatch';
import { select as authSelect } from '@/features/authSlice/authSlice';
import {
  getMyBooks,
  getSavedBooks,
  select as manageBooksSelect,
} from '@/features/manageBookSlice/manageBookSlice';
import NotificationsPanel from '@/components/widgets/notificationPanel/NotificationPanel';
import {
  getCountAllExchangesAsync,
  select as exchangeSelect,
} from '@/features/exchangeSlice/exchangeSlice';

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
  const savedBooks = useSelector(manageBooksSelect.savedBooks);
  const countOfAllExchanges = useSelector(exchangeSelect.countAllExchanges);

  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get('tab') || 'my';

  useEffect(() => {
    if (!searchParams.get('tab')) setSearchParams({ tab: 'my' });
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    dispatch(getMyBooks());
    dispatch(getSavedBooks());
    dispatch(getCountAllExchangesAsync());
  }, [dispatch]);

  const handleTabChange = (key: string) => {
    setSearchParams({ tab: key });
  };

  const getCount = (key: string) => {
    switch (key) {
      case 'my':
        return userBooks?.length ?? 0;
      case 'saved':
        return savedBooks?.length ?? 0;
      case 'requests':
        return countOfAllExchanges || 0;
      default:
        return 0;
    }
  };

  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.page}>
        <main className={styles.main}>
          <div className={styles.content}>
            {/* Header */}
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
                      <p className={styles.location}>{user?.city || 'Україна'}</p>
                      <p className={styles.config} onClick={() => navigate('/personal')}>
                        Налаштування
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className={styles.body}>
              {/* Left side (Tabs & Content) */}
              <div className={styles.manager}>
                <div className={styles.tabs}>
                  {TABS.map(({ key, label, img }) => (
                    <button
                      key={key}
                      onClick={() => handleTabChange(key)}
                      className={classNames(styles.tab, {
                        [styles.activeTab]: tab === key,
                      })}
                    >
                      <img className={styles.tabImg} src={img} alt={label} />
                      {label}
                      <div className={styles.count}>{getCount(key)}</div>
                    </button>
                  ))}
                </div>

                {tab === 'my' && <ListMyBooks />}
                {tab === 'saved' && <ListSavedBooks />}
                {tab === 'requests' && <ListExchanges />}
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
