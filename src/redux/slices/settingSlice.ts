import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Props = {
  currentPath: string;
  isLoading: boolean;
  orderType: 'pickup' | 'delivery'
}
const initialState: Props = {
  currentPath: ``,
  isLoading: false,
  orderType: 'pickup'
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
    changeOrderType: (
      state: typeof initialState,
      action: PayloadAction<Props['orderType']>
    ) => {
      return {
        ...state,
        orderType: action.payload
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
  disableLoading,
  changeOrderType
} = settingSlice.actions;
