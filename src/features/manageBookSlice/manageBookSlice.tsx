import { booksApi } from '@/api/booksApi';
import { RootState } from '@/reduxStore/store';
import { Book } from '@/types/Book';
import { BookSearchResponse } from '@/types/BookSearchResponse';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ManageBooksState {
  allBooks: Book[];
  allBooksPageNumber: number;
  allBooksPageSize: number;
  allBooksTotalElements: number; // Додано для кращого контролю пагінації
  fetchAllStatus: 'idle' | 'pending' | 'succeeded' | 'failed';

  myBooks: Book[];
  myBooksPageNumber: number;
  myBooksPageSize: number;
  myBooksTotalElements: number;
  fetchMyStatus: 'idle' | 'pending' | 'succeeded' | 'failed';

  error: string | null;
}

const initialState: ManageBooksState = {
  allBooks: [],
  allBooksPageNumber: 0,
  allBooksPageSize: 9,
  allBooksTotalElements: 0,
  fetchAllStatus: 'idle',

  myBooks: [],
  myBooksPageNumber: 0,
  myBooksPageSize: 9,
  myBooksTotalElements: 0,
  fetchMyStatus: 'idle',

  error: null,
};

export const getAllBooks = createAsyncThunk<
  BookSearchResponse,
  void,
  { state: RootState; rejectValue: string }
>('manageBooks/getAllBooks', async (_, thunkApi) => {
  const state = thunkApi.getState();
  const { allBooksPageNumber, allBooksPageSize } = state.manageBooks;

  // Отримуємо поточні фільтри з URL (якщо доступні)
  // Альтернативно, можете передавати фільтри як параметр thunk
  try {
    const response = await booksApi.fetchAllBooks(allBooksPageNumber, allBooksPageSize);
    if (!response) {
      return thunkApi.rejectWithValue('No data returned');
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(String(error));
  }
});

export const getMyBooks = createAsyncThunk<
  BookSearchResponse,
  void,
  { state: RootState; rejectValue: string }
>('manageBooks/getMyBooks', async (_, thunkApi) => {
  const { myBooksPageNumber, myBooksPageSize } = thunkApi.getState().manageBooks;
  try {
    const response = await booksApi.fetchMy(myBooksPageNumber, myBooksPageSize);
    if (!response) {
      return thunkApi.rejectWithValue('No data returned');
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(String(error));
  }
});

const manageBooksSlice = createSlice({
  name: 'manageBooks',
  initialState,
  reducers: {
    setAllBooksPageNumber(state, action: PayloadAction<number>) {
      state.allBooksPageNumber = action.payload;
    },
    setAllBooksPageSize(state, action: PayloadAction<number>) {
      state.allBooksPageSize = action.payload;
      // При зміні розміру сторінки скидаємо до першої сторінки
      state.allBooksPageNumber = 0;
      state.allBooks = [];
    },
    setMyBooksPageNumber(state, action: PayloadAction<number>) {
      state.myBooksPageNumber = action.payload;
    },
    setMyBooksPageSize(state, action: PayloadAction<number>) {
      state.myBooksPageSize = action.payload;
      state.myBooksPageNumber = 0;
      state.myBooks = [];
    },
    // Додаємо екшн для скидання книг при зміні фільтрів
    resetAllBooks(state) {
      state.allBooks = [];
      state.allBooksPageNumber = 0;
      state.allBooksTotalElements = 0;
    },
    resetMyBooks(state) {
      state.myBooks = [];
      state.myBooksPageNumber = 0;
      state.myBooksTotalElements = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // All books
      .addCase(getAllBooks.pending, (state) => {
        state.fetchAllStatus = 'pending';
        state.error = null;
      })
      .addCase(getAllBooks.rejected, (state, action) => {
        state.fetchAllStatus = 'failed';
        state.error = action.payload ?? 'Невідома помилка';
      })
      .addCase(getAllBooks.fulfilled, (state, action) => {
        state.fetchAllStatus = 'succeeded';
        state.allBooksTotalElements = action.payload.totalElements || 0;

        if (state.allBooksPageNumber === 0) {
          // Перша сторінка - замінюємо
          state.allBooks = action.payload.content;
        } else {
          // Наступні сторінки - додаємо тільки унікальні книги
          const newBooks = action.payload.content;
          const existingIds = new Set(state.allBooks.map((book) => book.id));
          const uniqueNewBooks = newBooks.filter((book) => !existingIds.has(book.id));
          state.allBooks = [...state.allBooks, ...uniqueNewBooks];
        }
      })

      // My books
      .addCase(getMyBooks.pending, (state) => {
        state.fetchMyStatus = 'pending';
        state.error = null;
      })
      .addCase(getMyBooks.rejected, (state, action) => {
        state.fetchMyStatus = 'failed';
        state.error = action.payload ?? 'Невідома помилка';
      })
      .addCase(getMyBooks.fulfilled, (state, action) => {
        state.fetchMyStatus = 'succeeded';
        state.myBooksTotalElements = action.payload.totalElements || 0;

        if (state.myBooksPageNumber === 0) {
          state.myBooks = action.payload.content;
        } else {
          // Додаємо тільки унікальні книги
          const newBooks = action.payload.content;
          const existingIds = new Set(state.myBooks.map((book) => book.id));
          const uniqueNewBooks = newBooks.filter((book) => !existingIds.has(book.id));
          state.myBooks = [...state.myBooks, ...uniqueNewBooks];
        }
      });
  },
});

export const {
  setAllBooksPageNumber,
  setAllBooksPageSize,
  setMyBooksPageNumber,
  setMyBooksPageSize,
  resetAllBooks,
  resetMyBooks,
} = manageBooksSlice.actions;

export const select = {
  allBooks: (state: RootState) => state.manageBooks.allBooks,
  allBooksPageNumber: (state: RootState) => state.manageBooks.allBooksPageNumber,
  allBooksPageSize: (state: RootState) => state.manageBooks.allBooksPageSize,
  allBooksTotalElements: (state: RootState) => state.manageBooks.allBooksTotalElements,
  fetchAllStatus: (state: RootState) => state.manageBooks.fetchAllStatus,

  myBooks: (state: RootState) => state.manageBooks.myBooks,
  myBooksPageNumber: (state: RootState) => state.manageBooks.myBooksPageNumber,
  myBooksPageSize: (state: RootState) => state.manageBooks.myBooksPageSize,
  myBooksTotalElements: (state: RootState) => state.manageBooks.myBooksTotalElements,
  fetchMyStatus: (state: RootState) => state.manageBooks.fetchMyStatus,

  error: (state: RootState) => state.manageBooks.error,

  // Додаємо селектор для перевірки чи є ще сторінки
  hasMoreAllBooks: (state: RootState) => {
    const { allBooks, allBooksTotalElements } = state.manageBooks;
    return allBooks.length < allBooksTotalElements;
  },
  hasMoreMyBooks: (state: RootState) => {
    const { myBooks, myBooksTotalElements } = state.manageBooks;
    return myBooks.length < myBooksTotalElements;
  },
};

export default manageBooksSlice.reducer;
