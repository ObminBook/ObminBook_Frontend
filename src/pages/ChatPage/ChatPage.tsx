import React, { useEffect, useRef, useState } from 'react';
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from 'firebase/firestore';

import styles from './ChatPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/layout/Header/Header';
import { User } from '../../types/User';
import { SearchQueryContainer } from '../../components/widgets/searchQuery/containers/SearchQueryContainer';
import { miniIcons } from '../../assets/images/miniIcons';
import avatar from '../../assets/images/common/avatar.svg';
import { db } from '../../firebase.config';

interface Message {
  id: string;
  text: string;
  user: string;
  room: number;
}

export const ChatPage: React.FC = () => {
  const [newMessage, setNewMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [currentUserId, setCurrentUserId] = useState(1);
  const [room, setRoom] = useState(1);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const messagesRef = collection(db, 'messages');
  const navigate = useNavigate();

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where('room', '==', room),
      orderBy('createdAt')
    );

    console.log(db, 'db');

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      const messages: Message[] = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Message[];
      setMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (buttonRef.current && !buttonRef.current.disabled) {
          console.log('enter pressed');

          handleSendMessage();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      currentUserId,
      room,
    });

    setNewMessage('');
  };

  const usersList: User[] = [
    {
      id: 1,
      firstName: 'Олена',
      lastName: 'Шевченко',
      about: 'Люблю сучасну українську прозу',
      city: 'Львів',
      email: 'olena.shevchenko@example.com',
      avatar,
      succesfullExchanges: 12,
      books: [
        {
          id: 101,
          ownerId: 1,
          title: 'Тіні забутих предків',
          author: 'Михайло Коцюбинський',
          categoryName: 'Класика',
          coverImage: 'image1.jpg',
          condition: 'Добрий',
          exchangeType: 'Особисто',
          city: 'Львів',
        },
      ],
    },
    {
      id: 2,
      firstName: 'Артем',
      lastName: 'Коваленко',
      city: 'Київ',
      email: 'artem.koval@example.com',
      avatar,
      succesfullExchanges: 5,
      books: [
        {
          id: 102,
          ownerId: 2,
          title: 'Чорний ворон',
          author: 'Василь Шкляр',
          categoryName: 'Історичний роман',
          coverImage: 'image2.jpg',
          condition: 'Новий',
          exchangeType: 'Пошта',
          city: 'Київ',
        },
      ],
    },
    {
      id: 3,
      firstName: 'Ірина',
      lastName: 'Мельник',
      about: 'Захоплююся психологією та нон-фікшн літературою.',
      city: 'Одеса',
      email: 'iryna.melnyk@example.com',
      avatar,
      succesfullExchanges: 8,
      books: [
        {
          id: 103,
          ownerId: 3,
          title: 'Сила підсвідомості',
          author: 'Джозеф Мерфі',
          categoryName: 'Психологія',
          coverImage: 'image3.jpg',
          condition: 'Гарний',
          exchangeType: 'Особисто',
          city: 'Одеса',
        },
      ],
    },
    {
      id: 4,
      firstName: 'Максим',
      lastName: 'Гнатюк',
      city: 'Дніпро',
      email: 'max.hnatyuk@example.com',
      avatar,
      succesfullExchanges: 3,
      books: [
        {
          id: 104,
          ownerId: 4,
          title: '1984',
          author: 'George Orwell',
          categoryName: 'Антиутопія',
          coverImage: 'image4.jpg',
          condition: 'Вживаний',
          exchangeType: 'Особисто',
          city: 'Дніпро',
        },
      ],
    },
    {
      id: 5,
      firstName: 'Наталя',
      lastName: 'Бондаренко',
      city: 'Харків',
      email: 'natali.bond@example.com',
      avatar,
      succesfullExchanges: 10,
      books: [
        {
          id: 105,
          ownerId: 5,
          title: 'Тест на людяність',
          author: 'Костянтин Дорошенко',
          categoryName: 'Документалістика',
          coverImage: 'image5.jpg',
          condition: 'Новий',
          exchangeType: 'Пошта',
          city: 'Харків',
        },
      ],
    },
  ];

  return (
    <div className={styles['chat']}>
      <Header />
      {}
      <div className={styles['chat__content']}>
        <div className={`${styles['chat__sidebar']} ${styles['sidebar']}`}>
          <div className={styles['sidebar__findUserContainer']}>
            <div
              className={styles['sidebar__backButton']}
              onClick={() => navigate(-1)}
            >
              <img
                className={styles['sidebar__backButton-img']}
                src={miniIcons.backButton}
                alt="backIcon"
              />
              Назад
            </div>

            <div className={styles['sidebar__searchUserInput']}>
              <SearchQueryContainer placeholder="Пошук контактів" />
            </div>
          </div>

          <div
            className={`${styles['sidebar__usersList']} ${styles['usersList']}`}
          >
            {usersList.map((user: User) => (
              <div
                className={`${styles['usersList__user']} ${
                  user.id === selectedUser?.id &&
                  styles['usersList__user--selected']
                }`}
                onClick={() => setSelectedUser(user)}
              >
                <img
                  className={styles['usersList__userImg']}
                  src={user.avatar}
                  alt="userAvatar"
                />
                <div className={styles['usersList__userInfo']}>
                  <div className={styles['usersList__userName']}>
                    {user.firstName} {user.lastName}
                  </div>
                  <p className={styles['usersList__userMessage']}>
                    Тут буде дуже довге повідомлення, яке не буде влазити
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${styles['chat__main']} ${styles['main']}`}>
          {selectedUser && (
            <div className={styles['main__header']}>
              <div className={styles['main__selectedUser']}>
                <img
                  className={styles['main__selectedUser-img']}
                  src={avatar}
                  alt="Марія Петренко"
                />
                <div className={styles['main__selectedUser-aboutUser']}>
                  <div className={styles['main__selectedUser-name']}>
                    {selectedUser
                      ? `${selectedUser?.firstName} ${selectedUser?.lastName}`
                      : 'Ігор Барбан'}
                    <p className={styles['main__selectedUser-location']}>
                      {selectedUser?.city}, Україна
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles['main__infoButton']}>
                <img
                  className={styles['main__infoButton-img']}
                  src={miniIcons.infoIcon}
                  alt=""
                />
              </div>
            </div>
          )}

          <div className={styles['main__content']}>
            {messages.map((message) => {
              return <div>{message.text}</div>;
            })}
          </div>
          <div
            className={`${styles['main__chatFooter']} ${styles['chatFooter']}`}
          >
            <input
              className={styles['chatFooter__input']}
              placeholder="Повідомлення.."
              type="text"
              value={newMessage}
              onChange={(ev) => setNewMessage(ev.target.value)}
            />
            <button
              ref={buttonRef}
              className={styles['chatFooter__sendButton']}
              onClick={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              disabled={!newMessage}
            >
              <img
                className={styles['chatFooter__sendButton-img']}
                src={
                  newMessage
                    ? miniIcons.sendMessage
                    : miniIcons.sendMessageDisabled
                }
                alt=""
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
