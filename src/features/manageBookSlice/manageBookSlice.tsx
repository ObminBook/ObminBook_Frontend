import { booksApi } from '@/api/booksApi';
import { RootState } from '@/reduxStore/store';
import { Book, SearchBooksResponce } from '@/types/Book';
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

export const getMyBooks = createAsyncThunk<
  SearchBooksResponce,
  void,
  { state: RootState; rejectValue: string }
>('manageBooks/getMyBooks', async (_, thunkApi) => {
  const { myBooksPageNumber, myBooksPageSize } = thunkApi.getState().manageBooks;
  try {
    const response = await booksApi.fetchMy(myBooksPageNumber, myBooksPageSize);
    if (!response) {
      return thunkApi.rejectWithValue('No data returned');
    }
    console.log(response);

    return response;
  } catch (error) {
    return thunkApi.rejectWithValue(String(error));
  }
});

const manageBooksSlice = createSlice({
  name: 'manageBooks',
  initialState,
  reducers: {
    setMyBooksPageNumber(state, action: PayloadAction<number>) {
      state.myBooksPageNumber = action.payload;
    },
    setMyBooksPageSize(state, action: PayloadAction<number>) {
      state.myBooksPageSize = action.payload;
      state.myBooksPageNumber = 0;
      state.myBooks = [];
    },

    resetMyBooks(state) {
      state.myBooks = [];
      state.myBooksPageNumber = 0;
      state.myBooksTotalElements = 0;
    },
  },
  extraReducers: (builder) => {
    builder
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

export const { setMyBooksPageNumber, setMyBooksPageSize, resetMyBooks } =
  manageBooksSlice.actions;

export const select = {
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
