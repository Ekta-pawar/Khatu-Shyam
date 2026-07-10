import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  CreditCard,
  Gift,
  Mail,
  MessageSquare,
  ShieldCheck,
  UserCog,
  Users,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useGetMembersQuery } from "../api/memberApi";
import { useGetPaymentsQuery } from "../api/paymentApi";
import { useGetContactMessagesQuery } from "../api/contactApi";
import { selectIsSuperAdmin } from "../features/auth/authSlice";
import { useGetProfileQuery, useListAdminsQuery } from "../api/adminApi";

const formatCurrency = (value) => {
  if (typeof value !== "number") return value ?? 0;

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
};

const getTotal = (data) => data?.pagination?.total ?? data?.members?.length ?? data?.data?.length ?? 0;

const StatCard = ({ icon: Icon, label, value, detail, accent }) => (
  <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-100/50">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
        <p className="mt-3 text-2xl font-bold text-slate-900">{value}</p>
      </div>
      <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${accent}`}>
        <Icon size={20} />
      </div>
    </div>
    <p className="mt-3 text-xs text-slate-500">{detail}</p>
  </div>
);

const ActionTile = ({ to, icon: Icon, title, description, accent }) => (
  <Link
    to={to}
    className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md"
  >
    <div className="flex min-w-0 items-center gap-3">
      <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${accent}`}>
        <Icon size={20} />
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-slate-900">{title}</p>
        <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">{description}</p>
      </div>
    </div>
    <ArrowRight size={16} className="shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-orange-500" />
  </Link>
);

const DashboardPage = () => {
  const isSuperAdmin = useSelector(selectIsSuperAdmin);
  const { data: profileData } = useGetProfileQuery();
  const admin = profileData?.data?.admin;

  const { data: membersData, isFetching: loadingMembers } = useGetMembersQuery({
    page: 1,
    limit: 1,
  });
  const { data: paymentsData, isFetching: loadingPayments } = useGetPaymentsQuery({
    page: 1,
    limit: 1,
  });
  const { data: contactsData, isFetching: loadingContacts } = useGetContactMessagesQuery({
    page: 1,
    limit: 1,
    isResolved: "false",
  });
  const { data: admins, isFetching: loadingAdmins } = useListAdminsQuery(undefined, {
    skip: !isSuperAdmin,
  });

  const totalPayments =
    typeof paymentsData?.summary?.totalAmount === "number"
      ? formatCurrency(paymentsData.summary.totalAmount)
      : paymentsData?.summary?.totalAmount ?? paymentsData?.pagination?.total ?? 0;

  const stats = [
    {
      icon: Users,
      label: "Guests",
      value: loadingMembers ? "..." : getTotal(membersData),
      detail: "Registered samiti guests",
      accent: "bg-orange-50 text-orange-600",
    },
    {
      icon: CreditCard,
      label: "Payments",
      value: loadingPayments ? "..." : totalPayments,
      detail: "Collected and tracked payments",
      accent: "bg-emerald-50 text-emerald-600",
    },
    {
      icon: Mail,
      label: "Messages",
      value: loadingContacts ? "..." : contactsData?.pagination?.total ?? 0,
      detail: "Unresolved contact messages",
      accent: "bg-blue-50 text-blue-600",
    },
    {
      icon: UserCog,
      label: "Admins",
      value: isSuperAdmin ? (loadingAdmins ? "..." : admins?.count ?? 0) : "-",
      detail: isSuperAdmin ? "Admin accounts with access" : "Super admin only",
      accent: "bg-violet-50 text-violet-600",
    },
  ];

  const actions = [
    {
      to: "/admin/members",
      icon: Users,
      title: "Manage Guests",
      description: "Add, edit, search, and review guests",
      accent: "bg-orange-50 text-orange-600",
    },
    {
      to: "/admin/events",
      icon: CalendarDays,
      title: "Manage Events",
      description: "Publish upcoming and past events",
      accent: "bg-amber-50 text-amber-600",
    },
    {
      to: "/admin/payments",
      icon: CreditCard,
      title: "Payments",
      description: "Record and update payment status",
      accent: "bg-emerald-50 text-emerald-600",
    },
    {
      to: "/admin/contacts",
      icon: Mail,
      title: "Contact Messages",
      description: "Handle public website messages",
      accent: "bg-blue-50 text-blue-600",
    },
    {
      to: "/admin/enquiries",
      icon: MessageSquare,
      title: "Enquiries",
      description: "Follow up with new enquiries",
      accent: "bg-cyan-50 text-cyan-600",
    },
    {
      to: "/admin/sponsors",
      icon: Gift,
      title: "Sponsors",
      description: "Manage sponsor listings and details",
      accent: "bg-rose-50 text-rose-600",
    },
  ];

  if (isSuperAdmin) {
    actions.push({
      to: "/admin/admins",
      icon: ShieldCheck,
      title: "Admin Access",
      description: "Create and manage admin accounts",
      accent: "bg-violet-50 text-violet-600",
    });
  }

  return (
    <div className="space-y-5">
      <section className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm">
        <div className="grid gap-6 p-6 lg:grid-cols-[1.25fr_0.75fr] lg:p-7">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
              Admin Dashboard
            </p>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-yellow-500">
              Welcome back, {admin?.firstName || "Admin"}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
              Keep members, events, payments, messages, enquiries, sponsors, and admin access organized from one polished control center.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/admin/events"
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700"
              >
                Create Event
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Quick Actions</h2>
              <p className="text-sm text-slate-500">Jump into the most used admin workflows.</p>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {actions.map((action) => (
              <ActionTile key={action.to} {...action} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
