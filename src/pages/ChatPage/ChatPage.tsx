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
import { TargetUser, User } from '../../types/User';
// import { SearchQueryContainer } from '../../components/widgets/searchQuery/containers/SearchQueryContainer';
import { miniIcons } from '../../assets/images/miniIcons';
import { db } from '../../firebase.config';
import { loginToFirebase } from '../../utils/firebaseLogin';

interface Message {
  id: string;
  text: string;
  user: string;
  room: number;
}

const mockUsers = [
  {
    user: {
      id: 1,
      email: 'anna@example.com',
      firstName: 'Anna',
      lastName: 'Müller',
      city: 'Berlin',
      creatingDate: '2024-01-10',
      description: 'Люблю читати сучасну прозу',
      profilePicture: '',
    },
    books: {
      content: [],
      totalPages: 0,
      totalElements: 0,
    },
  },
  {
    user: {
      id: 2,
      email: 'max@example.com',
      firstName: 'Max',
      lastName: 'Schneider',
      city: 'Hamburg',
      creatingDate: '2023-07-20',
      description: 'Колекціоную рідкісні книги',
      profilePicture: '',
    },
    books: {
      content: [],
      totalPages: 0,
      totalElements: 0,
    },
  },
];

export const ChatPage: React.FC = () => {
  const [newMessage, setNewMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [currentUserId, setCurrentUserId] = useState<string>(''); // UID з Firebase
  const [room, setRoom] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // loading state

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const messagesRef = collection(db, 'messages');
  const navigate = useNavigate();

  // ЛОГІН
  useEffect(() => {
    const authenticate = async () => {
      try {
        const userCredential = await loginToFirebase(); // твоя функція
        const uid = userCredential.user.uid;
        setCurrentUserId(uid);
      } catch (error) {
        console.error('Login failed:', error);
        navigate('/login'); // або будь-яка логіка у разі помилки
      } finally {
        setIsLoading(false);
      }
    };

    authenticate();
  }, []);

  // Завантаження повідомлень тільки після логіну
  useEffect(() => {
    if (!currentUserId) return;

    const queryMessages = query(
      messagesRef,
      where('room', '==', room),
      orderBy('createdAt')
    );

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      const messages: Message[] = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Message[];
      setMessages(messages);
    });

    return () => unsubscribe();
  }, [currentUserId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (buttonRef.current && !buttonRef.current.disabled) {
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
      user: currentUserId,
      room,
    });

    setNewMessage('');
  };

  if (isLoading) {
    return <div className={styles['chat__loading']}>Завантаження чату...</div>;
  }

  return (
    <div className={styles['chat']}>
      <Header />
      <div className={styles['chat__content']}>
        <div className={`${styles['chat__sidebar']} ${styles['sidebar']}`}>
          {/* Sidebar - без змін */}
        </div>

        <div className={`${styles['chat__main']} ${styles['main']}`}>
          {/* Main chat UI */}
          {selectedUser && (
            <div className={styles['main__header']}>{/* Selected user header */}</div>
          )}

          <div className={styles['main__content']}>
            {messages.map((message) => {
              return <div key={message.id}>{message.text}</div>;
            })}
          </div>

          <div className={`${styles['main__chatFooter']} ${styles['chatFooter']}`}>
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
                src={newMessage ? miniIcons.sendMessage : miniIcons.sendMessageDisabled}
                alt=""
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
