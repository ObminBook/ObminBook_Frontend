import React from 'react';
import styles from './NotificationPanel.module.scss';

const notifications = [
  {
    id: 1,
    name: 'Імʼя Фамілія',
    time: '2 дні тому',
    text: 'Надіслано запит на обмін "Назва Книги"',
    status: 'очікує',
    message: 'Я хотів би обміняти будь-яку свою книгу на вашу',
  },
  // ...інші сповіщення
];

const NotificationsPanel: React.FC = () => (
  <div className={styles['notifications-panel']}>
    <div className={styles['notifications-panel__header']}>Сповіщення</div>
    <div className={styles['notifications-panel__list']}>
      {notifications.map((n) => (
        <div key={n.id} className={styles['notifications-panel__item']}>
          <div className={styles['notifications-panel__info']}>
            <span className={styles['notifications-panel__name']}>
              {n.name}
            </span>
            <span className={styles['notifications-panel__time']}>
              {n.time}
            </span>
          </div>
          <div className={styles['notifications-panel__text']}>{n.text}</div>
          <div className={styles['notifications-panel__message']}>
            {n.message}
          </div>
          <div className={styles[`notifications-panel__status--${n.status}`]}>
            {n.status === 'очікує' && <button>Очікує</button>}
            {n.status === 'прийнято' && <button>Прийнято</button>}
            {n.status === 'відхилено' && <button>Відхилено</button>}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default NotificationsPanel;
