import { apiSlice } from "./apiSlice";

export const eventApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createEvent: builder.mutation({
      query: (data) => ({
        url: "/events/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Events"],
    }),

    getEvents: builder.query({
      query: () => "/events",
      providesTags: ["Events"],
    }),

    getUpcomingEvents: builder.query({
      query: () => "/events/upcoming",
      providesTags: ["Events"],
    }),

    getPastEvents: builder.query({
      query: () => "/events/past",
      providesTags: ["Events"],
    }),

    getEventById: builder.query({
      query: (id) => `/events/${id}`,
      providesTags: ["Events"],
    }),

    updateEvent: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/events/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Events"],
    }),

    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `/events/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Events"],
    }),
  }),
});

export const {
  useCreateEventMutation,
  useGetEventsQuery,
  useGetUpcomingEventsQuery,
  useGetPastEventsQuery,
  useGetEventByIdQuery,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventApi;