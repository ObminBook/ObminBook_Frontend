// features/authSlice/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import {
  loginRequest,
  fetchUserRequest,
  registerRequest,
  verificationRequest,
} from '../../api/authApi';
import { RootState } from '@/reduxStore/store';

interface AuthState {
  user: User | null;
  loginStatus: 'idle' | 'loading' | 'authenticated' | 'unauthenticated';
  registerStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  verificationStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: { field: string; message: string } | null;
  isVerificationRequired: boolean;
  isCodeResent: boolean;
}

const initialState: AuthState = {
  user: null,
  loginStatus: 'idle',
  registerStatus: 'idle',
  verificationStatus: 'idle',
  error: null,
  isVerificationRequired: false,
  isCodeResent: false,
};

type RegisterPayload = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
};

// Async Thunks
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const loginResponse = await loginRequest(email, password);
      const token = loginResponse.data;
      if (token) {
        localStorage.setItem('accessToken', token);
      }
      const userResponse = await fetchUserRequest();
      return userResponse.data;
    } catch (err) {
      console.error('Login error:', err);
      return thunkAPI.rejectWithValue('Login failed');
    }
  }
);

export const register = createAsyncThunk<
  void,
  RegisterPayload,
  {
    rejectValue: { field?: string; message: string };
  }
>(
  'auth/register',
  async ({ email, password, confirmPassword, firstName, lastName }, thunkAPI) => {
    try {
      await registerRequest({
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
      });
    } catch (err: any) {
      if (err.response?.status === 409) {
        return thunkAPI.rejectWithValue({
          field: 'email',
          message: 'Користувач із такою поштою вже існує',
        });
      }
      return thunkAPI.rejectWithValue({ message: 'Щось пішло не так' });
    }
  }
);

export const fetchUser = createAsyncThunk('auth/fetchUser', async (_, thunkAPI) => {
  const token = localStorage.getItem('accessToken');
  if (!token) return thunkAPI.rejectWithValue('No token');

  try {
    const response = await fetchUserRequest();
    return response.data;
  } catch {
    localStorage.removeItem('accessToken');
    return thunkAPI.rejectWithValue('Invalid token');
  }
});

export const verification = createAsyncThunk(
  'auth/verification',
  async ({ email, code }: { email: string; code: string }, thunkAPI) => {
    try {
      await verificationRequest(email, code);
    } catch (err: any) {
      if (err.response) {
        const errorData = err.response.data;
        return thunkAPI.rejectWithValue(errorData);
      }
      return thunkAPI.rejectWithValue('Щось пішло не так');
    }
  }
);

export const checkAuth = createAsyncThunk('auth/me', async (_, thunkAPI) => {
  const token = localStorage.getItem('accessToken');
  if (!token) return thunkAPI.rejectWithValue('No token found');

  try {
    const response = await fetchUserRequest();
    return response.data;
  } catch (err: any) {
    if (err.response?.status === 401) {
      localStorage.removeItem('accessToken');
    }
    return thunkAPI.rejectWithValue('Invalid token');
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('accessToken');
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setStateError(
      state,
      action: PayloadAction<{ field: string; message: string } | null>
    ) {
      state.error = action.payload;
    },
    setVerificationRequired(state, action: PayloadAction<boolean>) {
      state.isVerificationRequired = action.payload;
    },
    setDefault(state) {
      state.error = null;
      state.isVerificationRequired = false;
      state.registerStatus = 'idle';
      state.verificationStatus = 'idle';
      state.isCodeResent = false;
    },
    setCodeResent(state, action: PayloadAction<boolean>) {
      state.isCodeResent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loginStatus = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.loginStatus = 'authenticated';
      })
      .addCase(login.rejected, (state, action) => {
        state.loginStatus = 'unauthenticated';
        state.error = action.payload as any;
      })
      .addCase(register.pending, (state) => {
        state.registerStatus = 'loading';
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.registerStatus = 'succeeded';
        state.isVerificationRequired = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.registerStatus = 'failed';
        state.error = action.payload;
      })
      .addCase(verification.pending, (state) => {
        state.verificationStatus = 'loading';
        state.error = null;
      })
      .addCase(verification.fulfilled, (state) => {
        state.verificationStatus = 'succeeded';
      })
      .addCase(verification.rejected, (state, action) => {
        state.verificationStatus = 'failed';
        state.error = action.payload as any;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      })
      .addCase(checkAuth.pending, (state) => {
        state.loginStatus = 'loading';
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.loginStatus = 'authenticated';
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = null;
        state.loginStatus = 'unauthenticated';
        state.error = { field: '', message: 'Token invalid or missing' };
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loginStatus = 'unauthenticated';
        state.registerStatus = 'idle';
        state.verificationStatus = 'idle';
        state.error = null;
        state.isVerificationRequired = false;
        state.isCodeResent = false;
      });
  },
});

export const select = {
  user: (state: RootState) => state.auth.user,
  loginStatus: (state: RootState) => state.auth.loginStatus,
  registerStatus: (state: RootState) => state.auth.registerStatus,
  verificationStatus: (state: RootState) => state.auth.verificationStatus,
  isVerificationRequired: (state: RootState) => state.auth.isVerificationRequired,
  error: (state: RootState) => state.auth.error,
  isCodeResent: (state: RootState) => state.auth.isCodeResent,
};

export const { setStateError, setDefault, setCodeResent, setVerificationRequired } =
  authSlice.actions;

export default authSlice.reducer;
