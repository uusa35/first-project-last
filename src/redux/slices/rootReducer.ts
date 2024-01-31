import { combineReducers } from '@reduxjs/toolkit';
import { localeSlice } from './localeSlice';
import { apiSlice } from '../api';
import { settingSlice } from '@/redux/slices/settingSlice';
// import { categoryApi } from '@/redux/api/categoryApi';
// import { productApi } from '@/redux/api/productApi';
// import { vendorApi } from '@/redux/api/vendorApi';
// import { authApi } from '@/redux/api/authApi';
// import { areaApi } from '@/redux/api/areaApi';
// import { countryApi } from '@/redux/api/countryApi';
import { toastMessageSlice } from './toastMessageSlice';
import { areaSlice } from './areaSlice';
import { countrySlice } from './countrySlice';
import { authSlice } from './authSlice';
import { productSlice } from './productSlice';
import { branchSlice } from './branchSlice';
import { versionSlice } from './versionSlice';

export const rootReducer = combineReducers({
  [localeSlice.name]: localeSlice.reducer,
  [settingSlice.name]: settingSlice.reducer,
  [areaSlice.name]: areaSlice.reducer,
  [countrySlice.name]: countrySlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [productSlice.name]: productSlice.reducer,
  [branchSlice.name]: branchSlice.reducer,
  [toastMessageSlice.name]: toastMessageSlice.reducer,
  [versionSlice.name]: versionSlice.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer
});
