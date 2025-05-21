// store/exchangeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../../types/Book';
import { AnyBook } from '../../types/AnyBook';
import { RootState } from '../../reduxStore/store';
import { logout } from '../authSlice/authSlice';

interface ExchangeState {
  myBook: Book | null;
  anotherUserBook: Book | null;
  anyCard: AnyBook | null;
  isAny: boolean; // Add this line to track the "any" state
}

const initialState: ExchangeState = {
  myBook: null,
  anyCard: null,
  anotherUserBook: null,
  isAny: false, // Set the initial state of "isAny"
};

const exchangeSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {
    setMyBook(state, action: PayloadAction<Book>) {
      state.myBook = action.payload;
      state.anyCard = null;
      state.isAny = false; // Reset the "any" state when a specific book is selected
    },
    setAnyCard(state, action: PayloadAction<AnyBook>) {
      state.anyCard = action.payload;
      state.myBook = null;
      state.isAny = true; // Set "isAny" to true when "any" book is selected
    },
    setAnotherUserBook(state, action: PayloadAction<Book>) {
      state.anotherUserBook = action.payload;
    },
    removeMyBook(state) {
      state.myBook = null;
      state.anyCard = null;
      state.isAny = false; // Reset "isAny" when removing a book
    },
    removeAnotherUserBook(state) {
      state.anotherUserBook = null;
    },
    removeAnyCard(state) {
      state.anyCard = null;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(logout.fulfilled, () => initialState),
});

export const {
  setMyBook,
  removeMyBook,
  setAnotherUserBook,
  removeAnotherUserBook,
  setAnyCard,
  removeAnyCard,
} = exchangeSlice.actions;

export const select = {
  myBook: (state: RootState) => state.exchange.myBook,
  anyCard: (state: RootState) => state.exchange.anyCard,
  anotherUserBook: (state: RootState) => state.exchange.anotherUserBook,
  isAny: (state: RootState) => state.exchange.isAny,
};

export default exchangeSlice.reducer;
