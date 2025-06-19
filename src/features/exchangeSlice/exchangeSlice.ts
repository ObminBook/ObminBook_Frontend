// store/exchangeSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../../types/Book';
import { RootState } from '../../reduxStore/store';
import { logout } from '../authSlice/authSlice';
import { ExchangeRequest, ExchangeResponse } from '@/types/Exchange';
import { exchangeApi } from '@/api/booksApi';
import { toast } from 'react-toastify';
import { showErrorToast } from '@/components/customToast/toastUtils';
import axios from 'axios';

interface ExchangeState {
  myBook: Book | null;
  anotherUserBook: Book | null;
  anyCard: { text: string } | null;
  isAny: boolean;
  countAllExchanges: number;
  offerExchangeStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  myExchanges: ExchangeResponse[];
  recievedExchanges: ExchangeResponse[];
}

const initialState: ExchangeState = {
  countAllExchanges: 0,
  myBook: null,
  anyCard: null,
  anotherUserBook: null,
  isAny: false,

  myExchanges: [],
  recievedExchanges: [],
  offerExchangeStatus: 'idle',
};

export const getCountAllExchangesAsync = createAsyncThunk(
  'exchanges/getCountAll',
  async (_, thunkAPI) => {
    try {
      const data = await exchangeApi.getCountOfAllExchanges();

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const startExchangeAsync = createAsyncThunk(
  'exchange/startExchange',
  async (
    { initiatorBookId, recipientBookId, isAnyBookOffered }: ExchangeRequest,
    thunkAPI
  ) => {
    try {
      const data = await exchangeApi.offerExchange(
        initiatorBookId,
        recipientBookId,
        isAnyBookOffered
      );

      toast.success('Запит на обмін успішно надісланий');
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        return thunkAPI.rejectWithValue('Ви вже відправили запит на обмін цих книжок');
      }

      thunkAPI.rejectWithValue('Щось пішло не так');
    }
  }
);

export const getMyExchangesAsync = createAsyncThunk<ExchangeResponse[]>(
  'exchange/getMyExchanges',
  async (_, thunkAPI) => {
    try {
      const data = await exchangeApi.getMyExchanges();

      return data.content;
    } catch {
      showErrorToast('Не вдалося завантажити список обмінів');
      return thunkAPI.rejectWithValue('Не вдалося завантажити список обмінів');
    }
  }
);

export const getRecievedExchangesAsync = createAsyncThunk<ExchangeResponse[]>(
  'exchange/getRecievedExchanges',
  async (_, thunkAPI) => {
    try {
      const data = await exchangeApi.getRecievedExchanges();

      return data.content;
    } catch {
      showErrorToast('Не вдалося завантажити список отриманих обмінів');
      return thunkAPI.rejectWithValue('Не вдалося завантажити список отриманих обмінів');
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
    setAllExchanges(state, action: PayloadAction<ExchangeResponse[]>) {
      state.myExchanges = action.payload;
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
      .addCase(startExchangeAsync.rejected, (state, action) => {
        state.offerExchangeStatus = 'failed';
        showErrorToast(action.payload as string);
      })

      // GetMyExchanges
      .addCase(
        getMyExchangesAsync.fulfilled,
        (state, action: PayloadAction<ExchangeResponse[]>) => {
          state.myExchanges = action.payload;
        }
      )

      // GetRecievedExchanges
      .addCase(
        getRecievedExchangesAsync.fulfilled,
        (state, action: PayloadAction<ExchangeResponse[]>) => {
          state.recievedExchanges = action.payload;
        }
      )

      // GetAllExchanges
      .addCase(getCountAllExchangesAsync.fulfilled, (state, action) => {
        state.countAllExchanges = action.payload;
      }),
});

export const {
  setMyBook,
  removeMyBook,
  setAnotherUserBook,
  removeAnotherUserBook,
  setAnyCard,
  removeAnyCard,
  setAllExchanges,
} = exchangeSlice.actions;

export const select = {
  myBook: (state: RootState) => state.exchange.myBook,
  anyCard: (state: RootState) => state.exchange.anyCard,
  anotherUserBook: (state: RootState) => state.exchange.anotherUserBook,
  isAny: (state: RootState) => state.exchange.isAny,
  offerExchangeStatus: (state: RootState) => state.exchange.offerExchangeStatus,
  myExchanges: (state: RootState) => state.exchange.myExchanges,
  recievedExchanges: (state: RootState) => state.exchange.recievedExchanges,
  countAllExchanges: (state: RootState) => state.exchange.countAllExchanges,
};

export default exchangeSlice.reducer;
