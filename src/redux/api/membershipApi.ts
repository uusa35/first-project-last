import { Locale } from "@/types/index";
import { apiSlice } from "./index";
import { AppQueryResult, Membership, User } from "@/types/queries";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMemberships: builder.query<
      Membership[],
      {
        params: {
          sort?: "subscription" | "sponsorship";
          zone?: string;
          search?: string;
          on_home?: number;
          limit?: number;
        };
        lang?: Locale["lang"];
      } | void
    >({
      query: (params) => {
        // console.log({ params }, "in q");
        return {
          url: `membership`,
          method: "get",
          headers: { "Accept-Language": params?.lang },
          ...(params?.params ? { params: { ...params?.params } } : {}),
          validateStatus: (response, result) => response.status == 200,
        };
      },
    }),
  }),
});

export const { useGetMembershipsQuery } = authApi;
