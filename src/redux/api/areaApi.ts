import { apiSlice } from './index';
import { AppQueryResult, Area } from '@/types/queries';
import { Locale } from '@/types/index';

export const areaApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAreas: builder.query<
      AppQueryResult<Area[]>, string | void | undefined
    >({
      query: (country_id) => ({
        url: `area`,
        headers: {
          ...(country_id && { 'X-COUNTRY': country_id })
        },
        validateStatus: (response, result) =>
          response.status == 200,
      }),
    }),
  }),
});

export const { useGetAreasQuery,
  useLazyGetAreasQuery,
} = areaApi;
