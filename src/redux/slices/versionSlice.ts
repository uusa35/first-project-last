import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Props = {
  version: string;

};
const initialState: Props = {
  version: `0.0.40`

};

export const versionSlice = createSlice({
  name: "version",
  initialState,
  reducers: {
    resetApp: (
      state: typeof initialState,
      action: PayloadAction<void>
    ) => initialState,
    setVersionApp: (
      state: typeof initialState,
      action: PayloadAction<string>
    ) => {
      return {
        ...state,
        version: action.payload
      }
    },
  },
});

export const {
  resetApp,
  setVersionApp
} = versionSlice.actions;
