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
  limit,
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
import ChatListSkeleton from '@/components/skeletons/ChatListSkeleton';
import { User } from '@/types/User';
import { getMessageDate } from './getMessageDate';
import { cardIcons } from '@/assets/images/cardBook/cardDetails';

const getRoomId = (uid1: string, uid2: string) => [uid1, uid2].sort().join('_');

interface LastMessage {
  text: string;
  createdAt: any;
  user: string;
}
interface LastMessages {
  [userId: string]: LastMessage | null;
}

export const ChatPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const [roomId, setRoomId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [lastMessages, setLastMessages] = useState<LastMessages>(() => {
    try {
      const saved = localStorage.getItem('lastMessages');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const chatRef = useRef<HTMLDivElement>(null);
  const selectedUser = useSelector((state: RootState) => state.chat.selectedUser);
  const listOfUsers = useSelector((state: RootState) => state.chat.listOfUsers);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();

  const handleUserClick = (user: User) => {
    localStorage.removeItem('selectedUser');

    localStorage.setItem('selectedUser', JSON.stringify(user));

    dispatch(setSelectedUser(user));
  };

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto'; // скидаємо висоту
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px'; // встановлюємо висоту по контенту
    }
  }, [newMessage]);

  useEffect(() => {
    const savedUserStr = localStorage.getItem('selectedUser');
    if (savedUserStr) {
      try {
        const savedUser = JSON.parse(savedUserStr);
        if (savedUser && savedUser.id) {
          dispatch(setSelectedUser(savedUser));
        }
      } catch (e) {
        console.error('Failed to parse selectedUser from localStorage', e);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (selectedUser) {
      const savedUserStr = localStorage.getItem('selectedUser');
      if (!savedUserStr || JSON.parse(savedUserStr).id !== selectedUser.id) {
        localStorage.setItem('selectedUser', JSON.stringify(selectedUser));
      }
    } else {
      localStorage.removeItem('selectedUser');
    }
  }, [selectedUser]);

  // Fetch user list (partners) on mount
  useEffect(() => {
    dispatch(getExchangePartnersAsync());
  }, [dispatch]);

  // Firebase auth and setting current user
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

  // Listen for last messages per user to update sidebar in real-time
  useEffect(() => {
    if (!currentUserId || listOfUsers.length === 0 || isLoading) return;

    const userIds = listOfUsers.map((u) => String(u.id));
    setLoadingMessages(new Set(userIds));
    const unsubscribers: (() => void)[] = [];

    listOfUsers.forEach((user) => {
      const uid = String(user.id);
      const rid = getRoomId(currentUserId, uid);
      const q = query(
        collection(db, 'messages'),
        where('roomId', '==', rid),
        orderBy('createdAt', 'desc'),
        limit(1)
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          setLoadingMessages((prev) => {
            const next = new Set(prev);
            next.delete(uid);
            return next;
          });

          const doc = snapshot.docs[0];
          const newLastMessage: LastMessage | null = doc
            ? (doc.data() as LastMessage)
            : null;

          setLastMessages((prev) => {
            const prevMsg = prev[uid];
            const isDifferent =
              (!prevMsg && newLastMessage) ||
              (prevMsg &&
                newLastMessage &&
                (prevMsg.text !== newLastMessage.text ||
                  prevMsg.user !== newLastMessage.user));

            if (!isDifferent) return prev;

            const updated = { ...prev, [uid]: newLastMessage };
            localStorage.setItem('lastMessages', JSON.stringify(updated));
            return updated;
          });
        },
        (err) => {
          console.error(err);
          setLoadingMessages((prev) => {
            const next = new Set(prev);
            next.delete(uid);
            return next;
          });
        }
      );

      unsubscribers.push(unsubscribe);
    });

    return () => unsubscribers.forEach((u) => u());
  }, [currentUserId, listOfUsers, isLoading]);

  // Setup or create chat room on user selection
  useEffect(() => {
    if (!currentUserId || !selectedUser?.id) return;

    const rid = getRoomId(currentUserId, String(selectedUser.id));
    const setup = async () => {
      const roomRef = doc(db, 'rooms', rid);
      const snap = await getDoc(roomRef);
      if (!snap.exists()) {
        await setDoc(roomRef, {
          users: [currentUserId, selectedUser.id],
          createdAt: serverTimestamp(),
        });
      }
      setRoomId(rid);
    };
    setup();
  }, [currentUserId, selectedUser]);

  // Listen to messages in the selected room in real-time
  useEffect(() => {
    if (!roomId) {
      setMessages([]);
      return;
    }
    const q = query(
      collection(db, 'messages'),
      where('roomId', '==', roomId),
      orderBy('createdAt', 'asc')
    );
    const unsub = onSnapshot(q, (snap) => {
      setMessages(
        snap.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            text: data.text,
            user: data.user,
            roomId: data.roomId,
            createdAt: data.createdAt ? data.createdAt.toDate() : null,
          };
        })
      );
    });
    return () => unsub();
  }, [roomId]);

  // Send message handler
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !roomId || !currentUserId) return;
    try {
      await addDoc(collection(db, 'messages'), {
        text: newMessage.trim(),
        createdAt: serverTimestamp(),
        user: currentUserId,
        roomId,
      });
      setNewMessage('');
    } catch (e: any) {
      if (e.code === 'permission-denied') {
        alert('Немає прав для відправки повідомлення. Перевірте правила Firestore.');
      } else {
        console.error(e);
      }
    }
  };

  // Enter key sends message
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [newMessage, roomId, currentUserId]);

  // Utility for truncating long messages
  const truncate = (text: string, max = 50) =>
    text.length > max ? `${text.slice(0, max)}...` : text;

  // Get last message text for sidebar display
  const getLastMessageText = (userId: string | number) => {
    const id = String(userId);
    if (isLoading || loadingMessages.has(id)) return 'Завантаження...';

    const msg = lastMessages[id];
    if (!msg) return 'Почніть розмову';

    // Якщо останнє повідомлення - від співрозмовника (не currentUser)
    // і текст відрізняється від того, що ми показуємо (мабуть, нове)
    if (msg.user !== currentUserId) {
      return 'Нове повідомлення';
    }

    return (msg.user === currentUserId ? 'Ви: ' : '') + truncate(msg.text);
  };

  const filteredUsers = listOfUsers.filter((user) => {
    const username = `${user.firstName} ${user.lastName}`;
    return username.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className={styles.chat}>
      <Header />
      <div className={styles.chat__content}>
        <div className={`${styles.chat__sidebar} ${styles.sidebar}`}>
          <div className={styles.sidebar__findUserContainer}>
            <button className={styles.sidebar__backButton} onClick={() => navigate(-1)}>
              <img src={miniIcons.arrowBackBlack} alt="Назад" />
              Назад
            </button>
            <div className={styles.sidebar__searchUserInput}>
              <SearchQueryContainer
                placeholder="Пошук користувача"
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
              />
            </div>
          </div>
          {isLoading ? (
            <ChatListSkeleton />
          ) : (
            <div className={styles.sidebar__usersList}>
              {filteredUsers.map((u) => (
                <div
                  key={u.id}
                  className={`${styles.usersList__user} ${
                    selectedUser?.id === u.id ? styles['usersList__user--selected'] : ''
                  }`}
                  onClick={() => handleUserClick(u)}
                >
                  <img
                    src={u.profilePicture || avatar}
                    alt={`${u.firstName} ${u.lastName}`}
                    className={styles.usersList__userImg}
                  />
                  <div className={styles.usersList__userInfo}>
                    <div className={styles.usersList__userName}>
                      {u.firstName} {u.lastName}
                    </div>
                    <div className={styles.usersList__userMessage}>
                      {getLastMessageText(u.id)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={`${styles.chat__main} ${styles.main}`}>
          {selectedUser && (
            <div className={styles.headerContainer}>
              <div className={styles.main__header}>
                <img
                  className={styles.headerImg}
                  src={selectedUser.profilePicture || avatar}
                  alt="userpicture"
                />
                {selectedUser.firstName} {selectedUser.lastName}
              </div>
            </div>
          )}

          <div ref={chatRef} className={styles.main__content}>
            {!selectedUser && (
              <div className={styles.emptyChatBlock}>
                <img
                  className={styles.emptyChatBlock__img}
                  src={cardIcons.anyBookIcon}
                  alt="anyBook"
                />
                {!selectedUser && listOfUsers.length > 0 && (
                  <>
                    <h3 className={styles.emptyChatBlock__title}>Виберіть чат</h3>
                    <p className={styles.emptyChatBlock__description}>
                      Оберіть контакт зі списку зліва, щоб почати спілкування
                    </p>
                  </>
                )}
                {listOfUsers.length === 0 && (
                  <>
                    <h3 className={styles.emptyChatBlock__title}>
                      У вас поки немає діалогів
                    </h3>
                    <p className={styles.emptyChatBlock__description}>
                      Чат з юзером зʼявиться коли буде запропонований обмін
                    </p>
                  </>
                )}
              </div>
            )}

            {messages.map((m) => (
              <div
                key={m.id}
                className={
                  m.user === currentUserId ? styles.myMessage : styles.anotherUserMessage
                }
              >
                {m.text}
                {m.createdAt && (
                  <div className={styles.time}>
                    {getMessageDate(m.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
          {selectedUser && (
            <div className={`${styles.main__chatFooter} ${styles.chatFooter}`}>
              <textarea
                ref={textAreaRef}
                className={styles.chatFooter__input}
                placeholder="Повідомлення.."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                rows={1}
              />

              <button
                ref={buttonRef}
                className={styles.chatFooter__sendButton}
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
              >
                <img
                  src={newMessage ? miniIcons.sendMessage : miniIcons.sendMessageDisabled}
                  alt="Відправити"
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
