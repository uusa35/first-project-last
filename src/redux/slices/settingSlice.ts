import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Props = {

  isLoading: boolean;
  orderType: 'pickup' | 'delivery',
  showLoginModal: boolean;
  showRegisterModal: boolean;
  showForgetPasswordModal: boolean;
  showVerificationModal: boolean;
  sideMenuOpen: boolean;
  session_id: string;
}
const initialState: Props = {

  isLoading: false,
  orderType: 'pickup',
  sideMenuOpen: false,
  showLoginModal: false,
  showRegisterModal: false,
  showForgetPasswordModal: false,
  showVerificationModal: false,
  session_id: ``
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
        sideMenuOpen: false,
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
        sideMenuOpen: false,
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
        sideMenuOpen: false,
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
        sideMenuOpen: false,
      };
    },
    toggleSideMenu: (
      state: typeof initialState,
      action: PayloadAction<undefined | boolean>
    ) => {
      return {
        ...state,
        showVerificationModal: false,
        showLoginModal: false,
        showRegisterModal: false,
        showForgetPasswordModal: false,
        sideMenuOpen: action.payload === undefined ? !state.sideMenuOpen : action.payload,
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
  toggleVerficationModal,
  toggleSideMenu,
} = settingSlice.actions;
