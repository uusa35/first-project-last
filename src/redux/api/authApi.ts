import { apiSlice } from './index';
import {
  User,
} from '@/types/queries';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLogin: builder.query<
      User, { email: string; password: string }
    >({
      query: () => ({
        url: `login`,
        validateStatus: (response, result) =>
          response.status == 200,
      }),
    }),

  }),
});

export const {
  useGetLoginQuery
} = authApi;
