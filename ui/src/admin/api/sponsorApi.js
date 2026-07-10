import { apiSlice } from "./apiSlice";

export const sponsorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSponsors: builder.query({
      query: () => "/sponsor/admin",
      transformResponse: (response) => response.data || [],
      providesTags: ["Sponsor"],
    }),

    updateSponsorStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/sponsor/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Sponsor"],
    }),
  }),
});

export const {
  useGetSponsorsQuery,
  useUpdateSponsorStatusMutation,
} = sponsorApi;
