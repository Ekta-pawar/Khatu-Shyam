// import { apiSlice } from "./apiSlice";

// export const sponsorApi = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getSponsors: builder.query({
//       query: () => "/sponsor",
//       transformResponse: (response) => response.data,
//       providesTags: ["Sponsor"],
//     }),
//   }),
// });

// export const {
//   useGetSponsorsQuery,
// } = sponsorApi;
import { apiSlice } from "./apiSlice";

export const sponsorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSponsors: builder.query({
      query: () => "/sponsor",
      transformResponse: (response) => response.data || [],
      providesTags: ["Sponsor"],
    }),
  }),
});

export const {
  useGetSponsorsQuery,
} = sponsorApi;