import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Locale } from '@/types/index';
import { cartSlice } from './cartSlice';

const initialState: { isAuth: boolean, api_token: null | string; } = {
  isAuth: false,
  api_token: null

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
