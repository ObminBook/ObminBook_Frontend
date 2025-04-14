// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC_KZ5tlkirEX26aRUecWbTib8od9qC_7k',
  authDomain: 'obminbook-c517e.firebaseapp.com',
  projectId: 'obminbook-c517e',
  storageBucket: 'obminbook-c517e.firebasestorage.app',
  messagingSenderId: '583076264657',
  appId: '1:583076264657:web:6a93f20afe1e44d71063f0',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
