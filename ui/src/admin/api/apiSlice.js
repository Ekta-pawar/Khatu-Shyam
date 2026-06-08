import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../utils/env";
import { clearCredentials } from "../features/auth/authSlice";

/**
 * The backend authenticates via an HttpOnly cookie, so `credentials: "include"`
 * is required on every request. `fetchBaseQuery` also transparently supports
 * FormData bodies (for image uploads) — it skips JSON-stringifying them.
 */
const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  credentials: "include",
});

const baseQueryWithAuthHandling = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    api.dispatch(clearCredentials());
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuthHandling,
  tagTypes: ["Admin", "Member", "Payment", "Contact"],
  endpoints: () => ({}),
});
