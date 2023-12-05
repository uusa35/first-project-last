import { apiSlice } from './index';
import { AppQueryResult, Area } from '@/types/queries';
import { Locale } from '@/types/index';

export const areaApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAreas: builder.query<
      AppQueryResult<Area[]>, void | undefined
    >({
      query: () => ({
        url: `area`,
        validateStatus: (response, result) =>
          response.status == 200,
      }),
    }),
  }),
});

export const { useGetAreasQuery,
  useLazyGetAreasQuery,
} = areaApi;
