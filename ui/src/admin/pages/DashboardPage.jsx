import { Link } from "react-router-dom";
import { Users, CreditCard, Mail, UserCog } from "lucide-react";
import { useSelector } from "react-redux";
import { useGetMembersQuery } from "../api/memberApi";
import { useGetPaymentsQuery } from "../api/paymentApi";
import { useGetContactMessagesQuery } from "../api/contactApi";
import shyamLogo from "../../assets/shyam-logo.svg";

import { selectIsSuperAdmin } from "../features/auth/authSlice";
import {
  useGetProfileQuery,
  useListAdminsQuery,
} from "../api/adminApi";

const DashboardPage = () => {
  const isSuperAdmin = useSelector(selectIsSuperAdmin);

  const { data: profileData } = useGetProfileQuery();

  const admin = profileData?.data?.admin;

  const { data: membersData, isFetching: loadingMembers } =
    useGetMembersQuery({
      page: 1,
      limit: 1,
    });

  const { data: paymentsData, isFetching: loadingPayments } =
    useGetPaymentsQuery({
      page: 1,
      limit: 1,
    });

  const { data: contactsData, isFetching: loadingContacts } =
    useGetContactMessagesQuery({
      page: 1,
      limit: 1,
      isResolved: "false",
    });

  const { data: admins, isFetching: loadingAdmins } =
    useListAdminsQuery(undefined, {
      skip: !isSuperAdmin,
    });

  const cards = [
    {
      icon: Users,
      label: "Total Members",
      value: loadingMembers
        ? "..."
        : membersData?.pagination?.total ?? 0,
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: CreditCard,
      label: "Total Payments",
      value: loadingPayments
        ? "..."
        : paymentsData?.pagination?.total ?? 0,
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Mail,
      label: "Unresolved Messages",
      value: loadingContacts
        ? "..."
        : contactsData?.pagination?.total ?? 0,
      color: "bg-blue-100 text-blue-600",
    },
  ];

  if (isSuperAdmin) {
    cards.push({
      icon: UserCog,
      label: "Admins",
      value: loadingAdmins ? "..." : admins?.count ?? 0,
      color: "bg-purple-100 text-purple-600",
    });
  }

  return (
    <div className="space-y-8">
      {/* Top stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Total Members</p>
          <div className="mt-3 flex items-baseline justify-between">
            <p className="text-2xl font-bold text-slate-900">{cards[0].value}</p>
            <span className="text-sm text-green-500">+12.5%</span>
          </div>
          <p className="mt-2 text-xs text-slate-400">vs last month</p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Total Payments</p>
          <div className="mt-3 flex items-baseline justify-between">
            <p className="text-2xl font-bold text-slate-900">
              {typeof paymentsData?.summary?.totalAmount === "number"
                ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(paymentsData.summary.totalAmount)
                : paymentsData?.summary?.totalAmount ?? paymentsData?.pagination?.total ?? cards[1].value}
            </p>
            <span className="text-sm text-green-500">+8.3%</span>
          </div>
          <p className="mt-2 text-xs text-slate-400">vs last month</p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Unresolved Messages</p>
          <div className="mt-3 flex items-baseline justify-between">
            <p className="text-2xl font-bold text-slate-900">{cards[2].value}</p>
            <span className="text-sm text-red-500">-5.2%</span>
          </div>
          <p className="mt-2 text-xs text-slate-400">vs last month</p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Admin Accounts</p>
          <div className="mt-3 flex items-baseline justify-between">
            <p className="text-2xl font-bold text-slate-900">{isSuperAdmin ? (loadingAdmins ? "..." : admins?.count ?? 0) : "—"}</p>
            <span className="text-sm text-green-500">+2</span>
          </div>
          <p className="mt-2 text-xs text-slate-400">vs last month</p>
        </div>
      </div>

      {/* <section className="relative overflow-hidden rounded-[2.5rem] border border-ornate bg-sun px-6 py-10 text-slate-950 shadow-elegant md:px-10 md:py-14">
        <div className="absolute inset-0 bg-glow opacity-60" aria-hidden />
        <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex rounded-full bg-white/90 px-4 py-2 text-xs uppercase tracking-[0.35em] text-orange-700 shadow-sm">
              Admin Control
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-slate-950/70">Dashboard Overview</p>
              <h1 className="mt-4 text-5xl font-display font-semibold tracking-tight text-slate-950 md:text-6xl">
                Welcome back, {admin?.firstName} {admin?.lastName}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-900/85 md:text-xl">
                Keep the samiti running smoothly with quick access to members, payments, messages, and admin operations.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                to="/admin/members"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-orange-700 shadow-gold transition hover:bg-slate-50"
              >
                Manage Members
              </Link>
              <Link
                to="/admin/payments"
                className="inline-flex items-center justify-center rounded-full border border-white/90 bg-white/10 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white/20"
              >
                View Payments
              </Link>
            </div>
          </div>

          
          <div className="rounded-[1.75rem] border border-white/30 bg-linear-to-r from-orange-400 to-orange-300 p-6 shadow-lg text-white">
            <div className="flex h-full items-center justify-between gap-6">
              <div className="max-w-[60%]">
                <p className="text-xs uppercase tracking-[0.35em]">Admin Dashboard</p>
                <h2 className="mt-3 text-3xl font-bold">Welcome back, {admin?.firstName}</h2>
                <p className="mt-3 text-sm opacity-90">Manage members, payments, contact requests, and administrative tasks from one polished control center.</p>
                <div className="mt-6 flex gap-3">
                  <Link to="/admin/members" className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-orange-700">Manage Members</Link>
                  <Link to="/admin/payments" className="rounded-full border border-white/60 px-4 py-2 text-sm font-medium text-white/90">View Payments</Link>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="rounded-xl bg-white/90 p-4">
                  <img src={shyamLogo} alt="monitor" className="h-36 w-48 object-contain" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Quick actions */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-slate-900">Quick Actions</h3>
        <div className="grid gap-3 sm:grid-cols-4">
          <Link to="/admin/members" className="flex items-center gap-3 rounded-lg border border-slate-100 p-4">
            <Users size={20} className="text-orange-500" />
            <div>
              <p className="text-sm font-semibold">Manage Members</p>
              <p className="text-xs text-slate-400">Add, edit and view members</p>
            </div>
          </Link>
          <Link to="/admin/payments" className="flex items-center gap-3 rounded-lg border border-slate-100 p-4">
            <CreditCard size={20} className="text-green-500" />
            <div>
              <p className="text-sm font-semibold">View Payments</p>
              <p className="text-xs text-slate-400">Track payments and transactions</p>
            </div>
          </Link>
          <Link to="/admin/contacts" className="flex items-center gap-3 rounded-lg border border-slate-100 p-4">
            <Mail size={20} className="text-blue-500" />
            <div>
              <p className="text-sm font-semibold">Contact Messages</p>
              <p className="text-xs text-slate-400">View and respond to messages</p>
            </div>
          </Link>
          <Link to="/admin/admins" className="flex items-center gap-3 rounded-lg border border-slate-100 p-4">
            <UserCog size={20} className="text-purple-500" />
            <div>
              <p className="text-sm font-semibold">Admin Management</p>
              <p className="text-xs text-slate-400">Manage admin accounts</p>
            </div>
          </Link>
        </div>
      </div>

      {/* <section className="grid gap-6 xl:grid-cols-[1.4fr_0.95fr]">
        <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => (
              <div key={card.label} className="rounded-3xl border border-slate-100 bg-slate-50 p-6 shadow-sm">
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${card.color}`}>
                  <card.icon size={22} />
                </div>
                <p className="text-sm text-slate-500">{card.label}</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">{card.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6 rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-orange-500">Action center</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">Keep the samiti running smoothly</h2>
          </div>
          <div className="grid gap-4">
            <div className="rounded-3xl bg-slate-50 p-6 shadow-sm">
              <p className="text-sm text-slate-500">Unresolved messages</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{loadingContacts ? "..." : contactsData?.pagination?.total ?? 0}</p>
              <p className="mt-2 text-sm text-slate-500">Respond to new contact requests from the public site.</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-6 shadow-sm">
              <p className="text-sm text-slate-500">Recent payments</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{loadingPayments ? "..." : paymentsData?.pagination?.total ?? 0}</p>
              <p className="mt-2 text-sm text-slate-500">Track payment entries and member donations in one place.</p>
            </div>
            {isSuperAdmin && (
              <div className="rounded-3xl bg-slate-50 p-6 shadow-sm">
                <p className="text-sm text-slate-500">Admin accounts</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">{loadingAdmins ? "..." : admins?.count ?? 0}</p>
                <p className="mt-2 text-sm text-slate-500">Add or remove admins from the management panel.</p>
              </div>
            )}
          </div>
          <div className="rounded-3xl border border-slate-200 bg-linear-to-r from-orange-50 to-white p-6">
            <p className="text-sm uppercase tracking-[0.32em] text-orange-500">Need a quick start?</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>• Review new member applications.</li>
              <li>• Confirm recent payments.</li>
              <li>• Reply to contact messages.</li>
            </ul>
          </div>
        </section> 
      </section> */}
    </div>
  );
};

export default DashboardPage;