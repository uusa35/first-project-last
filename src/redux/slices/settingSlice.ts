import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Props = {
  currentPath: string;
  isLoading: boolean;
  orderType: 'pickup' | 'delivery',
  showLoginModal: boolean;
  showRegisterModal: boolean;
  showForgetPasswordModal: boolean;
  showVerificationModal: boolean;
}
const initialState: Props = {
  currentPath: ``,
  isLoading: false,
  orderType: 'pickup',
  showLoginModal: false,
  showRegisterModal: false,
  showForgetPasswordModal: false,
  showVerificationModal: false,
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
    toggleLoginModal: (
      state: typeof initialState,
      action: PayloadAction<void>
    ) => {
      return {
        ...state,
        showLoginModal: !state.showLoginModal,
        showRegisterModal: false,
        showForgetPasswordModal: false,
        showVerificationModal: false,
      };
    },
    toggleRegisterModal: (
      state: typeof initialState,
      action: PayloadAction<void>
    ) => {
      return {
        ...state,
        showRegisterModal: !state.showRegisterModal,
        showLoginModal: false,
        showForgetPasswordModal: false,
        showVerificationModal: false,
      };
    },
    toggleForgetPasswordModal: (
      state: typeof initialState,
      action: PayloadAction<void>
    ) => {
      return {
        ...state,
        showForgetPasswordModal: !state.showForgetPasswordModal,
        showLoginModal: false,
        showRegisterModal: false,
        showVerificationModal: false,
      };
    },
    toggleVerficationModal: (
      state: typeof initialState,
      action: PayloadAction<void>
    ) => {
      return {
        ...state,
        showVerificationModal: !state.showVerificationModal,
        showLoginModal: false,
        showRegisterModal: false,
        showForgetPasswordModal: false,
      };
    },
  }
});

export const {
  setCurrentPath,
  enableLoading,
  disableLoading,
  changeOrderType,
  toggleLoginModal,
  toggleRegisterModal,
  toggleForgetPasswordModal,
  toggleVerficationModal
} = settingSlice.actions;
