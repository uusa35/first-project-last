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

    registerVisitor: builder.mutation<
      User, { 
        name:string
        email: string; 
        password: string ,
        password_confirmation:string,
        country_id:number,
        role:"visitor"|"company"
      }
    >({
      query: ({name,email, password,password_confirmation,country_id,role}) => ({
        url: `register`,
        params:{name,email,password,password_confirmation,country_id,role},
        method:"post",
        validateStatus: (response, result) =>
          response.status == 200,
      }),
    }),

  }),
});

export const {
  useLoginMutation,
  useRegisterVisitorMutation
} = authApi;
