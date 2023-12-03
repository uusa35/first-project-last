import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { apiUrl } from "@/src/constants";
import { RootState } from "@/redux/store";
import { isUndefined } from "lodash";
import { Locale } from "@/types/index";
import { Setting } from "@/types/queries";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}`,
    prepareHeaders: async (headers, { getState }: RootState) => {
      const {
        locale,
        auth: { api_token },
      } = getState() as RootState;
      headers.set("Access-Control-Allow-Origin", "*");
      headers.set(
        "Access-Control-Allow-Headers",
        "X-Requested-With,Accept,Authentication,Content-Type"
      );
      headers.set("Accept-Language", locale.lang);
      headers.set(
        "Access-Control-Allow-Methods",
        "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      );
      // headers.set('Content-Type', 'application/json');
      headers.set("Accept", "application/json");
      headers.set("Cache-Control", "no-store");
      if (api_token) {
        headers.set("Authorization", `Bearer ${api_token}`);
      }

      return headers;
    },
    credentials: "same-origin",
  }),
  keepUnusedDataFor: 0,
  refetchOnReconnect: true,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getSetting: builder.query<Setting, void>({
      query: () => ({
        url: `setting`,
      }),
    }),
  }),
});

export const {
  useGetSettingQuery,
} = apiSlice;
