import { apiSlice } from "./index";
import { User } from "@/types/queries";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.query<User, { email: string; password: string }>({
      query: (body) => ({
        url: `login`,
        body,
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
    registerVisitor: builder.mutation<
      User,
      {
        name: string;
        email: string;
        password: string;
        password_confirmation: string;
        country_id: number;
        role: "visitor" | "company";
      }
    >({
      query: ({
        name,
        email,
        password,
        password_confirmation,
        country_id,
        role,
      }) => ({
        url: `register`,
        params: {
          name,
          email,
          password,
          password_confirmation,
          country_id,
          role,
        },
        method: "post",
        validateStatus: (response, result) => response.status == 200,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation<User, { body: any; id: number }>({
      query: ({ body, id }) => ({
        url: `user/${id}`,
        body,
        method: "put",
        validateStatus: (response, result) => response.status == 200,
      }),
      invalidatesTags: ["User"],
    }),

    uploadImage: builder.query<User, any>({
      query: (body) => {
        return {
          url: `image/upload`,
          body,
          formData: true,
          method: "post",
          prepareHeaders: (headers: any) => {
            headers.set("Content-Type", "multipart/form-data");
          },
          validateStatus: (response, result) => response.status == 200,
        };
      },
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
  useRegisterVisitorMutation,
  useUpdateUserMutation,
  useLazyUploadImageQuery,
  useLazyForgotPasswordQuery,
  useGetAuthenticatedUserQuery,
  useChangePasswordMutation,
} = authApi;
