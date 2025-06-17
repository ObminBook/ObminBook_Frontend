import { Timestamp } from 'firebase/firestore';

export function getMessageDate(createdAt: Timestamp | any): Date {
  if (createdAt instanceof Timestamp) {
    return createdAt.toDate();
  } else if (createdAt?.toDate && typeof createdAt.toDate === 'function') {
    return createdAt.toDate();
  } else if (typeof createdAt === 'string' || createdAt instanceof Date) {
    return new Date(createdAt);
  } else {
    return new Date(); // fallback, щоб не було помилки
  }
}
