import { useState } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import {
  useGetPaymentsQuery,
  useRecordOfflinePaymentMutation,
  useUpdatePaymentStatusMutation,
} from "../api/paymentApi";
import { useGetMembersQuery } from "../api/memberApi";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import Badge from "../components/Badge";
import FormField from "../components/FormField";
import Pagination from "../components/Pagination";
import { getErrorMessage } from "../utils/errorMessage";

const STATUS_COLORS = { pending: "yellow", paid: "green", failed: "red", refunded: "slate" };
const PAYMENT_MODES = ["cash", "cheque", "bank_transfer", "upi", "card", "other"].map((m) => ({ value: m, label: m.replace("_", " ") }));
const STATUS_OPTIONS = ["pending", "paid", "failed", "refunded"].map((s) => ({ value: s, label: s }));

const initialOfflineForm = {
  member: "",
  amount: "",
  purpose: "",
  paymentDate: "",
  paymentMode: "",
  referenceNumber: "",
  collectedBy: "",
  note: "",
};

const RecordPaymentModal = ({ onClose }) => {
  const [form, setForm] = useState(initialOfflineForm);
  const { data: membersData } = useGetMembersQuery({ page: 1, limit: 100 });
  const [recordPayment, { isLoading }] = useRecordOfflinePaymentMutation();

  const handleChange = (event) => setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.member || !form.amount || !form.paymentDate || !form.paymentMode || !form.collectedBy) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await recordPayment({
        member: form.member,
        amount: Number(form.amount),
        purpose: form.purpose || undefined,
        offlineDetails: {
          amount: Number(form.amount),
          paymentDate: form.paymentDate,
          paymentMode: form.paymentMode,
          referenceNumber: form.referenceNumber || undefined,
          collectedBy: form.collectedBy,
          note: form.note || undefined,
        },
      }).unwrap();
      toast.success("Payment recorded successfully");
      onClose();
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to record payment"));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-lg font-bold text-slate-800">Record offline payment</h2>
        <p className="mt-1 text-sm text-slate-500">
          Online payments via Razorpay are coming soon. For now, record offline collections here.
        </p>

        <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <FormField
              as="select"
              label="Member"
              name="member"
              required
              options={(membersData?.members || []).map((m) => ({ value: m._id, label: `${m.fullName} (${m.phone})` }))}
              value={form.member}
              onChange={handleChange}
            />
          </div>
          <FormField label="Amount (₹)" name="amount" type="number" min="1" required value={form.amount} onChange={handleChange} />
          <FormField label="Purpose" name="purpose" value={form.purpose} onChange={handleChange} placeholder="Membership contribution" />
          <FormField label="Payment date" name="paymentDate" type="date" required value={form.paymentDate} onChange={handleChange} />
          <FormField as="select" label="Payment mode" name="paymentMode" required options={PAYMENT_MODES} value={form.paymentMode} onChange={handleChange} />
          <FormField label="Reference number" name="referenceNumber" value={form.referenceNumber} onChange={handleChange} />
          <FormField label="Collected by" name="collectedBy" required value={form.collectedBy} onChange={handleChange} />
          <div className="sm:col-span-2">
            <FormField as="textarea" label="Note" name="note" value={form.note} onChange={handleChange} />
          </div>

          <div className="sm:col-span-2 flex justify-end gap-3">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isLoading}>
              Record payment
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const PaymentManagementPage = () => {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { data, isFetching, isError, error } = useGetPaymentsQuery({ page, limit: 12, status: statusFilter });
  const [updateStatus] = useUpdatePaymentStatusMutation();

  const handleStatusChange = async (id, status) => {
    try {
      await updateStatus({ id, status }).unwrap();
      toast.success("Payment status updated");
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to update status"));
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Payments</h1>
          <p className="text-sm text-slate-500">Track membership contributions and payments</p>
        </div>
        <Button onClick={() => setShowModal(true)}>
          <Plus size={16} /> Record payment
        </Button>
      </div>

      <div className="max-w-xs">
        <FormField
          as="select"
          name="status"
          label="Filter by status"
          options={STATUS_OPTIONS}
          value={statusFilter}
          onChange={(e) => {
            setPage(1);
            setStatusFilter(e.target.value);
          }}
        />
      </div>

      {isFetching && <Loader label="Loading payments..." />}
      {isError && <EmptyState title="Could not load payments" description={getErrorMessage(error)} />}

      {!isFetching && data?.payments?.length === 0 && (
        <EmptyState title="No payments found" description="Record an offline payment to get started." />
      )}

      {!isFetching && data?.payments?.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Member</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Amount</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Type</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Reference</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.payments.map((payment) => (
                <tr key={payment._id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-800">{payment.member?.firstName} {payment.member?.lastName}</p>
                    <p className="text-xs text-slate-400">{payment.member?.phone}</p>
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-700">₹{payment.amount}</td>
                  <td className="px-4 py-3 capitalize text-slate-600">{payment.typeOfPayment}</td>
                  <td className="px-4 py-3 text-slate-500">{payment.transactionRef}</td>
                  <td className="px-4 py-3">
                    <select
                      value={payment.status}
                      onChange={(e) => handleStatusChange(payment._id, e.target.value)}
                      className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-medium capitalize"
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    <span className="ml-2">
                      <Badge color={STATUS_COLORS[payment.status]}>{payment.status}</Badge>
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{new Date(payment.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="px-4 py-3">
            <Pagination page={page} totalPages={data.pagination?.totalPages} onPageChange={setPage} />
          </div>
        </div>
      )}

      {showModal && <RecordPaymentModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default PaymentManagementPage;
