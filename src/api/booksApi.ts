import { SearchBooksRequest, BookPage, SavedBookResponce } from '@/types/Book';
import { axiosInstance } from './axiosInstance';
import qs from 'qs';
import { TargetUser, User } from '@/types/User';
import { UserNotificationResponse } from '@/types/UserNotification';
import { ExchangePageResponse, ExchangeResponse } from '@/types/Exchange';

export const booksApi = {
  fetchMy: async (page: number, size: number) => {
    try {
      const response = await axiosInstance.get('/books/all/me', {
        params: { page, size },
      });
      return response?.data;
    } catch (error) {
      console.error(error);
    }
  },
  searchBooks: async (filters: SearchBooksRequest) => {
    try {
      const response = await axiosInstance.get('/books/search', {
        params: {
          page: filters.page,
          size: filters.size,
          ...(filters.sort && { sort: filters.sort }),
          ...(filters.categories?.length && { categories: filters.categories }),
          ...(filters.condition?.length && { condition: filters.condition }),
          ...(filters.exchangeType?.length && { exchangeType: filters.exchangeType }),
          ...(filters.titleAndAuthor && { titleAndAuthor: filters.titleAndAuthor }),
        },
        paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'comma' }),
      });

      return response.data as BookPage;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  fetchTargetUser: async (userId: string): Promise<TargetUser | undefined> => {
    try {
      const response = await axiosInstance.get<TargetUser>(`/books/all/${userId}`, {
        params: {
          page: 0,
          size: 20,
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  setUserCity: async (city: string) => {
    try {
      await axiosInstance.patch('/user/city', null, {
        params: { city },
      });
    } catch (error) {
      console.error('Помилка при оновленні міста:', error);
    }
  },
  deleteUserBook: async (bookId: string) => {
    try {
      const response = await axiosInstance.delete(`/books/${bookId}`);

      return response;
    } catch (error) {
      console.error('Помилка при видаленні книжки', error);
    }
  },
  saveBook: async (bookId: string) => {
    const response = await axiosInstance.post(`/books/me/saved/${bookId}`);

    return response.data;
  },
  getSavedBooks: async (
    page: number = 0,
    size: number = 10
  ): Promise<SavedBookResponce> => {
    try {
      const response = await axiosInstance.get('/books/me/saved', {
        params: {
          page,
          size,
        },
        paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'comma' }),
      });

      return response.data;
    } catch (error) {
      console.error('Помилка при завантаженні збережених книг', error);
      throw error;
    }
  },
  removeFromSaved: async (bookId: string) => {
    try {
      const response = await axiosInstance.delete(`/books/me/saved/${bookId}`);
      return response;
    } catch (error) {
      console.error('Помилка при видаленні книги із збережених', error);
      throw error;
    }
  },
};

export const exchangeApi = {
  offerExchange: async (
    initiatorBookId: string | null,
    recipientBookId: string,
    isAnyBookOffered: boolean
  ) => {
    const response = await axiosInstance.post('/exchange', {
      initiatorBookId,
      recipientBookId,
      isAnyBookOffered,
    });

    return response.data;
  },
  getMyExchanges: async (): Promise<ExchangePageResponse> => {
    const response = await axiosInstance.get('/exchange/initiated', {
      params: {},
    });

    return response.data;
  },
  getRecievedExchanges: async (): Promise<ExchangePageResponse> => {
    const response = await axiosInstance.get('/exchange/received', {
      params: {},
    });

    return response.data;
  },
  cancelRequest: async (bookId: number): Promise<ExchangeResponse> => {
    const response = await axiosInstance.patch(`/exchange/cancel/${bookId}`);

    return response.data;
  },
  getCountOfAllExchanges: async () => {
    const response = await axiosInstance.get(`/exchange/count`);

    return response.data;
  },
};

export const notificationApi = {
  getNotifications: async (
    page: number = 0,
    size: number = 10,
    sort: string = 'id,desc'
  ): Promise<UserNotificationResponse> => {
    try {
      const response = await axiosInstance.get('/notification', {
        params: {
          page,
          size,
          sort,
        },
        paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'comma' }),
      });

      return response.data;
    } catch (error) {
      console.error('Помилка при завантаженні нотіфікейшнів', error);
      throw error;
    }
  },
};

export const chatApi = {
  getChatUsers: async (): Promise<User[]> => {
    const response = await axiosInstance.get('/user/exchange-partners');

    return response.data;
  },
};
