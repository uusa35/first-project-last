import { apiSlice } from './index';
import {
  User,
} from '@/types/queries';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      User, { email: string; password: string }
    >({
      query: ({email, password}) => ({
        url: `login`,
        params:{email:"company3@example.com",password:"password"},
        method:"post",
        validateStatus: (response, result) =>
          response.status == 200,
      }),
    }),

  }),
});

export const {
  useLoginMutation
} = authApi;
