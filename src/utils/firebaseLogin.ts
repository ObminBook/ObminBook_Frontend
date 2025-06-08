// utils/firebaseLogin.ts
import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '../firebase.config';
import { axiosInstance } from '@/api/axiosInstance';

export const loginToFirebase = async (): Promise<void> => {
  try {
    const { data } = await axiosInstance.get<{ token: string }>('/firebase/token');

    await signInWithCustomToken(auth, data.token);
    console.log('🔐 Firebase login successful');
  } catch (err) {
    console.error('❌ Firebase login failed', err);
  }
};
