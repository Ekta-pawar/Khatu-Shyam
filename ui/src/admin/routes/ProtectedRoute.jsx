import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentAdmin, selectIsAuthChecked } from "../features/auth/authSlice";
import Loader from "../components/Loader";

const ProtectedRoute = ({ allowedRoles }) => {
  const admin = useSelector(selectCurrentAdmin);
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Loader fullScreen label="Checking session..." />;
  }

  if (!admin) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(admin.role)) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
