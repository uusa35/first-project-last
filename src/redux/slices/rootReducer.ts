import { combineReducers } from '@reduxjs/toolkit';
import { localeSlice } from './localeSlice';
import { apiSlice } from '../api';
import { settingSlice } from '@/redux/slices/settingSlice';
import { categoryApi } from '@/redux/api/categoryApi';
import { authApi } from '@/redux/api/authApi';
import { toastMessageSlice } from './toastMessageSlice';
import { cartSlice } from './cartSlice';
import { authSlice } from './authSlice';



export const rootReducer = combineReducers({
  [localeSlice.name]: localeSlice.reducer,
  [settingSlice.name]: settingSlice.reducer,
  [toastMessageSlice.name]: toastMessageSlice.reducer,
  [cartSlice.name]: cartSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});
