import { apiSlice } from './index';
import { AppQueryResult, Category, Product } from '@/types/queries';
import { Locale } from '@/types/index';

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query<
      AppQueryResult<Category[]>, number | string
    >({
      query: (id) => ({
        url: `offer/${id}`,
        validateStatus: (response, result) => result.status == "200",

      }),
    }),

  }),
});

export const { useGetProductQuery, useLazyGetProductQuery } = productApi;
