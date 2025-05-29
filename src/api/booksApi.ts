import { SearchBooksRequest, SearchBooksResponce } from '@/types/Book';
import { axiosInstance } from './axiosInstance';
import qs from 'qs';

export const booksApi = {
  fetchMy: async (page: number, size: number) => {
    try {
      const response = await axiosInstance.get('books/all/me', {
        params: { page, size },
      });
      return response?.data;
    } catch (error) {
      console.error(error);
    }
  },

  searchBooks: async (filters: SearchBooksRequest) => {
    try {
      const response = await axiosInstance.get('books/search', {
        params: {
          page: filters.page,
          size: filters.size,
          // ...(filters.sort && { sort: filters.sort }),
          ...(filters.categories?.length && { categories: filters.categories }),
          ...(filters.condition?.length && { condition: filters.condition }),
          ...(filters.exchangeType?.length && { exchangeType: filters.exchangeType }),
          ...(filters.titleAndAuthor && { titleAndAuthor: filters.titleAndAuthor }),
        },
        paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'comma' }),
      });

      return response.data as SearchBooksResponce;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
