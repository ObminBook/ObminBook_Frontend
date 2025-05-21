// store.ts
import { configureStore } from '@reduxjs/toolkit';
import exchangeReducer from '../features/exchangeSlice/exchangeSlice';
import authReducer from '../features/authSlice/authSlice';

export const store = configureStore({
  reducer: {
    exchange: exchangeReducer,
    auth: authReducer,
  },
});

export const dispatch = store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
