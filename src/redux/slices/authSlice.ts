import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isUndefined } from 'lodash';
import { RootState } from '../store';
import { Auth } from '@/types/queries';


const initialState: Auth = {
  // isAuth: false,
  // api_token: '7118259ee8e3bc2dbdc0aec954cd6adbd703bc4ff5e8c07f014f8561ce3fa56f',
  // api_token: process.env.NODE_ENV === "production" ? '01989686817' : '7118259ee8e3bc2dbdc0aec954cd6adbd703bc4ff5e8c07f014f8561ce3fa56f',
  id: ``,
  name: ``,
  caption: ``,
  email: ``,
  image: ``,
  role: {},
  api_token: undefined,

};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Auth>) => action.payload,
    resetAuth: (state, action: PayloadAction<boolean>) => {
      return {
        ...initialState,
      };
    },
  },
});

export const { resetAuth, setUser } = authSlice.actions;
export const isAuthenticated = (state: RootState) =>
  !isUndefined(state.auth.api_token)

