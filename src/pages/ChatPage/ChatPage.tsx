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
import { miniIcons } from '../../assets/images/miniIcons';
import { db } from '../../firebase.config';
import { loginToFirebase } from '../../utils/firebaseLogin';
import avatar from '../../assets/images/common/avatar.svg';
import { SearchQueryContainer } from '@/components/widgets/searchQuery/containers/SearchQueryContainer';
import { useSelector } from 'react-redux';
import { RootState } from '@/reduxStore/store';
import { useAppDispatch } from '@/reduxHooks/useAppDispatch';
import {
  getExchangePartnersAsync,
  setSelectedUser,
} from '@/features/chatSlice/chatSlice';
import { Message } from '@/types/Chat';

const getRoomId = (uid1: string, uid2: string) => [uid1, uid2].sort().join('_');

export const ChatPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const [roomId, setRoomId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const selectedUser = useSelector((state: RootState) => state.chat.selectedUser);
  const listOfUsers = useSelector((state: RootState) => state.chat.listOfUsers);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getExchangePartnersAsync());
  }, []);

  useEffect(() => {
    const authenticate = async () => {
      try {
        const userCredential = await loginToFirebase();
        if (userCredential) {
          setCurrentUserId(userCredential.user.uid);
        } else {
          navigate('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };
    authenticate();
  }, [navigate]);

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

  useEffect(() => {
    if (!roomId) {
      setMessages([]);
      return;
    }
    const messagesRef = collection(db, 'messages');
    const q = query(
      messagesRef,
      where('roomId', '==', roomId),
      orderBy('createdAt', 'asc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: Message[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          text: data.text,
          user: data.user,
          roomId: data.roomId,
        };
      });
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, [roomId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !roomId || !currentUserId) return;
    const messagesRef = collection(db, 'messages');
    try {
      await addDoc(messagesRef, {
        text: newMessage,
        createdAt: serverTimestamp(),
        user: currentUserId,
        roomId,
      });
      setNewMessage('');
      // eslint-disable-next-line
    } catch (error: any) {
      if (error.code === 'permission-denied') {
        alert('Немає прав для відправки повідомлення. Перевірте правила Firestore.');
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
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
            {listOfUsers.map((user) => (
              <div
                key={user.id}
                className={`${styles['usersList__user']} ${
                  selectedUser?.id === user.id ? styles['usersList__user--selected'] : ''
                }`}
                onClick={() => dispatch(setSelectedUser(user))}
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
