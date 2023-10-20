import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Locale } from '@/types/index';
import { cartSlice } from './cartSlice';

const initialState: { isAuth: boolean, api_token: null | string; } = {
  isAuth: false,
  api_token: '7118259ee8e3bc2dbdc0aec954cd6adbd703bc4ff5e8c07f014f8561ce3fa56f'

};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isAuth: true
      };
    },
    resetAuth: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isAuth: false
      };
    },
  },
});

export const { setAuth, resetAuth } = authSlice.actions;
