// src/firebase/config.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAPLZaba_w8uJQak80B3Iswv0anK1XkR88',
  authDomain: 'obminbook-2a5e1.firebaseapp.com',
  databaseURL: 'https://obminbook-2a5e1-default-rtdb.firebaseio.com',
  projectId: 'obminbook-2a5e1',
  storageBucket: 'obminbook-2a5e1.firebasestorage.app',
  messagingSenderId: '679624440031',
  appId: '1:679624440031:web:dded6734c98e2b3982116a',
  measurementId: 'G-H5B3GHF76G',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Експортуємо сервіси
export const db = getFirestore(app);
export const auth = getAuth(app);
