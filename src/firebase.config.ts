// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAPLZaba_w8uJQak80B3Iswv0anK1XkR88',
  authDomain: 'obminbook-2a5e1.firebaseapp.com',
  projectId: 'obminbook-2a5e1',
  storageBucket: 'obminbook-2a5e1.firebasestorage.app',
  messagingSenderId: '679624440031',
  appId: '1:679624440031:web:dded6734c98e2b3982116a',
  measurementId: 'G-H5B3GHF76G',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
