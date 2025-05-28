// store.ts
import { configureStore } from '@reduxjs/toolkit';
import exchangeReducer from '../features/exchangeSlice/exchangeSlice';
import authReducer from '../features/authSlice/authSlice';
import manageBooksReducer from '../features/manageBookSlice/manageBookSlice';
import addBookReducer from '../features/addBookSlice/addBookSlice';
import bookSearchReducer from '../features/bookSearchSlice/bookSearchSlice';

export const store = configureStore({
  reducer: {
    exchange: exchangeReducer,
    auth: authReducer,
    addBook: addBookReducer,
    manageBooks: manageBooksReducer,
    bookFilters: bookSearchReducer,
  },
});

export const dispatch = store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
