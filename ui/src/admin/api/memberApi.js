import { apiSlice } from "./apiSlice";

const buildQueryString = (params = {}) => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") search.append(key, value);
  });
  const query = search.toString();
  return query ? `?${query}` : "";
};

export const memberApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMembers: builder.query({
      query: (params) => `/members${buildQueryString(params)}`,
      transformResponse: (response) => response.data,
      providesTags: (result) =>
        result?.members
          ? [
              ...result.members.map(({ _id }) => ({ type: "Member", id: _id })),
              { type: "Member", id: "LIST" },
            ]
          : [{ type: "Member", id: "LIST" }],
    }),

    getMemberById: builder.query({
      query: (id) => `/members/${id}`,
      transformResponse: (response) => response.data.member,
      providesTags: (result, error, id) => [{ type: "Member", id }],
    }),

    createMember: builder.mutation({
      query: (formData) => ({ url: "/members", method: "POST", body: formData }),
      invalidatesTags: [{ type: "Member", id: "LIST" }],
    }),

    updateMember: builder.mutation({
      query: ({ id, formData }) => ({ url: `/members/${id}`, method: "PATCH", body: formData }),
      invalidatesTags: (result, error, { id }) => [{ type: "Member", id }, { type: "Member", id: "LIST" }],
    }),

    deleteMember: builder.mutation({
      query: (id) => ({ url: `/members/${id}`, method: "DELETE" }),
      invalidatesTags: (result, error, id) => [{ type: "Member", id }, { type: "Member", id: "LIST" }],
    }),
  }),
});

export const {
  useGetMembersQuery,
  useGetMemberByIdQuery,
  useCreateMemberMutation,
  useUpdateMemberMutation,
  useDeleteMemberMutation,
} = memberApi;
