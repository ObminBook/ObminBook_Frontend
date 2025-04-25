import { BookSearchResponse } from '../types/BookSearchResponse';

const BASE_URL = 'http://localhost:8080';

export const getBooks = async (params: string): Promise<BookSearchResponse> => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${BASE_URL}/books/search/${params}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch books: ${response.statusText}`);
  }

  const data: BookSearchResponse = await response.json();
  return data;
};
