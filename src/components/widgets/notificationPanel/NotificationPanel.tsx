import React, { useEffect, useState } from 'react';
import styles from './NotificationPanel.module.scss';
import { miniIcons } from '@/assets/images/miniIcons';
import { notificationApi } from '@/api/booksApi';
import { showErrorToast } from '@/components/customToast/toastUtils';
import { UserNotification } from '@/types/UserNotification';
import { Notification } from '@/components/base/notification/Notification';

const NotificationsPanel: React.FC = () => {
  const [notifications, setNotifications] = useState<UserNotification[]>([]);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const data = await notificationApi.getNotifications();
        setNotifications(data.content);
      } catch {
        showErrorToast('Не вдалося завантажити notifications');
      }
    };

    fetchNotification();
  }, []);

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <img className={styles.imgBell} src={miniIcons.bell} alt="imgBell" />
        <h4 className={styles.title}>Сповіщення</h4>
      </div>
      <div className={styles.list}>
        {notifications.map((n) => (
          <Notification notification={n} />
        ))}
      </div>
    </div>
  );
};

export default NotificationsPanel;
