import { chatApi } from '@/api/booksApi';
import { showErrorToast } from '@/components/customToast/toastUtils';
import { User } from '@/types/User';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface ChatState {
  selectedUser: User | null;
  listOfUsers: User[];
}

const initialState: ChatState = {
  selectedUser: null,
  listOfUsers: [],
};

export const getExchangePartnersAsync = createAsyncThunk(
  'chat/getExchangePartners',
  async (_, { rejectWithValue }) => {
    try {
      const data = await chatApi.getChatUsers();

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || 'Щось пішло не так');
      }

      return rejectWithValue('Не вдалося завантажити юзерів');
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedUser(state, action: PayloadAction<User | null>) {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExchangePartnersAsync.fulfilled, (state, action) => {
        state.listOfUsers = action.payload;
      })
      .addCase(getExchangePartnersAsync.rejected, (state, action) => {
        if (typeof action.payload === 'string') {
          showErrorToast(action.payload);
        } else {
          showErrorToast('Щось пішло не так');
        }
      });
  },
});

export const { setSelectedUser } = chatSlice.actions;
export default chatSlice.reducer;
