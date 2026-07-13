import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, XCircle, Search, Eye, UserPlus } from "lucide-react";
import { toast } from "react-toastify";
import {
  useGetEnquiriesQuery,
  useUpdateEnquiryStatusMutation,
} from "../api/enquiryApi";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import Badge from "../components/Badge";
import Button from "../components/Button";
import Pagination from "../components/Pagination";
import { getErrorMessage } from "../utils/errorMessage";

const STATUS_OPTIONS = [
  { value: "", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "resolved", label: "Resolved" },
  { value: "rejected", label: "Rejected" },
];

const EnquiryManagementPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [status, setStatus] = useState("");
  const [activeId, setActiveId] = useState(null);

  const [updateStatus, { isLoading: isUpdating }] = useUpdateEnquiryStatusMutation();

  // ✅ FIX: Build query params cleanly without conditional mutation
  const queryParams = {
    page,
    limit: 12,
    ...(search && { search }),
    ...(status && { status }),
  };

  const { data, isFetching, isError, error } = useGetEnquiriesQuery(queryParams);

  const applySearch = useCallback(() => {
    setSearch(searchInput.trim());
    setPage(1);
  }, [searchInput]);

  const clearSearch = () => {
    setSearchInput("");
    setSearch("");
    setPage(1);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateStatus({ id, status: newStatus }).unwrap();
      toast.success("Status updated");
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not update enquiry"));
    }
  };

  // organisationName is built as "<tier> Membership Application" by
  // BecomeMemberPage.jsx — parse the tier back out to prefill the team form.
  // Only enquiries submitted from that form carry this suffix; sponsorship
  // enquiries etc. don't apply here.
  const isMembershipApplication = (enquiry) =>
    (enquiry.organisationName || "").endsWith("Membership Application");

  const handleConvertToTeamMember = (enquiry) => {
    const tier = enquiry.organisationName.replace(" Membership Application", "").trim();
    navigate("/admin/team/new", {
      state: {
        prefill: {
          fullName: enquiry.contactPerson || "",
          phone: enquiry.phone || "",
          email: enquiry.email || "",
          tier,
        },
      },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-yellow-500">Enquiries</h1>
        {/* <p className="text-sm text-slate-500">
          Review sponsorship enquiry submissions from the website.
        </p> */}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applySearch()}
            placeholder="Search by name, phone, or organisation…"
            className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-9 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
          />
          {searchInput && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <XCircle size={14} />
            </button>
          )}
        </div>

        <Button variant="secondary" onClick={applySearch} className="shrink-0">
          Search
        </Button>

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {!isFetching && data?.pagination && (
        <p className="text-xs text-slate-400">
          {data.pagination.total} enquier
          {data.pagination.total !== 1 ? "ies" : "y"} found
        </p>
      )}

      {isFetching && <Loader label="Loading enquiries…" />}
      {isError && (
        <EmptyState
          title="Could not load enquiries"
          description={getErrorMessage(error)}
        />
      )}
      {!isFetching && !isError && data?.enquiries?.length === 0 && (
        <EmptyState
          title="No enquiries found"
          description="Try another filter or search term."
        />
      )}

      <div className="space-y-3">
        {data?.enquiries?.map((enquiry) => {
          const isOpen = activeId === enquiry._id;
          return (
            <div
              key={enquiry._id}
              className="rounded-3xl border border-slate-200 bg-white shadow-sm"
            >
              <button
                onClick={() => setActiveId(isOpen ? null : enquiry._id)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <div className="min-w-0">
                  <p className="truncate text-lg font-semibold text-slate-900">
                    {enquiry.contactPerson || "Unknown"}
                  </p>
                  <p className="truncate text-sm text-slate-500">
                    {enquiry.organisationName || "No organisation"} ·{" "}
                    {enquiry.phone || "No phone"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    color={
                      enquiry.status === "resolved"
                        ? "green"
                        : enquiry.status === "rejected"
                        ? "slate"
                        : "yellow"
                    }
                  >
                    {enquiry.status}
                  </Badge>
                  <span className="hidden text-xs text-slate-400 sm:block">
                    {new Date(enquiry.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-slate-100 px-5 py-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="text-sm font-semibold text-slate-700">Email</p>
                      <p className="text-slate-600">{enquiry.email || "—"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700">Amount</p>
                      <p className="text-slate-600">
                        {enquiry.amount ? `₹${enquiry.amount}` : "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700">Address</p>
                      <p className="text-slate-600">{enquiry.address || "—"}</p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                    <p className="font-semibold text-slate-800">Message</p>
                    <p className="whitespace-pre-wrap">
                      {enquiry.message || "No message provided."}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {enquiry.status !== "resolved" && (
                      <Button
                        variant="outline"
                        disabled={isUpdating}
                        onClick={() => handleStatusChange(enquiry._id, "resolved")}
                      >
                        <CheckCircle2 size={16} /> Resolve
                      </Button>
                    )}
                    {enquiry.status !== "rejected" && (
                      <Button
                        variant="danger"
                        disabled={isUpdating}
                        onClick={() => handleStatusChange(enquiry._id, "rejected")}
                      >
                        <XCircle size={16} /> Reject
                      </Button>
                    )}
                    {/* {isMembershipApplication(enquiry) && (
                      <Button
                        variant="primary"
                        className="flex items-center gap-2"
                        onClick={() => handleConvertToTeamMember(enquiry)}
                      >
                        <UserPlus size={16} /> Convert to Team Member
                      </Button>
                    )} */}
                    <Button
                      variant="secondary"
                      className="flex items-center gap-2"
                      disabled
                    >
                      <Eye size={16} /> Details
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Pagination
        page={page}
        totalPages={data?.pagination?.totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default EnquiryManagementPage;