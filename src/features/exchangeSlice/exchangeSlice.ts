// store/exchangeSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../../types/Book';
import { RootState } from '../../reduxStore/store';
import { logout } from '../authSlice/authSlice';
import { ExchangeRequest } from '@/types/Exchange';
import { exchangeApi } from '@/api/booksApi';
import { toast } from 'react-toastify';

interface ExchangeState {
  myBook: Book | null;
  anotherUserBook: Book | null;
  anyCard: { text: string } | null;
  isAny: boolean;

  offerExchangeStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ExchangeState = {
  myBook: null,
  anyCard: null,
  anotherUserBook: null,
  isAny: false,

  offerExchangeStatus: 'idle',
};

export const startExchangeAsync = createAsyncThunk(
  'exchange/startExchange',
  async (
    { initiatorBookId, recipientBookId, isAnyBookOffered }: ExchangeRequest,
    thunkAPI
  ) => {
    try {
      const response = await exchangeApi.offerExchange(
        initiatorBookId,
        recipientBookId,
        isAnyBookOffered
      );

      toast.success('Запит на обмін успішно надісланий');
      return response;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

const exchangeSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {
    setMyBook(state, action: PayloadAction<Book>) {
      state.myBook = action.payload;
      state.anyCard = null;
      state.isAny = false;
    },
    setAnyCard(state, action: PayloadAction<ExchangeState['anyCard']>) {
      state.anyCard = action.payload;
      state.myBook = null;
      state.isAny = true;
    },
    setAnotherUserBook(state, action: PayloadAction<Book>) {
      state.anotherUserBook = action.payload;
    },
    removeMyBook(state) {
      state.myBook = null;
      state.anyCard = null;
      state.isAny = false;
    },
    removeAnotherUserBook(state) {
      state.anotherUserBook = null;
    },
    removeAnyCard(state) {
      state.anyCard = null;
      state.isAny = false;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(logout.fulfilled, () => initialState)

      .addCase(startExchangeAsync.fulfilled, (state) => {
        state.myBook = null;
        state.anotherUserBook = null;
        state.isAny = false;
        state.anyCard = null;
        state.offerExchangeStatus = 'succeeded';
      })
      .addCase(startExchangeAsync.pending, (state) => {
        state.offerExchangeStatus = 'loading';
      })
      .addCase(startExchangeAsync.rejected, (state) => {
        state.offerExchangeStatus = 'failed';
      }),
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
  offerExchangeStatus: (state: RootState) => state.exchange.offerExchangeStatus,
};

export default exchangeSlice.reducer;
