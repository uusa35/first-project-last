import { apiSlice } from './index';
import { AppQueryResult, Order } from '@/types/queries';

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getOrders: builder.query<
        AppQueryResult<[Order]>, void | undefined
      >({
        query: () => ({
          url: `order`,
          validateStatus: (response, result) =>
            response.status == 200,
        }),
      }),

    };
  },
});

export const {
  useGetOrdersQuery
} = orderApi;
