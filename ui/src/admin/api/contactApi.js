import { apiSlice } from "./apiSlice";

const buildQueryString = (params = {}) => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") search.append(key, value);
  });
  const query = search.toString();
  return query ? `?${query}` : "";
};

export const contactApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getContactMessages: builder.query({
      query: (params) => `/contacts${buildQueryString(params)}`,
      transformResponse: (response) => response.data,
      providesTags: (result) =>
        result?.messages
          ? [
              ...result.messages.map(({ _id }) => ({ type: "Contact", id: _id })),
              { type: "Contact", id: "LIST" },
            ]
          : [{ type: "Contact", id: "LIST" }],
    }),

    getContactMessageById: builder.query({
      query: (id) => `/contacts/${id}`,
      transformResponse: (response) => response.data.contact,
      providesTags: (result, error, id) => [{ type: "Contact", id }],
    }),

    resolveContactMessage: builder.mutation({
      query: (id) => ({ url: `/contacts/${id}/resolve`, method: "PATCH" }),
      invalidatesTags: (result, error, id) => [{ type: "Contact", id }, { type: "Contact", id: "LIST" }],
    }),

    deleteContactMessage: builder.mutation({
      query: (id) => ({ url: `/contacts/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "Contact", id: "LIST" }],
    }),
  }),
});

export const {
  useGetContactMessagesQuery,
  useGetContactMessageByIdQuery,
  useResolveContactMessageMutation,
  useDeleteContactMessageMutation,
} = contactApi;
