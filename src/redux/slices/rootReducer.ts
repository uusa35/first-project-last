import { combineReducers } from '@reduxjs/toolkit';
import { localeSlice } from './localeSlice';
import { apiSlice } from '../api';
import { settingSlice } from '@/redux/slices/settingSlice';
import { toastMessageSlice } from './toastMessageSlice';
import { areaSlice } from './areaSlice';
import { countrySlice } from './countrySlice';
import { authSlice } from './authSlice';
import { productSlice } from './productSlice';
import { branchSlice } from './branchSlice';

export const rootReducer = combineReducers({
  [localeSlice.name]: localeSlice.reducer,
  [settingSlice.name]: settingSlice.reducer,
  [areaSlice.name]: areaSlice.reducer,
  [countrySlice.name]: countrySlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [productSlice.name]: productSlice.reducer,
  [branchSlice.name]: branchSlice.reducer,
  [toastMessageSlice.name]: toastMessageSlice.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer
});
