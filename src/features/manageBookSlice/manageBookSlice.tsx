import { AddBookResponce } from '@/types/Book';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface ManageBooksState {
  userBooks: AddBookResponce[] | null;
}

const initialState: ManageBooksState = {
  userBooks: null,
};

export const getMyBooks = createAsyncThunk<AddBookResponce[]>();
