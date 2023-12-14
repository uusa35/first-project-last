import { apiSlice } from "./index";
import { User } from "@/types/queries";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.query<User, { phone: string; phone_country_code: string; password: string; session_id?: string }>({
      query: (body) => ({
        url: `login`,
        body,
        method: "post",
        validateStatus: (response, result) => result.data.status == 200,
      }),
    }),
    register: builder.query<User, { phone: string; phone_country_code: string; email: string; password: string; password_confirmation: string; session_id?: string }>({
      query: (body) => ({
        url: `register`,
        body,
        method: "post",
        validateStatus: (response, result) => result.data.status == 200,
      }),
    }),
    logout: builder.query<void, void>({
      query: () => ({
        url: `logout`,
        method: "post",
        validateStatus: (response, result) => response.status == 200,
      }),
    }),
    getAuthenticatedUser: builder.query<User, { id: number }>({
      query: ({ id }) => ({
        url: `user/${id}`,
        method: "get",
        validateStatus: (response, result) => {
          return response.status == 200;
        },
      }),
    }),
    forgotPassword: builder.query<User, { email: string }>({
      query: (body) => ({
        url: `forgot/password`,
        body,
        method: "post",
        validateStatus: (response, result) => response.status == 200,
      }),
    }),
    changePassword: builder.mutation<
      User,
      {
        params: { password: string; password_confirmation: string };
      }
    >({
      query: ({ params }) => ({
        url: `change/password`,
        params: { ...params },
        method: "post",
        validateStatus: (response, result) => response.status == 200,
      }),
    }),
  }),
});

export const {
  useLazyLoginQuery,
  useLazyRegisterQuery,
  useLazyLogoutQuery,
  useLazyForgotPasswordQuery,
  useGetAuthenticatedUserQuery,
  useChangePasswordMutation,
} = authApi;
