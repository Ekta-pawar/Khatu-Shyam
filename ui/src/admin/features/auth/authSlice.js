import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "fmms_admin";

const loadPersistedAdmin = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const persistAdmin = (admin) => {
  try {
    if (admin) localStorage.setItem(STORAGE_KEY, JSON.stringify(admin));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore storage errors (e.g. private browsing)
  }
};

const initialState = {
  admin: loadPersistedAdmin(),
  isAuthChecked: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.admin = action.payload.admin;
      state.isAuthChecked = true;
      persistAdmin(state.admin);
    },
    clearCredentials: (state) => {
      state.admin = null;
      state.isAuthChecked = true;
      persistAdmin(null);
    },
    setAuthChecked: (state) => {
      state.isAuthChecked = true;
    },
  },
});

export const { setCredentials, clearCredentials, setAuthChecked } = authSlice.actions;

export const selectCurrentAdmin = (state) => state.auth.admin;
export const selectIsAuthChecked = (state) => state.auth.isAuthChecked;
export const selectIsAuthenticated = (state) => Boolean(state.auth.admin);
export const selectIsSuperAdmin = (state) => state.auth.admin?.role === "super_admin";

export default authSlice.reducer;
