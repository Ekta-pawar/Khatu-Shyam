import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLazyGetProfileQuery } from "../api/adminApi";
import { setCredentials, clearCredentials } from "../features/auth/authSlice";

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
      .then((response) => dispatch(setCredentials({ admin: response.data.admin })))
      .catch(() => dispatch(clearCredentials()));
  }, [dispatch, fetchProfile]);

  return children;
};

export default AuthInitializer;
