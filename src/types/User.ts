import { Book } from './Book';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  about?: string;
  city: string;
  email: string;
  avatar?: string;
  succesfullExchanges?: number;
  books: Book[];
}
