import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toastMessage } from '@/types/index';

const initialState: toastMessage = {

  title: ``,
  content: ``,
  showToast: false,
  type: `default`,


};

export const toastMessageSlice = createSlice({
  name: 'toastMessage',
  initialState,
  reducers: {
    showToastMessage: (
      state: typeof initialState,
      action: PayloadAction<{
        content: string;
        type: string;
        title?: string;
      }>
    ) => {
      return {
        content: action.payload.content,
        showToast: true,
        type: action.payload.type,
        title: action.payload.title ?? ``,
      };
    },
    hideToastMessage: (state: typeof initialState, action: PayloadAction) => {
      return {
        title: ``,
        content: ``,
        type: `info`,
        showToast: false,

      };
    }
  }
});

export const {
  showToastMessage,
  hideToastMessage,
} = toastMessageSlice.actions;
