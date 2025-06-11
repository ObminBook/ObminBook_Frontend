import { signInWithCustomToken, UserCredential } from 'firebase/auth';
import { auth } from '../firebase.config';
import { axiosInstance } from '@/api/axiosInstance';

export const loginToFirebase = async (): Promise<UserCredential | null> => {
  try {
    const { data } = await axiosInstance.get('/firebase/token');
    const tokenPrefix = 'firebaseToken: ';
    const token = data.startsWith(tokenPrefix)
      ? data.slice(tokenPrefix.length).trim()
      : null;

    if (token) {
      const userCredential = await signInWithCustomToken(auth, token);
      console.log('Signed in successfully:', userCredential);
      return userCredential;
    } else {
      console.error('Не вдалося знайти токен у відповіді');
      return null;
    }
  } catch (err) {
    console.error('Firebase login failed', err);
    return null;
  }
};
