import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  MapPin,
  Phone,
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

const initials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

const StatusBadge = ({ active }) => (
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

const GuestCard = ({ guest, onDelete, isDeleting }) => (
  <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
    <div className="flex items-start gap-3">
      {guest.profileImage ? (
        <img
          src={guest.profileImage}
          alt={guest.fullName}
          className="h-14 w-14 shrink-0 rounded-xl object-cover ring-1 ring-slate-200"
        />
      ) : (
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-yellow-50 text-sm font-semibold text-yellow-700 ring-1 ring-slate-200">
          {initials(guest.fullName) || "?"}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-slate-900">{guest.fullName || "Unnamed guest"}</p>
        <p className="truncate text-xs text-slate-500">{guest.tier || "No tier set"}</p>
        <div className="mt-1.5">
          <StatusBadge active={guest.isActive} />
        </div>
      </div>
    </div>

    <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3 text-xs text-slate-600">
      {guest.phone && (
        <p className="flex items-center gap-1.5 font-mono">
          <Phone size={11} className="text-slate-400" /> {guest.phone}
        </p>
      )}
      {(guest.city || guest.state) && (
        <p className="flex items-center gap-1.5">
          <MapPin size={11} className="text-slate-400" />
          {[guest.city, guest.state].filter(Boolean).join(", ")}
        </p>
      )}
    </div>

    <div className="mt-4 flex items-center justify-end gap-1 border-t border-slate-100 pt-3">
      <Link
        to={`/admin/members/${guest._id}`}
        className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-yellow-50 hover:text-yellow-700"
        title="View"
      >
        <Eye size={16} />
      </Link>
      <Link
        to={`/admin/members/${guest._id}/edit`}
        className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-200/70 hover:text-slate-700"
        title="Edit"
      >
        <Pencil size={16} />
      </Link>
      <button
        onClick={() => onDelete(guest._id, guest.fullName)}
        disabled={isDeleting}
        className="rounded-lg p-2 text-rose-500 transition-colors hover:bg-rose-50 disabled:opacity-50"
        title="Delete"
      >
        <Trash2 size={16} />
      </button>
    </div>
  </div>
);

const OureGuestPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");

  const { data, isFetching, isError, error } = useGetMembersQuery({ page, limit: 12, search: appliedSearch });
  const [deleteMember, { isLoading: isDeleting }] = useDeleteMemberMutation();

  const guests = data?.members ?? [];
  const totalGuests = data?.pagination?.total ?? guests.length;

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

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Remove guest "${name}"? This will also remove their uploaded images.`)) return;
    try {
      await deleteMember(id).unwrap();
      toast.success("Guest removed successfully");
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to remove guest"));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-yellow-500">Our Guest</h1>
          <p className="mt-1 text-sm text-slate-500">
            {totalGuests} guest{totalGuests !== 1 ? "s" : ""} on record.
          </p>
        </div>
        {/* <Link to="/admin/members/new" className="shrink-0">
          <Button className="w-full justify-center gap-2 sm:w-auto">
            <Plus size={16} /> Add guest
          </Button>
        </Link> */}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
        <form onSubmit={handleSearchSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <FormField
              name="search"
              placeholder="Search guests by name, phone, email, or city…"
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
          <Button type="submit" variant="primary" className="justify-center gap-2">
            <Search size={16} /> Search
          </Button>
        </form>
        {appliedSearch && (
          <p className="mt-3 text-xs text-slate-500">
            Showing results for <span className="font-medium text-slate-700">"{appliedSearch}"</span> ·{" "}
            <button type="button" onClick={clearSearch} className="text-yellow-700 hover:underline">
              clear
            </button>
          </p>
        )}
      </div>

      {isFetching && <Loader label="Loading guests…" />}

      {isError && (
        <EmptyState title="Could not load guests" description={getErrorMessage(error, "Please try again")} />
      )}

      {!isFetching && !isError && guests.length === 0 && (
        <EmptyState
          title="No guests found"
          description="Try adjusting your search or add a new guest to get started."
          // action={
          //   <Link to="/admin/members/new" className="mt-2">
          //     <Button className="gap-2">
          //       <Plus size={16} /> Add guest
          //     </Button>
          //   </Link>
          // }
        />
      )}

      {!isFetching && guests.length > 0 && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {guests.map((guest) => (
              <GuestCard key={guest._id} guest={guest} onDelete={handleDelete} isDeleting={isDeleting} />
            ))}
          </div>

          {/* <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <Pagination page={page} totalPages={data?.pagination?.totalPages} onPageChange={setPage} />
          </div> */}
        </>
      )}
    </div>
  );
};

export default OureGuestPage;
