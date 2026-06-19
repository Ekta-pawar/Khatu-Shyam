import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Mail,
  Gift,
  LogOut,
  UserCog,
  MessageSquare,
} from "lucide-react";
import { selectCurrentAdmin, clearCredentials } from "../features/auth/authSlice";
import { useLogoutMutation } from "../api/adminApi";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/members", label: "Members", icon: Users },
  { to: "/admin/payments", label: "Payments", icon: CreditCard },
  { to: "/admin/contacts", label: "Contact Messages", icon: Mail },
  { to: "/admin/enquiries", label: "Enquiries", icon: MessageSquare },
  { to: "/admin/sponsors", label: "Sponsors", icon: Gift },
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
    <div className="flex min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,215,0,0.14),_transparent_32%),_linear-gradient(180deg,#fffdf7,_#f8f4ed)]">
      <aside className="hidden w-72 flex-col border-r border-slate-200 bg-cream/95 px-5 py-6 shadow-elegant md:flex">
        <div className="mb-8 overflow-hidden rounded-3xl bg-sun px-5 py-6 text-white shadow-gold">
          <p className="text-xs uppercase tracking-[0.35em] text-white/80">Shyam Samiti</p>
          <h2 className="mt-4 text-2xl font-display font-semibold">Admin Control</h2>
          <p className="mt-3 text-sm leading-6 text-white/90">
            Manage members, payments, and contact requests with ease.
          </p>
        </div>

        <nav className="flex flex-1 flex-col gap-2">
          {navItems
            .filter((item) => !item.superAdminOnly || admin?.role === "super_admin")
            .map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-orange-100/90 text-orange-800 shadow-sm"
                      : "text-slate-700 hover:bg-slate-100"
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
          className="mt-6 flex items-center gap-3 rounded-2xl bg-saffron/10 px-4 py-3 text-sm font-semibold text-orange-700 transition hover:bg-saffron/20 disabled:opacity-60"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white/90 px-6 py-4 shadow-sm backdrop-blur-sm">
          <div>
            <p className="text-sm text-slate-500">Welcome back,</p>
            <p className="font-semibold text-slate-900">
              {admin?.firstName} {admin?.lastName}
            </p>
          </div>
          <span className="inline-flex items-center rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-700">
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
