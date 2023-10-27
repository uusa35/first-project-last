import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { apiUrl } from '@/src/constants';
import { RootState } from '@/redux/store';
import { isUndefined } from 'lodash';
import { Locale } from '@/types/index';
import { Setting } from '@/types/queries';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}`,
    prepareHeaders: async (
      headers,
      { getState, type, endpoint, extra }: RootState
    ) => {
      const {
        locale,
        auth: { api_token }
      } = getState() as RootState;

      headers.set(
        'Access-Control-Allow-Headers',
        'X-Requested-With,Accept,Authentication,Content-Type',
      );
      headers.set('Accept-Language', locale.lang);
      headers.set(
        'Access-Control-Allow-Methods',
        'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      );
      headers.set(
        'Access-Control-Allow-Methods',
        'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      );
      // headers.set(
      //   'Access-Control-Allow-Origin',
      //   'http://localhost',
      // );
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');
      headers.set('Cache-Control', 'no-store');
      if (api_token) {
        headers.set('Authorization', `Bearer ${api_token}`);
        headers.set('api_token', `${api_token}`);
      }
      return headers;
    },
    // credentials: 'include',
    credentials: "same-origin",
  }),
  tagTypes: ['User'],
  keepUnusedDataFor: 0,
  refetchOnReconnect: true,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getSetting: builder.query<
      Setting,
      { lang?: Locale['lang'] | string | undefined; }
    >({
      query: ({ lang }) => ({
        url: `setting`,
        headers: {
          ...(!isUndefined(lang) && lang && { 'Accept-Language': lang })
        }
      }),
    }),
    sendContactus: builder.query<
      Setting,
      { lang?: Locale['lang'] | string | undefined; body: any }
    >({
      query: ({ lang, body }) => ({
        url: `send/contactus`,
        method: 'POST',
        body,
        headers: {
          ...(!isUndefined(lang) && lang && { 'Accept-Language': lang }),
        },
        // validateStatus: (response, result) =>
        //   response.status == 200,
      }),
    }),
    uploadImage: builder.query<
      Setting,
      any
    >({
      query: (body) => ({
        url: `images/upload`,
        method: 'POST',
        body,
        formData: true
        // validateStatus: (response, result) =>
        //   response.status == 200,
      }),
    }),
  }),
});

export const { useGetSettingQuery, useLazySendContactusQuery, useLazyUploadImageQuery } = apiSlice;
