import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentAdmin, selectIsAuthChecked } from "../features/auth/authSlice";
import Loader from "../components/Loader";

/** Redirects already-authenticated admins away from /login and /signup. */
const GuestRoute = () => {
  const admin = useSelector(selectCurrentAdmin);
  const isAuthChecked = useSelector(selectIsAuthChecked);

  if (!isAuthChecked) {
    return <Loader fullScreen label="Loading..." />;
  }

  if (admin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
