import { booksApi } from '@/api/booksApi';
import { showSuccessToast } from '@/components/customToast/toastUtils';
import { RootState } from '@/reduxStore/store';
import { Book, BookPage, SavedBookItem } from '@/types/Book';
import { TargetUser } from '@/types/User';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ManageBooksState {
  targetUser: TargetUser | null;
  targetUserStatus: 'idle' | 'pending' | 'succeeded' | 'failed';

  myBooks: Book[];
  fetchMyStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
  myBooksPageNumber: number;
  myBooksPageSize: number;
  myBooksTotalElements: number;

  savedBooks: SavedBookItem[];
  fetchSavedStatus: 'idle' | 'pending' | 'succeeded' | 'failed';

  error: string | null;
}

const initialState: ManageBooksState = {
  targetUser: null,
  targetUserStatus: 'idle',

  savedBooks: [],
  fetchSavedStatus: 'idle',

  myBooks: [],
  myBooksPageNumber: 0,
  myBooksPageSize: 9,
  myBooksTotalElements: 0,
  fetchMyStatus: 'idle',

  error: null,
};

export const getMyBooks = createAsyncThunk<
  BookPage,
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

export const deleteMyBook = createAsyncThunk<
  { bookId: string },
  number,
  { state: RootState; rejectValue: string }
>('manageBooks/deleteMyBook', async (bookId, thunkApi) => {
  try {
    const response = await booksApi.deleteUserBook(bookId);
    if (response?.status === 200) {
      return { bookId };
    }
    return thunkApi.rejectWithValue('Не вдалося видалити книгу');
  } catch (error) {
    return thunkApi.rejectWithValue(String(error));
  }
});

export const getTargetUser = createAsyncThunk(
  'manageBooks/getTargetUserBooks',
  async (userId: string, thunkApi) => {
    try {
      const response = await booksApi.fetchTargetUser(userId);
      if (!response) {
        return thunkApi.rejectWithValue('No data returned');
      }
      console.log(response);

      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(String(error));
    }
  }
);

export const getSavedBooks = createAsyncThunk<
  { content: SavedBookItem[] },
  void,
  { rejectValue: string }
>('manageBooks/getSavedBooks', async (_, thunkApi) => {
  try {
    const response = await booksApi.getSavedBooks();
    if (!response) {
      return thunkApi.rejectWithValue('No data returned');
    }
    return response;
  } catch (error) {
    return thunkApi.rejectWithValue(String(error));
  }
});

export const removeFromSavedBooks = createAsyncThunk<
  { bookId: string },
  number,
  { rejectValue: string }
>('manageBooks/removeFromSavedBooks', async (bookId, thunkApi) => {
  try {
    const response = await booksApi.removeFromSaved(bookId);
    if (response?.status === 204) {
      showSuccessToast('Книга видалена зі збережених');
      return { bookId };
    }
    return thunkApi.rejectWithValue('Не вдалося видалити книгу з обраного');
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
    clearTargetUser(state) {
      state.targetUser = null;
      state.targetUserStatus = 'idle';
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
      })

      // Збережені книжки
      .addCase(getSavedBooks.pending, (state) => {
        state.fetchSavedStatus = 'pending';
      })
      .addCase(getSavedBooks.fulfilled, (state, action) => {
        state.savedBooks = action.payload.content;
        state.fetchSavedStatus = 'succeeded';
      })
      .addCase(getSavedBooks.rejected, (state, action) => {
        state.fetchSavedStatus = 'failed';
        state.error = action.payload ?? 'Помилка при завантаженні збережених книг';
      })

      // Видалення збереженої книжки
      .addCase(removeFromSavedBooks.fulfilled, (state, action) => {
        const { bookId } = action.payload;
        state.savedBooks = state.savedBooks.filter((book) => book.book.id !== bookId);
      })
      .addCase(removeFromSavedBooks.rejected, (state, action) => {
        state.error = action.payload ?? 'Помилка при видаленні збереженої книги';
      })

      // Target user
      .addCase(getTargetUser.pending, (state) => {
        state.targetUserStatus = 'pending';
      })
      .addCase(getTargetUser.fulfilled, (state, action) => {
        state.targetUser = action.payload;
        state.targetUserStatus = 'succeeded';
      })

      // DeleteMyBook
      .addCase(deleteMyBook.pending, (state) => {
        state.fetchMyStatus = 'pending';
      })
      .addCase(deleteMyBook.fulfilled, (state, action) => {
        const { bookId } = action.payload;
        state.myBooks = state.myBooks.filter((book) => book.id !== bookId);
        state.myBooksTotalElements -= 1;
        state.fetchMyStatus = 'succeeded';
      })
      .addCase(deleteMyBook.rejected, (state, action) => {
        state.fetchMyStatus = 'failed';
        state.error = action.payload ?? 'Помилка при видаленні книги';
      });
  },
});

export const { setMyBooksPageNumber, setMyBooksPageSize, resetMyBooks, clearTargetUser } =
  manageBooksSlice.actions;

export const select = {
  myBooks: (state: RootState) => state.manageBooks.myBooks,
  myBooksPageNumber: (state: RootState) => state.manageBooks.myBooksPageNumber,
  myBooksPageSize: (state: RootState) => state.manageBooks.myBooksPageSize,
  myBooksTotalElements: (state: RootState) => state.manageBooks.myBooksTotalElements,
  fetchMyStatus: (state: RootState) => state.manageBooks.fetchMyStatus,
  targetUser: (state: RootState) => state.manageBooks.targetUser,
  targetUserStatus: (state: RootState) => state.manageBooks.targetUserStatus,
  error: (state: RootState) => state.manageBooks.error,
  hasMoreMyBooks: (state: RootState) => {
    const { myBooks, myBooksTotalElements } = state.manageBooks;
    return myBooks.length < myBooksTotalElements;
  },
  savedBooks: (state: RootState) => state.manageBooks.savedBooks,
};

export default manageBooksSlice.reducer;
