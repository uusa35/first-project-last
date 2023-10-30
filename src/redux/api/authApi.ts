import { apiSlice } from './index';
import {
  User,
} from '@/types/queries';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.query<
      User, { email: string; password: string }
    >({
      query: (body) => ({
        url: `login`,
        body,
        method: "post",
        validateStatus: (response, result) =>
          response.status == 200,
      }),
    }),
    registerVisitor: builder.mutation<
      User, {
        name: string
        email: string;
        password: string,
        password_confirmation: string,
        country_id: number,
        role: "visitor" | "company"
      }
    >({
      query: ({ name, email, password, password_confirmation, country_id, role }) => ({
        url: `register`,
        params: { name, email, password, password_confirmation, country_id, role },
        method: "post",
        headers:{
          "Access-Control-Allow-Origin": "*"
        },
        validateStatus: (response, result) =>
          response.status == 200,
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation<
      User, { body: any, id: number }
    >({
      query: ({ body, id }) => ({
        url: `user/${id}`,
        body,
        method: "put",
        validateStatus: (response, result) =>
          response.status == 200,
      }),
      invalidatesTags: ['User'],
    }),
    updateUserImage: builder.mutation<
      User, { formData: any, id: number }
    >({
      query: ({ formData, id }) => ({
        url: `user/${id}`,
        body: formData,
        method: "post",
        headers: {
          'Content-Type': 'multipart/form-data;'
        },
        formData: true,
        validateStatus: (response, result) =>
          response.status == 200,
      }),
      invalidatesTags: ['User'],
    }),
    forgotPassword: builder.query<
      User, { email: string }
    >({
      query: (body) => ({
        url: `forgot/password`,
        body,
        method: "post",
        validateStatus: (response, result) =>
          response.status == 200,
      }),
    }),
  }),
});

export const {
  useLazyLoginQuery,
  useRegisterVisitorMutation,
  useUpdateUserMutation,
  useUpdateUserImageMutation,
  useLazyForgotPasswordQuery
} = authApi;
