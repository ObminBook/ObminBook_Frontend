import { BookPage } from './Book';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  city: string;
  creatingDate: string;
  description: string;
  profilePicture: string;
}

export interface TargetUser {
  user: User;
  books: BookPage;
}
