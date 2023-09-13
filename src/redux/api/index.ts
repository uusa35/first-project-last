import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { apiUrl, isLocal } from '@/src/constants';
import { RootState } from '@/redux/store';
import { isNull } from 'lodash';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}`,
    prepareHeaders: async (
      headers,
      { getState, type, endpoint, extra }: RootState
    ) => {
      const {
        setting
      } = getState() as RootState;

      headers.set(
        'Access-Control-Allow-Headers',
        'X-Requested-With,Accept,Authentication,Content-Type',
      );
      // headers.set('lang', lang);
      headers.set(
        'Access-Control-Allow-Methods',
        'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      );
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');
      headers.set('Cache-Control', 'no-store');
      // if (auth.isAuth && auth.user.api_token) {
      //   headers.set('Authorization', `Bearer ${auth.user.api_token}`);
      //   headers.set('api_token', `${auth.user.api_token}`);
      // }
      return headers;
    },
    // credentials: 'include',
    credentials: "same-origin",
  }),
  // tagTypes: ['Cart', 'Branch', 'Area', 'Product', 'Wishlist'],
  keepUnusedDataFor: 0,
  refetchOnReconnect: true,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({}),
});
