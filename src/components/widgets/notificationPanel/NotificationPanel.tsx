import React, { useEffect, useState } from 'react';
import styles from './NotificationPanel.module.scss';
import { miniIcons } from '@/assets/images/miniIcons';
import { notificationApi } from '@/api/booksApi';
import { showErrorToast } from '@/components/customToast/toastUtils';
import { UserNotification } from '@/types/UserNotification';
import { Notification } from '@/components/base/notification/Notification';
import classNames from 'classnames';
import { NotificationSkeleton } from '@/components/skeletons/NotificationSkeleton';
import { useSelector } from 'react-redux';
import { select } from '@/features/exchangeSlice/exchangeSlice';

const NotificationsPanel: React.FC = () => {
  const [notifications, setNotifications] = useState<UserNotification[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const recievedExchanges = useSelector(select.recievedExchanges);

  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);
      try {
        const data = await notificationApi.getNotifications();
        setNotifications(data.content);
      } catch {
        showErrorToast('Не вдалося завантажити сповіщення');
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotifications();
  }, [recievedExchanges]);

  return (
    <div
      className={classNames(styles.notificationsPanel, {
        [styles.visible]: isVisible,
      })}
    >
      <button
        className={styles.toggleButton}
        onClick={() => setIsVisible((prev) => !prev)}
        aria-label={isVisible ? 'Сховати сповіщення' : 'Показати сповіщення'}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className={classNames(styles.arrowIcon, {
            [styles.rotated]: !isVisible,
          })}
        >
          <path
            d="M6 4L10 8L6 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className={styles.panel}>
        <div className={styles.header}>
          <img src={miniIcons.bell} alt="bell" className={styles.imgBell} />
          <h4 className={styles.title}>Сповіщення</h4>
        </div>

        <div className={styles.list}>
          {isLoading ? (
            [1, 2, 3].map((el) => <NotificationSkeleton key={el} />)
          ) : notifications.length === 0 ? (
            <p className={styles.noNotifications}>Немає сповіщень</p>
          ) : (
            notifications.map((n) => <Notification key={n.id} notification={n} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPanel;
