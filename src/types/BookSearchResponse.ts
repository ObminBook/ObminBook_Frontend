import { Book } from './Book';

export interface BookSearchResponse {
  content: Book[];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  hasNext: boolean;
}
