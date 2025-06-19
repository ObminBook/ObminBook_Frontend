import { UserNotification } from '@/types/UserNotification';
import styles from './Notification.module.scss';
import { Button } from '../button/Button';
import { miniIcons } from '@/assets/images/miniIcons';
import avatar from '../../../assets/images/common/avatar.svg';
import { getDaysAgo } from '@/utils/getDaysAgo';
import { useSelector } from 'react-redux';
import { select } from '@/features/authSlice/authSlice';
import { useNavigate } from 'react-router-dom';
import { setSelectedUser } from '@/features/chatSlice/chatSlice';
import { useAppDispatch } from '@/reduxHooks/useAppDispatch';
import { User } from '@/types/User';

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
  const exchange = notification?.exchangeDto;
  const isUserInitiator = notification.exchangeDto?.initiator.id === user?.id;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleOpenChat = (ev: React.MouseEvent<HTMLDivElement>, chatUser: User) => {
    ev.preventDefault();
    navigate('/messages');

    localStorage.removeItem('selectedUser');

    dispatch(setSelectedUser(chatUser));
  };

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
        {exchange ? (
          <div className={styles.body}>
            <div className={styles.bookNameContainer}>
              <img src={miniIcons.iconOpenBook} alt="" />
              <div className={styles.bookName}>
                {exchange.isAnyBookOffered
                  ? 'Будь-яка ваша книжка'
                  : `${exchange.initiatorBook?.title}`}
              </div>
            </div>
            <div className={styles.arrowDown}>↓</div>
            <div className={styles.bookNameContainer}>
              <img src={miniIcons.iconOpenBook} alt="iconbook" />{' '}
              <div className={styles.bookName}>{`${exchange.recipientBook?.title}`}</div>
            </div>
          </div>
        ) : null}

        {notification.exchangeDto && (
          <div className={styles.status}>
            <div
              className={`${styles['statusCircle']} ${
                styles[`statusCircle_${exchange?.exchangeStatus}`]
              }`}
            ></div>
            {statusLabel[notification.exchangeDto?.exchangeStatus]}
          </div>
        )}

        {exchange && (
          <div className={styles.exchangeBlock}>
            {exchange.exchangeStatus === 'PENDING' ? (
              isUserInitiator ? (
                <div className={styles.buttonsContainer}>
                  <div className={styles.leftButton}>
                    <Button
                      _name="Скасувати запит"
                      _buttonVariant="social"
                      _fontSize="bold"
                      _type="button"
                    />
                  </div>

                  <div
                    onClick={(ev) => {
                      handleOpenChat(ev, exchange.recipient);
                    }}
                  >
                    <Button
                      _icon={miniIcons.buttMessage}
                      _iconPosition="left"
                      _buttonVariant="social"
                      _name="Відкрити чат"
                      _fontSize="bold"
                      _type="button"
                    />
                  </div>
                </div>
              ) : (
                <div className={styles.buttonsContainer}>
                  <div className={styles.rightButton}>
                    <Button
                      _name="Переглянути"
                      _buttonVariant="blue"
                      _fontSize="bold"
                      _type="button"
                    />
                  </div>

                  <div onClick={(ev) => handleOpenChat(ev, exchange.initiator)}>
                    <Button
                      _icon={miniIcons.buttMessage}
                      _iconPosition="left"
                      _buttonVariant="social"
                      _name="Відкрити чат"
                      _fontSize="bold"
                      _type="button"
                    />
                  </div>
                </div>
              )
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};
