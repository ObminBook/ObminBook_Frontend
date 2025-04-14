import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  city: string;
  profilePicture: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    confirmPassword: string,
    firstName: string,
    lastName: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const API_URL = 'https://2b58-91-210-248-246.ngrok-free.app/books';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get<User>(`${API_URL}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUser(response.data))
        .catch(() => {
          localStorage.removeItem('token');
          setUser(null);
        });
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post<{ token: string }>(`${API_URL}/login`, {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        const userResponse = await axios.get<User>(`${API_URL}/me`, {
          headers: { Authorization: `Bearer ${response.data.token}` },
        });
        setUser(userResponse.data);
      } else {
        throw new Error('Token not received');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
          console.error('Invalid credentials');
        } else {
          console.error('Login failed', error.response?.data);
        }
      } else {
        console.error('An error occurred', error);
      }
    }
  };

  const register = async (
    email: string,
    password: string,
    confirmPassword: string,
    firstName: string,
    lastName: string
  ) => {
    try {
      const response = await axios.post<{ token: string }>(
        `${API_URL}/register`,
        {
          email,
          password,
          confirmPassword,
          firstName,
          lastName,
        }
      );

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        const userResponse = await axios.get<User>(`${API_URL}/me`, {
          headers: { Authorization: `Bearer ${response.data.token}` },
        });
        setUser(userResponse.data);
      } else {
        throw new Error('Token not received');
      }

      console.log('Registration successful', response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 400) {
            console.error('Invalid input data');
          } else if (error.response.status === 409) {
            console.error('User already exists');
          } else {
            console.error('Registration failed', error.response.data);
          }
        } else {
          console.error('Network error or server is unavailable');
        }
      } else {
        console.error('An unexpected error occurred', error);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
