import React, { useEffect, useRef, useState } from 'react';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import styles from './ChatPage.module.scss';
import { Header } from '../../components/layout/Header/Header';
import { User } from '../../types/User';
import { miniIcons } from '../../assets/images/miniIcons';
import { db } from '../../firebase.config';
import { loginToFirebase } from '../../utils/firebaseLogin';
import avatar from '../../assets/images/common/avatar.svg';
import { SearchQueryContainer } from '@/components/widgets/searchQuery/containers/SearchQueryContainer';

interface Message {
  id: string;
  text: string;
  user: string; // string!
  roomId: string;
  createdAt: any;
}

const mockUsers: User[] = [
  {
    id: '1', // string!
    email: 'anna@example.com',
    firstName: 'Anna',
    lastName: 'Müller',
    city: 'Berlin',
    creatingDate: '2024-01-10',
    description: 'Люблю читати сучасну прозу',
    profilePicture: '',
  },
  {
    id: '2', // string!
    email: 'max@example.com',
    firstName: 'Max',
    lastName: 'Schneider',
    city: 'Hamburg',
    creatingDate: '2023-07-20',
    description: 'Колекціоную рідкісні книги',
    profilePicture: '',
  },
];

// Генерація унікального roomId для пари користувачів (рядкові id)
const getRoomId = (uid1: string, uid2: string) => [uid1, uid2].sort().join('_');

