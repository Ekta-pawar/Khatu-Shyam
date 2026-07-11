import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../utils/env";
import { clearCredentials } from "../features/auth/authSlice";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  credentials: "include",
});

const baseQueryWithAuthHandling = async (
  args,
  api,
  extraOptions
) => {
  const stateToken = api.getState()?.auth?.token;

  const persistedAuth =
    typeof window !== "undefined"
      ? localStorage.getItem("fmms_admin")
      : null;

  const persistedToken = persistedAuth
    ? JSON.parse(persistedAuth)?.token
    : null;

  const token = stateToken || persistedToken;

  if (token) {
    if (typeof args === "string") {
      args = { url: args };
    }

    args.headers = {
      ...(args.headers || {}),
      Authorization: `Bearer ${token}`,
    };
  }

  const result = await rawBaseQuery(
    args,
    api,
    extraOptions
  );

  if (result.error?.status === 401) {
    api.dispatch(clearCredentials());
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",

  baseQuery: baseQueryWithAuthHandling,

  tagTypes: [
    "Admin",
    "Member",
    "Team",
    "Payment",
    "Contact",
    "Enquiry",
    "Events",
    "Gallery",
    "Sponsor",
  ],

  endpoints: () => ({}),
});