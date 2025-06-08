import { Book } from './Book';
import { User } from './User';

export interface ExchangeResponse {
  id: number;
  initiator: User;
  recipient: User;
  initiatorBook: Book;
  recipientBook: Book;
  exchangeStatus: 'PENDING' | 'COMPLETED' | 'DECLINED';
  createDate: string;
  isAnyBookOffered: boolean;
}

export interface ExchangeRequest {
  initiatorBookId: Book['id'] | null;
  recipientBookId: Book['id'];
  isAnyBookOffered: boolean;
}

export interface ExchangeAccept {
  initiatorBookId: Book['id'];
  exchangeId: number;
}

export interface ExchangePageResponse {
  content: ExchangeResponse[];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  hasNext: boolean;
}
