import { apiSlice } from "./apiSlice";

// ✅ buildQueryString must be defined BEFORE it is used
const buildQueryString = (params = {}) => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      search.append(key, value);
    }
  });
  const query = search.toString();
  return query ? `?${query}` : "";
};

export const enquiryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEnquiries: builder.query({
      query: (params) => `/enquiry${buildQueryString(params)}`,

      // ✅ transformResponse now returns both enquiries AND pagination
      // so data?.enquiries and data?.pagination?.total both work in the page
      transformResponse: (response) => ({
        enquiries: response.data || [],
        pagination: {
          page:       response.page       || 1,
          total:      response.total      || 0,
          totalPages: response.totalPages || 1,
        },
      }),

      providesTags: (result) =>
        result?.enquiries
          ? [
              ...result.enquiries.map(({ _id }) => ({
                type: "Enquiry",
                id: _id,
              })),
              { type: "Enquiry", id: "LIST" },
            ]
          : [{ type: "Enquiry", id: "LIST" }],
    }),

    updateEnquiryStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/enquiry/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Enquiry", id },
        { type: "Enquiry", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetEnquiriesQuery,
  useUpdateEnquiryStatusMutation,
} = enquiryApi;