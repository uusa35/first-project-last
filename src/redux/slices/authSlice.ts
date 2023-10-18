import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Locale } from '@/types/index';
import { cartSlice } from './cartSlice';

const initialState: { isAuth: boolean } = {
  isAuth: false

};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      return {
        isAuth: true
      };
    },
    resetAuth: (state, action: PayloadAction<boolean>) => {
      return {
        isAuth: false
      };
    },
  },
});

export const { setAuth, resetAuth } = authSlice.actions;
