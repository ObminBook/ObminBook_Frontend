import { User } from './User';

export interface Book {
  id: number;
  title: string;
  author: string;
  categoryName: string;
  coverImage: string;
  owner: User;
  condition: string;
  exchangeType: string;
  description: string;
  publishedYear: number;
  numberOfPages: number;
  language: string;
  bookStatus: string;
  creatingDate: string;
}

export interface AddBookResponce extends Book {
  owner: User;
}

export interface AddBookRequest {
  title: string;
  author: string;
  category: string;
  language: string;
  publishedYear: number | null;
  numberOfPages: number | null;
  description: string | null;
  condition: string;
  exchangeType: string;
}
