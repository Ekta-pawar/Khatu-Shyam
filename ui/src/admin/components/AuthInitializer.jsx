import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLazyGetProfileQuery } from "../api/adminApi";
import {
  setCredentials,
  clearCredentials,
  setAuthChecked,
} from "../features/auth/authSlice";

/**
 * On first load, verifies the HttpOnly auth cookie against the backend so a
 * page refresh doesn't drop the session even though Redux state resets.
 * The locally-persisted admin (see authSlice) is used as an optimistic value
 * until this check resolves.
 */
const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();
  const [fetchProfile] = useLazyGetProfileQuery();

  useEffect(() => {
    fetchProfile()
      .unwrap()
      .then((response) => {
        if (response?.data?.admin) {
          dispatch(setCredentials({ admin: response.data.admin }));
        }
      })
      .catch((error) => {
        if (error?.status === 401) {
          dispatch(clearCredentials());
        }
      })
      .finally(() => {
        dispatch(setAuthChecked());
      });
  }, [dispatch, fetchProfile]);

  return children;
};

export default AuthInitializer;
