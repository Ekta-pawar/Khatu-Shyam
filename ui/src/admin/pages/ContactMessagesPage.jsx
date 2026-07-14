import { useState, useCallback } from "react";
import { CheckCircle2, Trash2, Mail, MailOpen, Search, X } from "lucide-react";
import { toast } from "react-toastify";
import {
  useGetContactMessagesQuery,
  useMarkContactAsReadMutation,
  useResolveContactMessageMutation,
  useDeleteContactMessageMutation,
} from "../api/contactApi";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import Badge from "../components/Badge";
import Button from "../components/Button";
import Pagination from "../components/Pagination";
import ConfirmDialog from "../components/ConfirmDialog";
import { getErrorMessage } from "../utils/errorMessage";

const LIMIT = 10;

const READ_OPTIONS = [
  { value: "", label: "All messages" },
  { value: "false", label: "Unread" },
  { value: "true", label: "Read" },
];

const RESOLVED_OPTIONS = [
  { value: "", label: "Any status" },
  { value: "false", label: "Pending" },
  { value: "true", label: "Resolved" },
];

const ContactMessagesPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [isRead, setIsRead] = useState("");
  const [isResolved, setIsResolved] = useState("");
  const [activeId, setActiveId] = useState(null);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const queryParams = { page, limit: LIMIT };
  if (search) queryParams.search = search;
  if (isRead !== "") queryParams.isRead = isRead;
  if (isResolved !== "") queryParams.isResolved = isResolved;

  const { data, isFetching, isError, error } = useGetContactMessagesQuery(queryParams);

  const [markAsRead] = useMarkContactAsReadMutation();
  const [resolveMessage] = useResolveContactMessageMutation();
  const [deleteMessage] = useDeleteContactMessageMutation();

  const applySearch = useCallback(() => {
    setSearch(searchInput.trim());
    setPage(1);
  }, [searchInput]);

  const clearSearch = () => {
    setSearchInput("");
    setSearch("");
    setPage(1);
  };

  const handleFilterChange = (setter) => (e) => {
    setter(e.target.value);
    setPage(1);
  };

  const handleMarkRead = async (id) => {
    try {
      await markAsRead(id).unwrap();
      toast.success("Marked as read");
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to update message"));
    }
  };

  const handleResolve = async (id) => {
    try {
      await resolveMessage(id).unwrap();
      toast.success("Marked as resolved");
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to update message"));
    }
  };

  const handleDelete = (id) => {
    setPendingDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!pendingDeleteId) return;
    setIsDeleting(true);
    try {
      await deleteMessage(pendingDeleteId).unwrap();
      toast.success("Message deleted");
      if (activeId === pendingDeleteId) setActiveId(null);
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to delete message"));
    } finally {
      setIsDeleting(false);
      setPendingDeleteId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-yellow-500">Contact Messages</h1>
        {/* <p className="text-sm text-slate-500">Messages submitted through the public contact form</p> */}
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applySearch()}
            placeholder="Search by name, email, phone, subject…"
            className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-9 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
          />
          {searchInput && (
            <button onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <X size={14} />
            </button>
          )}
        </div>

        <Button variant="secondary" onClick={applySearch} className="shrink-0">
          Search
        </Button>

        <select
          value={isRead}
          onChange={handleFilterChange(setIsRead)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
        >
          {READ_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>

        <select
          value={isResolved}
          onChange={handleFilterChange(setIsResolved)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
        >
          {RESOLVED_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Results summary */}
      {!isFetching && data?.pagination && (
        <p className="text-xs text-slate-400">
          {data.pagination.total} message{data.pagination.total !== 1 ? "s" : ""} found
        </p>
      )}

      {isFetching && <Loader label="Loading messages…" />}
      {isError && <EmptyState title="Could not load messages" description={getErrorMessage(error)} />}
      {!isFetching && !isError && data?.messages?.length === 0 && (
        <EmptyState title="No messages found" description="Try adjusting your search or filters." />
      )}

      {/* Message list */}
      <div className="flex flex-col gap-3">
        {data?.messages?.map((message) => {
          const isOpen = activeId === message._id;
          return (
            <div key={message._id} className="rounded-xl border border-slate-200 bg-white shadow-sm">
              <button
                onClick={() => setActiveId(isOpen ? null : message._id)}
                className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
              >
                <div className="flex items-start gap-3 min-w-0">
                  {message.isRead ? (
                    <MailOpen size={18} className="mt-0.5 shrink-0 text-slate-400" />
                  ) : (
                    <Mail size={18} className="mt-0.5 shrink-0 text-orange-500" />
                  )}
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-800">{message.subject}</p>
                    <p className="truncate text-sm text-slate-500">
                      {message.name} · {message.email}
                      {message.phone && ` · ${message.phone}`}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {!message.isRead && (
                    <span className="h-2 w-2 rounded-full bg-orange-500" title="Unread" />
                  )}
                  <Badge color={message.isResolved ? "green" : "yellow"}>
                    {message.isResolved ? "Resolved" : "Pending"}
                  </Badge>
                  <span className="hidden text-xs text-slate-400 sm:block">
                    {new Date(message.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-slate-100 px-5 py-4">
                  <p className="whitespace-pre-wrap text-sm text-slate-700">{message.message}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {!message.isRead && (
                      <Button variant="outline" onClick={() => handleMarkRead(message._id)}>
                        <MailOpen size={15} /> Mark as Read
                      </Button>
                    )}
                    {!message.isResolved && (
                      <Button variant="outline" onClick={() => handleResolve(message._id)}>
                        <CheckCircle2 size={15} /> Mark Resolved
                      </Button>
                    )}
                    <Button variant="danger" onClick={() => handleDelete(message._id)}>
                      <Trash2 size={15} /> Delete
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Pagination page={page} totalPages={data?.pagination?.totalPages} onPageChange={setPage} />

      <ConfirmDialog
        open={!!pendingDeleteId}
        title="Delete message"
        message="Delete this message permanently?"
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setPendingDeleteId(null)}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default ContactMessagesPage;
