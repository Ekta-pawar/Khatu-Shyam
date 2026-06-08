import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import DashboardPage from "../pages/DashboardPage";
import MemberListPage from "../pages/MemberListPage";
import MemberFormPage from "../pages/MemberFormPage";
import MemberDetailsPage from "../pages/MemberDetailsPage";
import PaymentManagementPage from "../pages/PaymentManagementPage";
import ContactMessagesPage from "../pages/ContactMessagesPage";
import AdminManagementPage from "../pages/AdminManagementPage";
import NotFoundPage from "../pages/NotFoundPage";
import AdminLayout from "../components/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";

const AdminRoutes = () => (
  <Routes>
    <Route index element={<Navigate to="dashboard" replace />} />

    <Route element={<GuestRoute />}>
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
    </Route>

    <Route element={<ProtectedRoute />}>
      <Route element={<AdminLayout />}>
        <Route path="dashboard" element={<DashboardPage />} />

        <Route path="members" element={<MemberListPage />} />
        <Route path="members/new" element={<MemberFormPage />} />
        <Route path="members/:id" element={<MemberDetailsPage />} />
        <Route path="members/:id/edit" element={<MemberFormPage />} />

        <Route path="payments" element={<PaymentManagementPage />} />
        <Route path="contacts" element={<ContactMessagesPage />} />

        <Route element={<ProtectedRoute allowedRoles={["super_admin"]} />}>
          <Route path="admins" element={<AdminManagementPage />} />
        </Route>
      </Route>
    </Route>

    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AdminRoutes;
