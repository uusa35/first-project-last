import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Locale } from '@/types/index';
import { cartSlice } from './cartSlice';

const initialState: { isAuth: boolean, api_token: null | string; user:any} = {
  isAuth: false,
  api_token: '7118259ee8e3bc2dbdc0aec954cd6adbd703bc4ff5e8c07f014f8561ce3fa56f',
user:{}
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
    setUser: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        user: action.payload,
        // api_token:action.payload.api_token
      };
    },
    setToken:(state, action: PayloadAction<any>) => {
      return {
        ...state,
        api_token: action.payload
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

export const { setAuth, resetAuth ,setUser} = authSlice.actions;
