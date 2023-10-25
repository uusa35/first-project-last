import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isUndefined } from 'lodash';
import { RootState } from '../store';


const initialState: { isAuth: boolean, api_token: null | string; user: any } = {
  isAuth: false,
  // api_token: '7118259ee8e3bc2dbdc0aec954cd6adbd703bc4ff5e8c07f014f8561ce3fa56f',
  api_token: process.env.NODE_ENV === "production" ? '01989686817' : '7118259ee8e3bc2dbdc0aec954cd6adbd703bc4ff5e8c07f014f8561ce3fa56f',
  user: {}
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
    setToken: (state, action: PayloadAction<any>) => {
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

export const { resetAuth, setUser } = authSlice.actions;
export const isAuthenticated = (state: RootState) =>
  !isUndefined(state.user?.api_token)

