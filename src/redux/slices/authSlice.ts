import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isUndefined } from 'lodash';
import { RootState } from '@/src/redux/store';
import { Auth } from '@/types/queries';


const initialState: Auth = {
  id: ``,
  name: ``,
  caption: ``,
  email: ``,
  image: ``,
  hasValidDeal: false,
  role: { id: ``, name: 'visitor' },
  deals: [],
  api_token: undefined,

};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Auth>) => action.payload,
    resetAuth: (state, action: PayloadAction<void>) => {
      return {
        ...initialState,
      };
    },
  },
});

export const { resetAuth, setUser } = authSlice.actions;
export const isAuthenticated = (state: RootState) =>
  !isUndefined(state.auth.api_token)

