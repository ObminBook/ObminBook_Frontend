import { Timestamp } from 'firebase/firestore';

export interface Message {
  id: string;
  text: string;
  user: string;
  roomId: string;
  createdAt: Timestamp;
}
