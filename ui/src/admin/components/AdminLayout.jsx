import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Mail,
  LogOut,
  UserCog,
} from "lucide-react";
import { selectCurrentAdmin, clearCredentials } from "../features/auth/authSlice";
import { useLogoutMutation } from "../api/adminApi";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/members", label: "Members", icon: Users },
  { to: "/admin/payments", label: "Payments", icon: CreditCard },
  { to: "/admin/contacts", label: "Contact Messages", icon: Mail },
  { to: "/admin/admins", label: "Admins", icon: UserCog, superAdminOnly: true },
];

const AdminLayout = () => {
  const admin = useSelector(selectCurrentAdmin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch {
      // even if the request fails, clear local session
    } finally {
      dispatch(clearCredentials());
      toast.success("Logged out successfully");
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white px-4 py-6 md:flex">
        <div className="mb-8 px-2">
          <p className="text-lg font-bold text-orange-600">Family Member System</p>
          <p className="text-xs text-slate-400">Admin Panel</p>
        </div>

        <nav className="flex flex-1 flex-col gap-1">
          {navItems
            .filter((item) => !item.superAdminOnly || admin?.role === "super_admin")
            .map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    isActive ? "bg-orange-50 text-orange-700" : "text-slate-600 hover:bg-slate-100"
                  }`
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
        </nav>

        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="mt-4 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-60"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <div>
            <p className="text-sm text-slate-400">Welcome back,</p>
            <p className="font-semibold text-slate-800">
              {admin?.firstName} {admin?.lastName}
            </p>
          </div>
          <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-700">
            {admin?.role?.replace("_", " ")}
          </span>
        </header>

        <main className="flex-1 px-4 py-6 md:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
