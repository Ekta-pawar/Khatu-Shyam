import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  Users,
  UserCheck,
  Wallet,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Download,
  X,
} from "lucide-react";
import { toast } from "react-toastify";
import { useGetMembersQuery, useDeleteMemberMutation } from "../api/memberApi";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import FormField from "../components/FormField";
import Pagination from "../components/Pagination";
import { getErrorMessage } from "../utils/errorMessage";

/* ---------- small presentational helpers ---------- */

const initials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

const StatusPill = ({ active }) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
      active
        ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20"
        : "bg-slate-100 text-slate-500 ring-1 ring-inset ring-slate-300"
    }`}
  >
    <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-emerald-500" : "bg-slate-400"}`} />
    {active ? "Active" : "Inactive"}
  </span>
);

const PaymentPill = ({ status }) => {
  const map = {
    paid: "bg-indigo-50 text-indigo-700 ring-indigo-600/20",
    pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
    overdue: "bg-rose-50 text-rose-700 ring-rose-600/20",
  };
  const label = status ? status.charAt(0).toUpperCase() + status.slice(1) : "Unknown";
  const cls = map[status] || "bg-slate-100 text-slate-600 ring-slate-300";
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${cls}`}>
      {label}
    </span>
  );
};

/* status rail color — signature element: a single signal on the left edge
   of every row, so payment + activity state reads in one glance down the list */
const railColor = (member) => {
  if (!member.isActive) return "bg-slate-300";
  if (member.paymentStatus === "overdue") return "bg-rose-500";
  if (member.paymentStatus === "pending") return "bg-amber-400";
  return "bg-emerald-500";
};

const SortButton = ({ label, field, sortField, sortDir, onSort }) => {
  const isActive = sortField === field;
  return (
    <button
      onClick={() => onSort(field)}
      className="group inline-flex items-center gap-1 font-semibold text-slate-600 transition-colors hover:text-slate-900"
    >
      {label}
      {isActive ? (
        sortDir === "asc" ? (
          <ArrowUp size={13} className="text-indigo-600" />
        ) : (
          <ArrowDown size={13} className="text-indigo-600" />
        )
      ) : (
        <ArrowUpDown size={13} className="text-slate-300 group-hover:text-slate-400" />
      )}
    </button>
  );
};

/* ---------- main page ---------- */

const MemberListPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortDir, setSortDir] = useState("asc");

  const { data, isFetching, isError, error } = useGetMembersQuery({ page, limit: 12, search: appliedSearch });
  const [deleteMember, { isLoading: isDeleting }] = useDeleteMemberMutation();

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setPage(1);
    setAppliedSearch(search.trim());
  };

  const clearSearch = () => {
    setSearch("");
    setAppliedSearch("");
    setPage(1);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete member "${name}"? This will also remove their uploaded images.`)) return;
    try {
      await deleteMember(id).unwrap();
      toast.success("Member deleted successfully");
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to delete member"));
    }
  };

  const sortedMembers = useMemo(() => {
    const list = data?.members ?? [];
    if (!sortField) return list;
    const sorted = [...list].sort((a, b) => {
      const av = (a[sortField] ?? "").toString().toLowerCase();
      const bv = (b[sortField] ?? "").toString().toLowerCase();
      if (av < bv) return -1;
      if (av > bv) return 1;
      return 0;
    });
    return sortDir === "asc" ? sorted : sorted.reverse();
  }, [data?.members, sortField, sortDir]);

  const totalMembers = data?.pagination?.total ?? data?.members?.length ?? 0;
  const activeCount = data?.members?.filter((member) => member.isActive).length ?? 0;
  const paidCount = data?.members?.filter((member) => member.paymentStatus === "paid").length ?? 0;
  const pageCount = data?.members?.length ?? 0;

  const summaryCards = [
    { label: "Total members", value: totalMembers, icon: Users, accent: "text-indigo-600 bg-indigo-50" },
    { label: "Active members", value: activeCount, icon: UserCheck, accent: "text-emerald-600 bg-emerald-50" },
    { label: "Paid this page", value: paidCount, icon: Wallet, accent: "text-amber-600 bg-amber-50" },
  ];

  return (
    <div className="space-y-6">
      {/* ---------- title + add button ---------- */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Members</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage family member records, track status, and act on records in one place.
          </p>
        </div>
        <Link to="/admin/members/new" className="shrink-0">
          <Button className="w-full justify-center gap-2 sm:w-auto">
            <Plus size={16} /> Add member
          </Button>
        </Link>
      </div>

      {/* ---------- stats row (full width) ---------- */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${card.accent}`}>
                <Icon size={18} />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{card.label}</p>
                <p className="text-2xl font-bold leading-tight text-slate-900 tabular-nums">{card.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ---------- search row (full width) ---------- */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <form onSubmit={handleSearchSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <FormField
              name="search"
              placeholder="Search members by name, phone, email, or city…"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="pl-9 pr-9"
            />
            {search && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>
          <div className="flex shrink-0 gap-2">
            <Button type="submit" variant="primary" className="flex-1 justify-center gap-2 sm:flex-none">
              <Search size={16} /> Search
            </Button>
            <button
              type="button"
              className="hidden items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 sm:inline-flex"
            >
              <Download size={14} /> Export
            </button>
          </div>
        </form>
        {appliedSearch && (
          <p className="mt-3 text-xs text-slate-500">
            Showing results for <span className="font-medium text-slate-700">"{appliedSearch}"</span> ·{" "}
            <button type="button" onClick={clearSearch} className="text-indigo-600 hover:underline">
              clear
            </button>
          </p>
        )}
      </div>

      {/* ---------- states ---------- */}
      {isFetching && <Loader label="Loading members…" />}

      {isError && (
        <EmptyState title="Could not load members" description={getErrorMessage(error, "Please try again")} />
      )}

      {!isFetching && !isError && pageCount === 0 && (
        <EmptyState
          title="No members found"
          description="Try adjusting your search or add a new family member to get started."
          action={
            <Link to="/admin/members/new" className="mt-2">
              <Button className="gap-2">
                <Plus size={16} /> Add member
              </Button>
            </Link>
          }
        />
      )}

      {/* ---------- table ---------- */}
      {!isFetching && pageCount > 0 && (
        <div className="admin-scrollbar overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="hidden md:block">
            <table className="w-full min-w-[960px] divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50/80">
                <tr>
                  <th className="px-5 py-3.5 text-left">
                    <SortButton label="Member" field="fullName" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                  </th>
                  <th className="px-5 py-3.5 text-left">
                    <SortButton label="Phone" field="phone" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                  </th>
                  <th className="px-5 py-3.5 text-left">
                    <SortButton label="City" field="city" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                  </th>
                  <th className="px-5 py-3.5 text-left font-semibold text-slate-600">Status</th>
                  <th className="px-5 py-3.5 text-left font-semibold text-slate-600">Payment</th>
                  <th className="px-5 py-3.5 text-right font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sortedMembers.map((member) => (
                  <tr key={member._id} className="group relative transition-colors hover:bg-slate-50">
                    <td className="relative px-5 py-3.5">
                      <span className={`absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full ${railColor(member)}`} />
                      <div className="flex items-center gap-3">
                        {member.profileImage?.url ? (
                          <img
                            src={member.profileImage.url}
                            alt={member.fullName}
                            className="h-10 w-10 rounded-full object-cover ring-1 ring-slate-200"
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-xs font-semibold text-indigo-600 ring-1 ring-slate-200">
                            {initials(member.fullName) || "?"}
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-slate-900">{member.fullName}</p>
                          <p className="text-xs text-slate-500">{member.email || "No email on file"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-mono text-[13px] text-slate-600">{member.phone}</td>
                    <td className="px-5 py-3.5 text-slate-600">{member.city || "—"}</td>
                    <td className="px-5 py-3.5">
                      <StatusPill active={member.isActive} />
                    </td>
                    <td className="px-5 py-3.5">
                      <PaymentPill status={member.paymentStatus} />
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1 opacity-70 transition-opacity group-hover:opacity-100">
                        <Link
                          to={`/admin/members/${member._id}`}
                          className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                          title="View"
                        >
                          <Eye size={16} />
                        </Link>
                        <Link
                          to={`/admin/members/${member._id}/edit`}
                          className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-200/70 hover:text-slate-700"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(member._id, member.fullName)}
                          disabled={isDeleting}
                          className="rounded-lg p-2 text-rose-500 transition-colors hover:bg-rose-50 disabled:opacity-50"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* mobile cards */}
          <div className="space-y-3 p-4 md:hidden">
            {sortedMembers.map((member) => (
              <div key={member._id} className="relative overflow-hidden rounded-xl border border-slate-200 p-4">
                <span className={`absolute left-0 top-0 h-full w-1 ${railColor(member)}`} />
                <div className="flex items-center justify-between gap-3 pl-2">
                  <div className="flex items-center gap-3">
                    {member.profileImage?.url ? (
                      <img
                        src={member.profileImage.url}
                        alt={member.fullName}
                        className="h-11 w-11 rounded-full object-cover ring-1 ring-slate-200"
                      />
                    ) : (
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-50 text-xs font-semibold text-indigo-600 ring-1 ring-slate-200">
                        {initials(member.fullName) || "?"}
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-slate-900">{member.fullName}</p>
                      <p className="font-mono text-xs text-slate-500">{member.phone}</p>
                    </div>
                  </div>
                  <StatusPill active={member.isActive} />
                </div>

                <div className="mt-3 flex items-center justify-between pl-2">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span>{member.city || "No city"}</span>
                    <span className="text-slate-300">·</span>
                    <PaymentPill status={member.paymentStatus} />
                  </div>
                  <div className="flex items-center gap-1">
                    <Link to={`/admin/members/${member._id}`} className="rounded-lg p-2 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600" title="View">
                      <Eye size={16} />
                    </Link>
                    <Link to={`/admin/members/${member._id}/edit`} className="rounded-lg p-2 text-slate-500 hover:bg-slate-200/70" title="Edit">
                      <Pencil size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(member._id, member.fullName)}
                      disabled={isDeleting}
                      className="rounded-lg p-2 text-rose-500 hover:bg-rose-50 disabled:opacity-50"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 px-5 py-4">
            <Pagination page={page} totalPages={data.pagination?.totalPages} onPageChange={setPage} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberListPage;