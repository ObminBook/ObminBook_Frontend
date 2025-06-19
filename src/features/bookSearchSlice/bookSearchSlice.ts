import { booksApi } from '@/api/booksApi';
import { RootState } from '@/reduxStore/store';
import { Book, SearchBooksRequest, BookPage } from '@/types/Book';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface BookFilterState {
  books: Book[];
  booksLoadingState: 'idle' | 'pending' | 'succeeded' | 'failed';
  isFetchingNextPage: boolean;
  titleAndAuthor: string;
  categories: string[];
  condition: string[];
  exchangeType: string[];
  page: number;
  size: number;
  sort: 'title,asc' | 'title,desc' | 'id,desc';
  hasNext: boolean;
  totalElements: number;
}

const initialState: BookFilterState = {
  books: [],
  booksLoadingState: 'idle',
  isFetchingNextPage: false,
  titleAndAuthor: '',
  categories: [],
  condition: [],
  exchangeType: [],
  page: 0,
  size: 9,
  sort: 'id,desc',
  hasNext: false,
  totalElements: 0,
};

export const searchBooks = createAsyncThunk<BookPage, SearchBooksRequest>(
  'bookFilter/search',
  async (filterParams, thunkAPI) => {
    try {
      const data = await booksApi.searchBooks(filterParams);

      if (!data) {
        throw new Error('Empty response');
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const bookSearchSlice = createSlice({
  name: 'bookFilter',
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setNextPage(state) {
      state.page = state.page + 1;
    },
    setCondition(state, action) {
      if (state.condition.includes(action.payload)) {
        state.condition = state.condition.filter((el) => el !== action.payload);
      } else {
        state.condition.push(action.payload);
      }
    },
    setCategory(state, action) {
      state.categories = action.payload;
    },
    setType(state, action) {
      if (state.exchangeType.includes(action.payload)) {
        state.exchangeType = state.exchangeType.filter((el) => el !== action.payload);
      } else {
        state.exchangeType.push(action.payload);
      }
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    clearBooks(state) {
      state.books = [];
      state.page = 0;
      state.hasNext = false;
      state.totalElements = 0;
      state.booksLoadingState = 'idle';
    },
    clearSearchOption(state) {
      state.titleAndAuthor = '';
      state.condition = [];
      state.exchangeType = [];
      state.categories = [];
    },
    setTitleAndAuthor(state, action) {
      state.titleAndAuthor = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchBooks.pending, (state) => {
        if (state.page === 0) {
          state.booksLoadingState = 'pending';
        } else {
          state.isFetchingNextPage = true;
        }
      })
      .addCase(searchBooks.fulfilled, (state, action) => {
        if (state.page === 0) {
          // Перше завантаження
          state.books = action.payload.content;
          state.booksLoadingState = 'succeeded';
        } else {
          // Додаткове завантаження - додаємо до списку
          state.books.push(...action.payload.content);
          state.isFetchingNextPage = false;
        }
        state.hasNext = action.payload.hasNext;
        state.totalElements = action.payload.totalElements;
      })
      .addCase(searchBooks.rejected, (state) => {
        if (state.page === 0) {
          state.booksLoadingState = 'failed';
        } else {
          state.isFetchingNextPage = false;
        }
      });
  },
});

export const select = {
  books: (state: RootState) => state.bookFilters.books,
  booksLoadingState: (state: RootState) => state.bookFilters.booksLoadingState,
  titleAndAuthor: (state: RootState) => state.bookFilters.titleAndAuthor,
  categories: (state: RootState) => state.bookFilters.categories,
  condition: (state: RootState) => state.bookFilters.condition,
  exchangeType: (state: RootState) => state.bookFilters.exchangeType,
  page: (state: RootState) => state.bookFilters.page,
  size: (state: RootState) => state.bookFilters.size,
  sort: (state: RootState) => state.bookFilters.sort,
  hasNext: (state: RootState) => state.bookFilters.hasNext,
  totalElements: (state: RootState) => state.bookFilters.totalElements,
  isFetchingNextPage: (state: RootState) => state.bookFilters.isFetchingNextPage,
};

export const {
  setNextPage,
  setPage,
  setTitleAndAuthor,
  clearBooks,
  setCondition,
  setType,
  setCategory,
  setSort,
  clearSearchOption,
} = bookSearchSlice.actions;
export default bookSearchSlice.reducer;
