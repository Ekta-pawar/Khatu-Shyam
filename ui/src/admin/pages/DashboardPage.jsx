import { Users, CreditCard, Mail, UserCog } from "lucide-react";
import { useSelector } from "react-redux";
import { useGetMembersQuery } from "../api/memberApi";
import { useGetPaymentsQuery } from "../api/paymentApi";
import { useGetContactMessagesQuery } from "../api/contactApi";

import { selectIsSuperAdmin } from "../features/auth/authSlice";
import {
  useGetProfileQuery,
  useListAdminsQuery,
} from "../api/adminApi";
const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
    <div
      className={`flex h-12 w-12 items-center justify-center rounded-lg ${color}`}
    >
      <Icon size={22} />
    </div>

    <div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
    </div>
  </div>
);

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
    <div className="flex flex-col gap-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Welcome, {admin?.firstName} {admin?.lastName}
        </h1>

        <p className="text-sm text-slate-500">
          Overview of your family member management system
        </p>
      </div>

      {/* Admin Profile Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-800">
          Admin Profile
        </h2>

        <div className="space-y-2">
          <p>
            <strong>Name:</strong> {admin?.firstName} {admin?.lastName}
          </p>

          <p>
            <strong>Email:</strong> {admin?.email}
          </p>

          <p>
            <strong>Phone:</strong> {admin?.phoneNumber}
          </p>

          <p>
            <strong>Role:</strong> {admin?.role}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-800">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Use the sidebar to add new members, record payments, and respond to
          contact messages submitted from the public website.
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;