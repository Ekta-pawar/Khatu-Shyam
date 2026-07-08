import { apiSlice } from "./apiSlice";

export const galleryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGalleryItems: builder.query({
      query: (type) => (type ? `/gallery?type=${type}` : "/gallery"),
      transformResponse: (response) => response.data || [],
      providesTags: ["Gallery"],
    }),

    createGalleryItem: builder.mutation({
      query: (payload) => ({
        url: "/gallery/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Gallery"],
    }),

    deleteGalleryItem: builder.mutation({
      query: (id) => ({
        url: `/gallery/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Gallery"],
    }),
  }),
});

export const {
  useGetGalleryItemsQuery,
  useCreateGalleryItemMutation,
  useDeleteGalleryItemMutation,
} = galleryApi;
