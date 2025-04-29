import React, { useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { db } from '../../../firebase.config';

import styles from './Chat.module.scss';

interface Message {
  id: string;
  text: string;
  user: string;
  createdAt: any;
  room: number;
}

export const Chat: React.FC = () => {
  const [newMessage, setNewMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [user, setUser] = useState<string>('');
  const room = 1;
  const messagesRef = collection(db, 'messages');

  const Users: Record<string, string> = {
    Ihor: 'Ihor',
    Vitaliy: 'Vitaliy',
  };

  useEffect(() => {
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
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user,
      room,
    });

    setNewMessage('');
  };

  return (
    <div className={styles.chat}>
      <h1 className={styles.chat__title}>Chat</h1>

      <div className={styles.chat__users}>
        <button
          className={`${styles.chat__selectUser} ${
            user === Users.Ihor ? styles['chat__selectUser--selected'] : ''
          }`}
          onClick={() => setUser(Users.Ihor)}
        >
          Ihor
        </button>

        <button
          className={`${styles.chat__selectUser} ${
            user === Users.Vitaliy ? styles['chat__selectUser--selected'] : ''
          }`}
          onClick={() => setUser(Users.Vitaliy)}
        >
          Vitaliy
        </button>
      </div>

      <div className={styles.chat__messages}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.chat__message} ${
              message.user === user
                ? styles['chat__message--my']
                : styles['chat__message--other']
            }`}
          >
            <p className={styles.chat__messageText}>{message.text}</p>
            <p className={styles.chat__messageUser}>{message.user}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className={styles.chat__form}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here..."
          className={styles.chat__input}
        />
        <button type="submit" className={styles.chat__button}>
          Send
        </button>
      </form>
    </div>
  );
};
