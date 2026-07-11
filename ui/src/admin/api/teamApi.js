import { apiSlice } from "./apiSlice";

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

export const teamApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeamMembers: builder.query({
      query: (params) => `/team${buildQueryString(params)}`,

      providesTags: (result) =>
        result?.teamMembers
          ? [
              ...result.teamMembers.map(({ _id }) => ({
                type: "Team",
                id: _id,
              })),
              { type: "Team", id: "LIST" },
            ]
          : [{ type: "Team", id: "LIST" }],
    }),

    getTeamMemberById: builder.query({
      query: (id) => `/team/${id}`,
      transformResponse: (response) => response.teamMember,
      providesTags: (result, error, id) => [{ type: "Team", id }],
    }),

    createTeamMember: builder.mutation({
      query: (formData) => ({
        url: "/team/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Team", id: "LIST" }],
    }),

    updateTeamMember: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/team/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Team", id },
        { type: "Team", id: "LIST" },
      ],
    }),

    deleteTeamMember: builder.mutation({
      query: (id) => ({
        url: `/team/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Team", id },
        { type: "Team", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetTeamMembersQuery,
  useGetTeamMemberByIdQuery,
  useCreateTeamMemberMutation,
  useUpdateTeamMemberMutation,
  useDeleteTeamMemberMutation,
} = teamApi;
