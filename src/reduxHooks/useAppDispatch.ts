// src/hooks/useAppDispatch.ts
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../reduxStore/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
