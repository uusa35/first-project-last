import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { apiUrl } from "@/src/constants";
import { RootState } from "@/redux/store";
import { isNull, isUndefined } from "lodash";
import { ContactusForm, Locale } from "@/types/index";
import { Setting } from '@/types/queries';
import { revalidate } from "@/utils/helpers";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}`,
    prepareHeaders: async (headers, { getState }: RootState) => {
      const {
        locale,
        country,
        area,
        appSetting: { orderType },
        auth: { token }
      } = getState() as RootState;
      headers.set("Access-Control-Allow-Origin", "*");
      headers.set(
        "Access-Control-Allow-Headers",
        "X-Requested-With,Accept,Authentication,Content-Type"
      );
      headers.set("Accept-Language", locale.lang);
      headers.set("X-Localization", locale.lang);
      if (country && country.id) {
        headers.set("X-Country", country.id);
      }
      if (area && area.id !== 0) {
      headers.set("X-AREA", area.id);
      }
      headers.set("X-TYPE", orderType);
      headers.set("RTK", "RTK");
      headers.set(
        "Access-Control-Allow-Methods",
        "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      );
      headers.set('Content-Type', 'application/json');
      headers.set("Accept", "application/json");
      // headers.set("Cache-Control", "no-store");
      if (!isNull(token)) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    credentials: "same-origin",
  }),
  keepUnusedDataFor: revalidate.max,
  refetchOnReconnect: true,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    sendContactus: builder.query<Setting, ContactusForm>({
      query: (body) => ({
        url: `contact`,
        body,
        method: 'post',
        validateStatus: (response, result) => result.status == 200 && result.success,
      }),
    }),
    sendJoinus: builder.query<Setting, ContactusForm>({
      query: (body) => ({
        url: `restaurant-request`,
        body,
        method: 'post',
        validateStatus: (response, result) => result.status == 200 && result.success,
      }),
    }),
    getFooterPages: builder.query<any, void>({
      query: () => ({
        url: `footer`,
        method: 'get',
        validateStatus: (response, result) => result.status == 200 && result.success,
      }),
    }),
    getFooterUrls: builder.query<any, void>({
      query: () => ({
        url: `about`,
        method: 'get',
        validateStatus: (response, result) => result.status == 200 && result.success,
      }),
    }),
  }),
});

export const {
  useLazySendContactusQuery,
  useLazySendJoinusQuery,
  useGetFooterPagesQuery,
  useGetFooterUrlsQuery
} = apiSlice;
