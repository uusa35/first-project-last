import { apiSlice } from './index';
import { AppQueryResult, Country } from '@/types/queries';
import { countriesList } from '@/types/index';
import { capitalize, replace, startCase } from 'lodash';

export const countryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCountries: builder.query<
      AppQueryResult<Country[]>, void | undefined
    >({
      query: () => ({
        url: `country`,
        validateStatus: (response, result) =>
          response.status == 200,
      }),
    }),
    getCountryByName: builder.query<
      AppQueryResult<Country>, string
    >({
      query: (name) => ({
        url: `country/${startCase(replace(name, "-", " "))}`,
        validateStatus: (response, result) =>
          response.status == 200,
      }),
    }),
  }),
});

export const { useGetCountriesQuery,
  useLazyGetCountriesQuery,
  useGetCountryByNameQuery,
  useLazyGetCountryByNameQuery } = countryApi;
