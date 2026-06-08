import { useState } from "react";
import { CheckCircle2, Trash2, Mail, MailOpen } from "lucide-react";
import toast from "react-hot-toast";
import {
  useGetContactMessagesQuery,
  useResolveContactMessageMutation,
  useDeleteContactMessageMutation,
} from "../api/contactApi";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import Badge from "../components/Badge";
import Button from "../components/Button";
import Pagination from "../components/Pagination";
import { getErrorMessage } from "../utils/errorMessage";

const ContactMessagesPage = () => {
  const [page, setPage] = useState(1);
  const [activeId, setActiveId] = useState(null);

  const { data, isFetching, isError, error } = useGetContactMessagesQuery({ page, limit: 12 });
  const [resolveMessage] = useResolveContactMessageMutation();
  const [deleteMessage] = useDeleteContactMessageMutation();

  const handleResolve = async (id) => {
    try {
      await resolveMessage(id).unwrap();
      toast.success("Marked as resolved");
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to update message"));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message permanently?")) return;
    try {
      await deleteMessage(id).unwrap();
      toast.success("Message deleted");
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to delete message"));
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Contact messages</h1>
        <p className="text-sm text-slate-500">Messages submitted through the public contact form</p>
      </div>

      {isFetching && <Loader label="Loading messages..." />}
      {isError && <EmptyState title="Could not load messages" description={getErrorMessage(error)} />}
      {!isFetching && data?.messages?.length === 0 && <EmptyState title="No messages yet" />}

      <div className="flex flex-col gap-3">
        {data?.messages?.map((message) => {
          const isOpen = activeId === message._id;
          return (
            <div key={message._id} className="rounded-xl border border-slate-200 bg-white shadow-sm">
              <button
                onClick={() => setActiveId(isOpen ? null : message._id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <div className="flex items-center gap-3">
                  {message.isRead ? <MailOpen size={18} className="text-slate-400" /> : <Mail size={18} className="text-orange-500" />}
                  <div>
                    <p className="font-semibold text-slate-800">{message.subject}</p>
                    <p className="text-sm text-slate-500">{message.name} · {message.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge color={message.isResolved ? "green" : "yellow"}>{message.isResolved ? "Resolved" : "Pending"}</Badge>
                  <span className="text-xs text-slate-400">{new Date(message.createdAt).toLocaleDateString()}</span>
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-slate-100 px-5 py-4">
                  <p className="text-sm text-slate-600">{message.message}</p>
                  {message.phone && <p className="mt-2 text-xs text-slate-400">Phone: {message.phone}</p>}

                  <div className="mt-4 flex gap-2">
                    {!message.isResolved && (
                      <Button variant="outline" onClick={() => handleResolve(message._id)}>
                        <CheckCircle2 size={16} /> Mark resolved
                      </Button>
                    )}
                    <Button variant="danger" onClick={() => handleDelete(message._id)}>
                      <Trash2 size={16} /> Delete
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Pagination page={page} totalPages={data?.pagination?.totalPages} onPageChange={setPage} />
    </div>
  );
};

export default ContactMessagesPage;
