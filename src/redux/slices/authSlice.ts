import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isNull } from 'lodash';
import { RootState } from '@/src/redux/store';
import { Auth } from '@/types/queries';


const initialState: Auth = {
  id: 0,
  name: ``,
  caption: ``,
  email: ``,
  image: ``,
  hasValidDeal: false,
  role: { id: ``, name: 'visitor' },
  deals: [],
  api_token: null,

};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<Auth>) => action.payload,
    resetAuth: (state, action: PayloadAction<void>) => initialState,
  },
});

export const { resetAuth, setAuth } = authSlice.actions;
export const isAuthenticated = (state: RootState) =>
  !isNull(state.auth.api_token);

