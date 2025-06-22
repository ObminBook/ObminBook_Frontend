import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import {
  loginRequest,
  fetchUserRequest,
  registerRequest,
  verificationRequest,
  userLogout,
} from '../../api/authApi';
import { RootState } from '@/reduxStore/store';
import axios, { AxiosError } from 'axios';
import { showErrorToast } from '@/components/customToast/toastUtils';

interface AuthError {
  field?: string;
  message: string;
}

interface AuthState {
  user: User | null;
  loginStatus: 'idle' | 'loading' | 'authenticated' | 'unauthenticated';
  logoutStatus: 'idle' | 'loading';
  registerStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  verificationStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: AuthError | null;
  isVerificationRequired: boolean;
  isCodeResent: boolean;
}

const initialState: AuthState = {
  user: null,
  loginStatus: 'idle',
  registerStatus: 'idle',
  verificationStatus: 'idle',
  logoutStatus: 'idle',
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

export const oauth2Login = createAsyncThunk<User, void, { rejectValue: AuthError }>(
  'auth/oauth2Login',
  async (_, thunkAPI) => {
    try {
      // Даємо час бекенду встановити cookies (як було)
      await new Promise((resolve) => setTimeout(resolve, 20000));

      // Отримуємо дані користувача
      const userResponse = await fetchUserRequest();

      return userResponse.data;
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;

      if (error.response?.status === 409) {
        return thunkAPI.rejectWithValue({
          field: 'email',
          message: 'Користувач з такою поштою вже існує',
        });
      }

      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || 'OAuth2 авторизація не вдалася',
      });
    }
  }
);

// Async Thunks
export const login = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: AuthError }
>('auth/login', async ({ email, password }, thunkAPI) => {
  try {
    const loginResponse = await loginRequest(email, password);
    const token = loginResponse.data;
    if (token) {
      localStorage.setItem('accessToken', token);
    }
    const userResponse = await fetchUserRequest();
    return userResponse.data;
  } catch (err) {
    console.log(err);

    if (axios.isAxiosError(err) && err.response?.status === 401) {
      return thunkAPI.rejectWithValue({
        field: 'login',
        message: 'Введений неправильний email чи пароль',
      });
    }
    return thunkAPI.rejectWithValue({ message: 'Login failed' });
  }
});

export const register = createAsyncThunk<
  void,
  RegisterPayload,
  { rejectValue: AuthError }
>('auth/register', async (payload, thunkAPI) => {
  try {
    await registerRequest(payload);
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    if (error.response?.status === 409) {
      return thunkAPI.rejectWithValue({
        field: 'email',
        message: 'Користувач з такою поштою вже існує',
      });
    }
    return thunkAPI.rejectWithValue({ message: 'Щось пішло не так' });
  }
});

export const fetchUser = createAsyncThunk<User, void, { rejectValue: AuthError }>(
  'auth/fetchUser',
  async (_, thunkAPI) => {
    const token = localStorage.getItem('accessToken');
    if (!token) return thunkAPI.rejectWithValue({ message: 'No token' });

    try {
      const response = await fetchUserRequest();
      return response.data;
    } catch {
      localStorage.removeItem('accessToken');
      return thunkAPI.rejectWithValue({ message: 'Invalid token' });
    }
  }
);

export const verification = createAsyncThunk<
  void,
  { email: string; code: string },
  { rejectValue: AuthError }
>('auth/verification', async ({ email, code }, thunkAPI) => {
  try {
    await verificationRequest(email, code);
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    if (error.response?.data?.message) {
      return thunkAPI.rejectWithValue({ message: error.response.data.message });
    }
    return thunkAPI.rejectWithValue({ message: 'Щось пішло не так' });
  }
});

export const checkAuth = createAsyncThunk<User, void, { rejectValue: AuthError }>(
  'auth/me',
  async (_, thunkAPI) => {
    const token = localStorage.getItem('accessToken');
    if (!token) return thunkAPI.rejectWithValue({ message: 'No token found' });

    try {
      const response = await fetchUserRequest();
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 401) {
        localStorage.removeItem('accessToken');
      }
      return thunkAPI.rejectWithValue({ message: 'Token invalid or missing' });
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await userLogout();

    localStorage.removeItem('accessToken');

    await new Promise((resolve) => setTimeout(resolve, 500));

    return true;
  } catch {
    return thunkAPI.rejectWithValue('Щось пішло не так');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setStateError(state, action: PayloadAction<AuthError | null>) {
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
      // LOGIN
      .addCase(login.pending, (state) => {
        state.loginStatus = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loginStatus = 'authenticated';
      })
      .addCase(login.rejected, (state, action) => {
        state.loginStatus = 'unauthenticated';
        state.error = action.payload ?? { message: 'Невідома помилка' };
      })

      // REGISTER
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
        state.error = action.payload ?? { message: 'Невідома помилка' };
      })

      // VERIFICATION
      .addCase(verification.pending, (state) => {
        state.verificationStatus = 'loading';
        state.error = null;
      })
      .addCase(verification.fulfilled, (state) => {
        state.verificationStatus = 'succeeded';
      })
      .addCase(verification.rejected, (state, action) => {
        state.verificationStatus = 'failed';
        state.error = action.payload ?? { message: 'Невідома помилка' };
      })

      // FETCH USER
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      // CHECK AUTH
      .addCase(checkAuth.pending, (state) => {
        state.loginStatus = 'loading';
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loginStatus = 'authenticated';
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.user = null;
        state.loginStatus = 'unauthenticated';
        state.error = action.payload ?? { message: 'Token invalid or missing' };
      })

      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loginStatus = 'unauthenticated';
        state.registerStatus = 'idle';
        state.verificationStatus = 'idle';
        state.error = null;
        state.isVerificationRequired = false;
        state.isCodeResent = false;
        state.logoutStatus = 'idle';
      })
      .addCase(logout.rejected, (state, action) => {
        state.logoutStatus = 'idle';
        showErrorToast(action.payload as string);
      })
      .addCase(logout.pending, (state) => {
        state.logoutStatus = 'loading';
      })

      .addCase(oauth2Login.pending, (state) => {
        state.loginStatus = 'loading';
        state.error = null;
      })
      .addCase(oauth2Login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loginStatus = 'authenticated';
      })
      .addCase(oauth2Login.rejected, (state, action) => {
        state.loginStatus = 'unauthenticated';
        state.error = action.payload ?? { message: 'OAuth2 авторизація не вдалася' };
      });
  },
});

export const select = {
  user: (state: RootState) => state.auth.user,
  loginStatus: (state: RootState) => state.auth.loginStatus,
  logoutStatus: (state: RootState) => state.auth.logoutStatus,
  registerStatus: (state: RootState) => state.auth.registerStatus,
  verificationStatus: (state: RootState) => state.auth.verificationStatus,
  isVerificationRequired: (state: RootState) => state.auth.isVerificationRequired,
  error: (state: RootState) => state.auth.error,
  isCodeResent: (state: RootState) => state.auth.isCodeResent,
};

export const { setStateError, setDefault, setCodeResent, setVerificationRequired } =
  authSlice.actions;

export default authSlice.reducer;
