import { apiSlice } from "./index";
import { AppQueryResult, Area } from "@/types/queries";
import { Locale } from "@/types/index";

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCartProducts: builder.query<
      AppQueryResult<Area[]>,
      string | void | undefined
    >({
      query: (country_id) => ({
        url: `cart`,
        headers: {
          ...(country_id && { "X-COUNTRY": country_id }),
        },
        validateStatus: (response, result) =>
          result.status == 200 && result.success,
      }),
    }),
  }),
});

export const { useGetCartProductsQuery } = cartApi;
