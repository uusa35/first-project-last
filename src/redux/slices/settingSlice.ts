import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Props = {
  currentPath: string;
  isLoading: boolean;
}
const initialState: Props = {
  currentPath: ``,
  isLoading: false
};

export const settingSlice = createSlice({
  name: 'appSetting',
  initialState,
  reducers: {
    setCurrentPath: (
      state: typeof initialState,
      action: PayloadAction<string>
    ) => {
      return {
        ...state,
        currentPath: action.payload
      };
    },
    enableLoading: (
      state: typeof initialState,
      action: PayloadAction<void>
    ) => {
      return {
        ...state,
        isLoading: true
      };
    },
    disableLoading: (
      state: typeof initialState,
      action: PayloadAction<void>
    ) => {
      return {
        ...state,
        isLoading: false
      };
    },

  }
});

export const {
  setCurrentPath,
  enableLoading,
  disableLoading
} = settingSlice.actions;
