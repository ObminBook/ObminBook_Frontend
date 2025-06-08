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
  additionalInformation: string;
  language: string;
  bookStatus: string;
  creatingDate: string;
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

export interface AddBookResponce extends Book {
  owner: User;
}

export interface BookPage {
  content: Book[];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  hasNext: true;
}

export interface SearchBooksRequest {
  page: number;
  size: number;
  sort: string;
  categories: string[];
  condition: string[];
  exchangeType: string[];
  titleAndAuthor: string;
  totalElements: number;
}

export interface SavedBookItem {
  book: Book;
  userId: number;
  userEmail: string;
}

export interface SavedBookResponce {
  content: SavedBookItem[];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  hasNext: boolean;
}
