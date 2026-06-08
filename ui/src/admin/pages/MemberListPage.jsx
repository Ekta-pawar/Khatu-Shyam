import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Eye, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useGetMembersQuery, useDeleteMemberMutation } from "../api/memberApi";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import FormField from "../components/FormField";
import Pagination from "../components/Pagination";
import { getErrorMessage } from "../utils/errorMessage";

const MemberListPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");

  const { data, isFetching, isError, error } = useGetMembersQuery({ page, limit: 12, search: appliedSearch });
  const [deleteMember, { isLoading: isDeleting }] = useDeleteMemberMutation();

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setPage(1);
    setAppliedSearch(search.trim());
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

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Members</h1>
          <p className="text-sm text-slate-500">Manage family member records</p>
        </div>
        <Link to="/admin/members/new">
          <Button>
            <Plus size={16} /> Add member
          </Button>
        </Link>
      </div>

      <form onSubmit={handleSearchSubmit} className="flex max-w-md gap-2">
        <FormField
          name="search"
          placeholder="Search by name, phone, email, or city"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <Button type="submit" variant="outline">
          <Search size={16} />
        </Button>
      </form>

      {isFetching && <Loader label="Loading members..." />}

      {isError && (
        <EmptyState title="Could not load members" description={getErrorMessage(error, "Please try again")} />
      )}

      {!isFetching && !isError && data?.members?.length === 0 && (
        <EmptyState
          title="No members found"
          description="Try adjusting your search or add a new family member to get started."
          action={
            <Link to="/admin/members/new" className="mt-2">
              <Button>
                <Plus size={16} /> Add member
              </Button>
            </Link>
          }
        />
      )}

      {!isFetching && data?.members?.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Member</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Phone</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">City</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Gender</th>
                <th className="px-4 py-3 text-right font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.members.map((member) => (
                <tr key={member._id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={member.profileImage?.url || "https://placehold.co/40x40?text=👤"}
                        alt={member.fullName}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-slate-800">{member.fullName}</p>
                        <p className="text-xs text-slate-400">{member.email || "No email"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{member.phone}</td>
                  <td className="px-4 py-3 text-slate-600">{member.city || "-"}</td>
                  <td className="px-4 py-3 capitalize text-slate-600">{member.gender}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/admin/members/${member._id}`} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" title="View">
                        <Eye size={16} />
                      </Link>
                      <Link to={`/admin/members/${member._id}/edit`} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" title="Edit">
                        <Pencil size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(member._id, member.fullName)}
                        disabled={isDeleting}
                        className="rounded-lg p-2 text-red-500 hover:bg-red-50 disabled:opacity-50"
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

          <div className="px-4 py-3">
            <Pagination page={page} totalPages={data.pagination?.totalPages} onPageChange={setPage} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberListPage;
