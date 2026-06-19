import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "fmms_admin";

const loadPersistedAuth = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const persistAuth = (auth) => {
  try {
    if (auth) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Ignore storage errors
  }
};

const persistedAuth = loadPersistedAuth();

const initialState = {
  admin: persistedAuth?.admin || null,
  token: persistedAuth?.token || null,
  isAuthChecked: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.admin = action.payload.admin;
      state.token = action.payload.token ?? state.token;
      state.isAuthChecked = true;

      persistAuth({
        admin: state.admin,
        token: state.token,
      });
    },

    clearCredentials: (state) => {
      state.admin = null;
      state.token = null;
      state.isAuthChecked = true;

      persistAuth(null);
    },

    setAuthChecked: (state) => {
      state.isAuthChecked = true;
    },
  },
});

export const {
  setCredentials,
  clearCredentials,
  setAuthChecked,
} = authSlice.actions;

export const selectCurrentAdmin = (state) => state.auth.admin;

export const selectIsAuthChecked = (state) =>
  state.auth.isAuthChecked;

export const selectIsAuthenticated = (state) =>
  Boolean(state.auth.admin);

export const selectIsSuperAdmin = (state) =>
  state.auth.admin?.role === "super_admin";

export default authSlice.reducer;