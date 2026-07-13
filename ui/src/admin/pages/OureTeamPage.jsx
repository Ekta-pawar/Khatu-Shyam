import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Eye, Pencil, Trash2, Phone, X } from "lucide-react";
import { toast } from "react-toastify";
import { useGetTeamMembersQuery, useDeleteTeamMemberMutation } from "../api/teamApi";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import FormField from "../components/FormField";
import Badge from "../components/Badge";
import { getErrorMessage } from "../utils/errorMessage";

const initials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

const TeamMemberCard = ({ member, onDelete, isDeleting }) => (
  <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
    <div className="flex items-start gap-3">
      {member.profileImage ? (
        <img
          src={member.profileImage}
          alt={member.fullName}
          className="h-14 w-14 shrink-0 rounded-xl object-cover ring-1 ring-slate-200"
        />
      ) : (
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-yellow-50 text-sm font-semibold text-yellow-700 ring-1 ring-slate-200">
          {initials(member.fullName) || "?"}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-slate-900">{member.fullName || "Unnamed"}</p>
        <p className="truncate text-xs text-slate-500">{member.designation || member.occupation || "Team member"}</p>
        <div className="mt-1.5">
          <Badge color="yellow">{member.tier}</Badge>
        </div>
      </div>
    </div>

    <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3 text-xs text-slate-600">
      {member.phone && (
        <p className="flex items-center gap-1.5 font-mono">
          <Phone size={11} className="text-slate-400" /> {member.phone}
        </p>
      )}
    </div>

    <div className="mt-4 flex items-center justify-end gap-1 border-t border-slate-100 pt-3">
      <Link
        to={`/admin/team/${member._id}`}
        className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-yellow-50 hover:text-yellow-700"
        title="View"
      >
        <Eye size={16} />
      </Link>
      <Link
        to={`/admin/team/${member._id}/edit`}
        className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-200/70 hover:text-slate-700"
        title="Edit"
      >
        <Pencil size={16} />
      </Link>
      <button
        onClick={() => onDelete(member._id, member.fullName)}
        disabled={isDeleting}
        className="rounded-lg p-2 text-rose-500 transition-colors hover:bg-rose-50 disabled:opacity-50"
        title="Delete"
      >
        <Trash2 size={16} />
      </button>
    </div>
  </div>
);

const OureTeamPage = () => {
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");

  const { data, isFetching, isError, error } = useGetTeamMembersQuery({});
  const [deleteTeamMember, { isLoading: isDeleting }] = useDeleteTeamMemberMutation();

  const allMembers = data?.teamMembers ?? [];
  const teamMembers = appliedSearch
    ? allMembers.filter((m) =>
        [m.fullName, m.phone, m.email, m.city, m.tier]
          .filter(Boolean)
          .some((field) => field.toLowerCase().includes(appliedSearch.toLowerCase()))
      )
    : allMembers;

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setAppliedSearch(search.trim());
  };

  const clearSearch = () => {
    setSearch("");
    setAppliedSearch("");
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Remove team member "${name}"? This will also remove their uploaded photo.`)) return;
    try {
      await deleteTeamMember(id).unwrap();
      toast.success("Team member removed successfully");
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to remove team member"));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-yellow-500">Our Team</h1>
          {/* <p className="mt-1 text-sm text-slate-500">
            {teamMembers.length} member{teamMembers.length !== 1 ? "s" : ""} shown on the public /team page.
          </p> */}
        </div>
        {/* <Link to="/admin/team/new" className="shrink-0">
          <Button className="w-full justify-center gap-2 sm:w-auto">
            <Plus size={16} /> Add team member
          </Button>
        </Link> */}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
        <form onSubmit={handleSearchSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <FormField
              name="search"
              placeholder="Search team members by name, phone, email, city, or tier…"
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

      {isFetching && <Loader label="Loading team…" />}

      {isError && (
        <EmptyState title="Could not load team" description={getErrorMessage(error, "Please try again")} />
      )}

      {!isFetching && !isError && teamMembers.length === 0 && (
        <EmptyState
          title="No team members found"
          description="Try adjusting your search or add a new team member to get started."
          // action={
          //   <Link to="/admin/team/new" className="mt-2">
          //     <Button className="gap-2">
          //       <Plus size={16} /> Add team member
          //     </Button>
          //   </Link>
          // }
        />
      )}

      {!isFetching && teamMembers.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member._id} member={member} onDelete={handleDelete} isDeleting={isDeleting} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OureTeamPage;
