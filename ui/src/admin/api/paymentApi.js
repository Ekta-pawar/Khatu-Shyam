import { apiSlice } from "./apiSlice";

const buildQueryString = (params = {}) => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") search.append(key, value);
  });
  const query = search.toString();
  return query ? `?${query}` : "";
};

export const paymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPayments: builder.query({
      query: (params) => `/payments${buildQueryString(params)}`,
      transformResponse: (response) => response.data,
      providesTags: (result) =>
        result?.payments
          ? [
              ...result.payments.map(({ _id }) => ({ type: "Payment", id: _id })),
              { type: "Payment", id: "LIST" },
            ]
          : [{ type: "Payment", id: "LIST" }],
    }),

    getPaymentById: builder.query({
      query: (id) => `/payments/${id}`,
      transformResponse: (response) => response.data.payment,
      providesTags: (result, error, id) => [{ type: "Payment", id }],
    }),

    recordOfflinePayment: builder.mutation({
      query: (body) => ({
        url: "/payments",
        method: "POST",
        body: { ...body, typeOfPayment: "offline" },
      }),
      invalidatesTags: [{ type: "Payment", id: "LIST" }],
    }),

    /**
     * Razorpay isn't live yet — the backend responds with 503 plus the pending
     * payment record. The UI surfaces that as a friendly "coming soon" notice.
     */
    initiateOnlinePayment: builder.mutation({
      query: (body) => ({ url: "/payments/online/order", method: "POST", body }),
      invalidatesTags: [{ type: "Payment", id: "LIST" }],
    }),

    updatePaymentStatus: builder.mutation({
      query: ({ id, status }) => ({ url: `/payments/${id}/status`, method: "PATCH", body: { status } }),
      invalidatesTags: (result, error, { id }) => [{ type: "Payment", id }, { type: "Payment", id: "LIST" }],
    }),
  }),
});

export const {
  useGetPaymentsQuery,
  useGetPaymentByIdQuery,
  useRecordOfflinePaymentMutation,
  useInitiateOnlinePaymentMutation,
  useUpdatePaymentStatusMutation,
} = paymentApi;
