import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
  openSideMenu: false
};

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setMethod: (
      state: typeof initialState,
      action: PayloadAction<'delivery' | 'pickup'>
    ) => {
      return {
        ...state,
        method: action.payload
      };
    },
    toggleMethod: (
      state: typeof initialState,
      action: PayloadAction<undefined | void>
    ) => {
      return {
        ...state,
        method: state.method == 'delivery' ? 'pickup' : 'delivery'
      };
    },
  }
});

export const {
  setMethod,
  toggleMethod
} = settingSlice.actions;
