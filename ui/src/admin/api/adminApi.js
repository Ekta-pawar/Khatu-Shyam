import { apiSlice } from "./apiSlice";

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (body) => ({
        url: "/admins/signup",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Admin"],
    }),

    login: builder.mutation({
      query: (body) => ({
        url: "/admins/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Admin"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/admins/logout",
        method: "POST",
      }),
      invalidatesTags: ["Admin"],
    }),

    getProfile: builder.query({
      query: () => "/admins/me",
      providesTags: ["Admin"],
    }),

    updateProfile: builder.mutation({
      query: (formData) => ({
        url: "/admins/me",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Admin"],
    }),

    changePassword: builder.mutation({
      query: (body) => ({
        url: "/admins/change-password",
        method: "PATCH",
        body,
      }),
    }),

    listAdmins: builder.query({
      query: () => "/admins",
      providesTags: ["Admin"],
      transformResponse: (response) => response.data,
    }),

    createAdmin: builder.mutation({
      query: (body) => ({
        url: "/admins/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Admin"],
    }),

    toggleAdminStatus: builder.mutation({
      query: (id) => ({
        url: `/admins/${id}/toggle-status`,
        method: "PATCH",
      }),
      invalidatesTags: ["Admin"],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useListAdminsQuery,
  useCreateAdminMutation,
  useToggleAdminStatusMutation,
} = adminApi;