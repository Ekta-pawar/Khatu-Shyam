import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  LayoutDashboard,
  Users,
  CreditCard,
  Calendar,
  Mail,
  Gift,
  LogOut,
  UserCog,
  MessageSquare,
  Images,
  Menu,
} from "lucide-react";
import { selectCurrentAdmin, clearCredentials } from "../features/auth/authSlice";
import { useLogoutMutation } from "../api/adminApi";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/members", label: "Our Guest", icon: Users },
  { to: "/admin/team", label: "Our Team", icon: Users },
  { to: "/admin/events", label: "Events", icon: Calendar },
  { to: "/admin/payments", label: "Payments", icon: CreditCard },
  { to: "/admin/contacts", label: "Contact Messages", icon: Mail },
  { to: "/admin/enquiries", label: "Enquiries", icon: MessageSquare },
  { to: "/admin/sponsors", label: "Sponsors", icon: Gift },
  { to: "/admin/gallery", label: "Gallery", icon: Images },
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
    <div className="h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(255,215,0,0.14),_transparent_32%),_linear-gradient(180deg,#fffdf7,_#f8f4ed)] text-slate-900">
      <div className="flex h-full min-w-0">
        <aside className="hidden h-screen w-72 shrink-0 flex-col border-r border-slate-200/80 bg-white/88 px-5 py-5 shadow-[8px_0_30px_rgba(15,23,42,0.06)] backdrop-blur-xl md:flex">
        <div className="mb-10 flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-linear-to-r bg-yellow-500 text-black text-xl font-bold shadow-lg">
            ॐ
          </span>

          <span className="flex flex-col leading-tight">
            <span className="text-lg font-semibold bg-yellow-500 bg-clip-text text-transparent">
              Shri Shri Khatu Shyam
            </span>
            <span className="text-[11px] uppercase tracking-[0.25em] text-yellow-500">
              Sewa Samiti (Reg.)
            </span>
          </span>
        </div>

        <nav className="scrollbar-hide flex flex-1 flex-col gap-1.5 overflow-y-auto pr-1">
          {navItems
            .filter((item) => !item.superAdminOnly || admin?.role === "super_admin")
            .map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex min-h-11 items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-linear-to-r from-yellow-200 to-yellow-500 text-black shadow-sm ring-1 ring-yellow-300/70"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`
                }
              >
                <Icon size={19} className="shrink-0" />
                <span className="truncate">{label}</span>
              </NavLink>
            ))}
        </nav>

        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="mt-5 flex min-h-11 items-center gap-3 rounded-xl bg-linear-to-r from-yellow-100 to-yellow-200 px-4 py-3 text-sm font-semibold text-yellow-800 transition hover:from-yellow-200 hover:to-yellow-300 disabled:opacity-60"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/92 shadow-sm backdrop-blur-xl">
            <div className="flex min-h-16 items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
              <div className="min-w-0">
                <p className="text-sm text-slate-500">Welcome back,</p>
                <p className="truncate text-base font-semibold text-slate-900">
                  {admin?.firstName} {admin?.lastName}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className="hidden items-center rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-700 ring-1 ring-orange-100 sm:inline-flex">
                  {admin?.role?.replace("_", " ")}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoading}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-orange-50 hover:text-orange-700 disabled:opacity-60 md:hidden"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>

            <div className="border-t border-slate-100 px-3 py-2 md:hidden">
              <div className="mb-2 flex items-center gap-2 px-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                <Menu size={14} />
                Menu
              </div>
              <nav className="admin-scrollbar flex gap-2 overflow-x-auto pb-1">
                {navItems
                  .filter((item) => !item.superAdminOnly || admin?.role === "super_admin")
                  .map(({ to, label, icon: Icon }) => (
                    <NavLink
                      key={to}
                      to={to}
                      className={({ isActive }) =>
                        `inline-flex h-10 shrink-0 items-center gap-2 rounded-full px-3 text-sm font-semibold transition ${
                          isActive
                            ? "bg-linear-to-r from-yellow-200 to-yellow-500 text-black shadow-sm"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`
                      }
                    >
                      <Icon size={16} />
                      {label}
                    </NavLink>
                  ))}
              </nav>
            </div>
          </header>

          <main className="admin-content admin-scrollbar min-w-0 flex-1 overflow-y-auto overflow-x-hidden px-4 py-5 sm:px-6 md:px-7 lg:px-8">
            <div className="mx-auto w-full max-w-7xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
