import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Props = {
  currentPath: string;
}
const initialState: Props = {
  currentPath: ``
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
        currentPath: action.payload
      };
    },

  }
});

export const {
  setCurrentPath
} = settingSlice.actions;
