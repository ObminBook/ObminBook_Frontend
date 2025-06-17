import { UserNotification } from '@/types/UserNotification';
import styles from './Notification.module.scss';
import { Button } from '../button/Button';
import { miniIcons } from '@/assets/images/miniIcons';
import avatar from '../../../assets/images/common/avatar.svg';
import { getDaysAgo } from '@/utils/getDaysAgo';
import { useSelector } from 'react-redux';
import { select } from '@/features/authSlice/authSlice';

interface NotificationProps {
  notification: UserNotification;
}

const statusLabel: Record<string, string> = {
  PENDING: 'Очікує',
  COMPLETED: 'Прийнято',
  DECLINED: 'Відхилено',
};

export const Notification: React.FC<NotificationProps> = ({ notification }) => {
  const user = useSelector(select.user);
  const isUserInitiator = notification.exchangeDto?.initiator.id === user?.id;

  return (
    <div className={styles.container}>
      <img
        className={styles.avatar}
        src={
          isUserInitiator
            ? miniIcons.infoIcon
            : notification.opponentProfilePicture || avatar
        }
        alt="userAvatar"
      />

      <div className={styles.infoBlock}>
        <div className={styles.header}>
          {isUserInitiator ? (
            <>
              Запит на обмін з <span className={styles.name}>{notification.header}</span>
            </>
          ) : (
            <>
              <span className={styles.name}>{notification.header}</span> пропонує обмін
            </>
          )}
        </div>

        <div className={styles.date}>{getDaysAgo(notification.createDate)}</div>
        <div className={styles.body}>{notification.body}</div>
        {notification.exchangeDto && (
          <div className={styles.status}>
            {statusLabel[notification.exchangeDto?.exchangeStatus]}
          </div>
        )}

        {notification.exchangeDto && (
          <div className={styles.exchangeBlock}>
            {isUserInitiator ? (
              <div className={styles.buttonsContainer}>
                <div className={styles.leftButton}>
                  <Button
                    _name="Скасувати запит"
                    _buttonVariant="social"
                    _fontSize="bold"
                    _type="button"
                  />
                </div>

                <div className={styles.rightButton}>
                  <Button
                    _name="Відкрити чат"
                    _buttonVariant="social"
                    _fontSize="bold"
                    _type="button"
                    _icon={miniIcons.buttMessage}
                    _iconPosition="left"
                  />
                </div>
              </div>
            ) : (
              <div className={styles.buttonsContainer}>
                <div className={styles.leftButton}>
                  <Button
                    _name="Відхилити"
                    _buttonVariant="social"
                    _fontSize="bold"
                    _type="button"
                  />
                </div>

                <div className={styles.rightButton}>
                  <Button
                    _name="Переглянути обмін"
                    _buttonVariant="blue"
                    _fontSize="bold"
                    _type="button"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
