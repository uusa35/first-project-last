import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Locale } from '@/types/index';
import { cartSlice } from './cartSlice';
import { isUndefined } from 'lodash';
import { RootState } from '../store';




const initialState: { isAuth: boolean, user:any} = {
  isAuth: false,
user:{}
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        user: action.payload,
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

export const {  resetAuth ,setUser} = authSlice.actions;
export const isAuthenticated = (state:RootState) =>
  !isUndefined(state.user?.api_token)
