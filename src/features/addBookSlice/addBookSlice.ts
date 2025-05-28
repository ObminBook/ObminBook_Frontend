import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '@/api/axiosInstance';
import { AddBookRequest, AddBookResponce } from '@/types/Book';
import { getMyBooks } from '../manageBookSlice/manageBookSlice';

interface AddBookState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: AddBookState = {
  loading: false,
  error: null,
  success: false,
};

export const addBook = createAsyncThunk<AddBookResponce, AddBookRequest>(
  'books/addBook',
  async (bookData, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/books', bookData);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to add book'
      );
    }
  }
);

const addBookSlice = createSlice({
  name: 'addBook',
  initialState,
  reducers: {
    resetAddBookState(state) {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBook.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addBook.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add book';
      });
  },
});

export const { resetAddBookState } = addBookSlice.actions;

export default addBookSlice.reducer;