export const ChatPage: React.FC = () => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string>(''); // string!
  const [roomId, setRoomId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();

  // Логін
  useEffect(() => {
    const authenticate = async () => {
      try {
        const userCredential = await loginToFirebase();
        if (userCredential) {
          setCurrentUserId(userCredential.user.uid); // uid — це string
        } else {
          navigate('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };
    authenticate();
  }, [navigate]);

  // Створення або отримання room при виборі користувача
  useEffect(() => {
    if (!currentUserId || !selectedUser) return;

    const setupRoom = async () => {
      const rid = getRoomId(currentUserId, String(selectedUser.id));
      const roomRef = doc(db, 'rooms', rid);
      const roomSnap = await getDoc(roomRef);

      if (!roomSnap.exists()) {
        await setDoc(roomRef, {
          users: [currentUserId, selectedUser.id],
          createdAt: serverTimestamp(),
        });
      }
      setRoomId(rid);
    };

    setupRoom();
  }, [currentUserId, selectedUser]);

  // Завантаження повідомлень для room
  useEffect(() => {
    console.log('=== НАЛАШТУВАННЯ СЛУХАЧА ПОВІДОМЛЕНЬ ===');
    console.log('roomId:', roomId);

    if (!roomId) {
      console.log('❌ roomId порожній, очищуємо повідомлення');
      setMessages([]);
      return;
    }

    console.log('📥 Створюємо слухач для roomId:', roomId);

    const messagesRef = collection(db, 'messages');
    const q = query(
      messagesRef,
      where('roomId', '==', roomId),
      orderBy('createdAt', 'asc') // Явно вказуємо порядок
    );

    const unsubscribe = onSnapshot(
      q,
      {
        includeMetadataChanges: true, // Включаємо зміни метаданих для кращого відслідковування
      },
      (snapshot) => {
        console.log('📨 Snapshot отримано:', {
          size: snapshot.size,
          empty: snapshot.empty,
          hasPendingWrites: snapshot.metadata.hasPendingWrites,
          fromCache: snapshot.metadata.fromCache,
        });

        // Перевіряємо зміни в реальному часі
        snapshot.docChanges().forEach((change) => {
          console.log(`Зміна документа: ${change.type}`, {
            id: change.doc.id,
            data: change.doc.data(),
          });
        });

        const msgs: Message[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            text: data.text,
            user: data.user,
            roomId: data.roomId,
            createdAt: data.createdAt,
          };
        });

        console.log('📋 Оновлюємо повідомлення:', msgs.length);
        setMessages(msgs);
      },
      (error) => {
        console.error('❌ Помилка слухача:', error);
      }
    );

    return () => {
      console.log('🛑 Відключаємо слухач повідомлень');
      unsubscribe();
    };
  }, [roomId]);

  // Відправка повідомлення
  // Детальна діагностика в handleSendMessage
  const handleSendMessage = async () => {
    console.log('=== ДІАГНОСТИКА ВІДПРАВКИ ===');
    console.log('newMessage:', `"${newMessage}"`);
    console.log('roomId:', roomId);
    console.log('currentUserId:', currentUserId);

    if (!newMessage.trim()) {
      console.log('❌ Повідомлення порожнє');
      return;
    }

    if (!roomId) {
      console.log('❌ roomId не встановлений - проблема зі створенням кімнати');
      alert('Не вдалося створити кімнату чату. Перевірте правила Firebase.');
      return;
    }

    if (!currentUserId) {
      console.log('❌ currentUserId не встановлений - проблема з аутентифікацією');
      return;
    }

    console.log('✅ Всі умови виконані, відправляємо повідомлення...');

    const messagesRef = collection(db, 'messages');
    try {
      await addDoc(messagesRef, {
        text: newMessage,
        createdAt: serverTimestamp(),
        user: currentUserId,
        roomId,
      });
      console.log('✅ Повідомлення відправлено успішно');
      setNewMessage('');
    } catch (error) {
      console.error('❌ Помилка відправки повідомлення:', error);
      if (error.code === 'permission-denied') {
        alert('Немає прав для відправки повідомлення. Перевірте правила Firestore.');
      }
    }
  };

  // Також додайте діагностику для useEffect, що створює room
  useEffect(() => {
    console.log('=== ДІАГНОСТИКА СТВОРЕННЯ ROOM ===');
    console.log('currentUserId:', currentUserId);
    console.log('selectedUser:', selectedUser);

    if (!currentUserId) {
      console.log('❌ currentUserId не встановлений');
      return;
    }

    if (!selectedUser) {
      console.log('❌ selectedUser не вибраний');
      return;
    }

    const setupRoom = async () => {
      try {
        console.log('Створюємо roomId...');
        const rid = getRoomId(currentUserId, String(selectedUser.id));
        console.log('Generated roomId:', rid);

        // Спочатку спробуємо прочитати документ
        console.log('Перевіряємо чи існує кімната...');
        const roomRef = doc(db, 'rooms', rid);

        let roomExists = false;
        try {
          const roomSnap = await getDoc(roomRef);
          roomExists = roomSnap.exists();
          console.log('Кімната існує:', roomExists);
        } catch (readError) {
          console.error('❌ Помилка читання кімнати:', readError);
          // Якщо не можемо прочитати, спробуємо створити
        }

        if (!roomExists) {
          console.log('Створюємо нову кімнату...');
          await setDoc(roomRef, {
            users: [currentUserId, String(selectedUser.id)],
            createdAt: serverTimestamp(),
          });
          console.log('✅ Кімната створена успішно');
        } else {
          console.log('✅ Кімната вже існує');
        }

        setRoomId(rid);
        console.log('✅ roomId встановлений:', rid);
      } catch (error) {
        console.error('❌ Помилка створення кімнати:', error);

        // Додаткова інформація про помилку
        if (error.code === 'permission-denied') {
          console.error(
            '🔥 ПРОБЛЕМА З ПРАВИЛАМИ FIRESTORE! Перевірте Rules в Firebase Console'
          );
          alert('Помилка доступу до Firebase. Перевірте правила безпеки Firestore.');
        } else if (error.code === 'unauthenticated') {
          console.error('🔑 ПРОБЛЕМА З АУТЕНТИФІКАЦІЄЮ! Користувач не залогінений');
          navigate('/login');
        }
      }
    };

    setupRoom();
  }, [currentUserId, selectedUser, navigate]);

  // Додайте також діагностику для аутентифікації
  useEffect(() => {
    const authenticate = async () => {
      console.log('=== ДІАГНОСТИКА АУТЕНТИФІКАЦІЇ ===');
      try {
        const userCredential = await loginToFirebase();
        console.log('userCredential:', userCredential);

        if (userCredential) {
          console.log('✅ Користувач аутентифікований');
          console.log('user.uid:', userCredential.user.uid);
          setCurrentUserId(userCredential.user.uid);
        } else {
          console.log('❌ Аутентифікація не вдалася, перенаправляємо на логін');
          navigate('/login');
        }
      } catch (error) {
        console.error('❌ Помилка аутентифікації:', error);
      } finally {
        setIsLoading(false);
      }
    };
    authenticate();
  }, [navigate]);

  // Enter для відправки
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        // Додано перевірку !e.shiftKey
        e.preventDefault(); // Запобігаємо стандартній поведінці
        if (newMessage.trim() && roomId && currentUserId) {
          handleSendMessage();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [newMessage, roomId, currentUserId]);

  if (isLoading) {
    return <div className={styles['chat__loading']}>Завантаження чату...</div>;
  }

  return (
    <div className={styles['chat']}>
      <Header />
      <div className={styles['chat__content']}>
        <div className={`${styles['chat__sidebar']} ${styles['sidebar']}`}>
          <div className={styles['sidebar__findUserContainer']}>
            <button
              className={styles['sidebar__backButton']}
              onClick={() => navigate(-1)}
            >
              <img
                src={miniIcons.arrowBackBlack}
                alt="Назад"
                className={styles['sidebar__backButton-img']}
              />
              Назад
            </button>
            <div className={styles['sidebar__searchUserInput']}>
              <SearchQueryContainer placeholder="Пошук користувача" />
            </div>
          </div>
          <div className={styles['sidebar__usersList']}>
            {mockUsers.map((user) => (
              <div
                key={user.id}
                className={`${styles['usersList__user']} ${
                  selectedUser?.id === user.id ? styles['usersList__user--selected'] : ''
                }`}
                onClick={() => setSelectedUser(user)}
              >
                <img
                  src={user.profilePicture || avatar}
                  alt={`${user.firstName} ${user.lastName}`}
                  className={styles['usersList__userImg']}
                />
                <div className={styles['usersList__userInfo']}>
                  <div className={styles['usersList__userName']}>
                    {user.firstName} {user.lastName}
                  </div>
                  <div className={styles['usersList__userMessage']}>
                    {user.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={`${styles['chat__main']} ${styles['main']}`}>
          {selectedUser && (
            <div className={styles['main__header']}>
              {selectedUser.firstName} {selectedUser.lastName}
            </div>
          )}
          <div className={styles['main__content']}>
            {messages.map((message) => (
              <div
                className={
                  message.user === currentUserId
                    ? styles.myMessage
                    : styles.anotherUserMessage
                }
                key={message.id}
              >
                {message.text}
              </div>
            ))}
          </div>
          {selectedUser && (
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
                disabled={!newMessage.trim()}
              >
                <img
                  className={styles['chatFooter__sendButton-img']}
                  src={newMessage ? miniIcons.sendMessage : miniIcons.sendMessageDisabled}
                  alt=""
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
