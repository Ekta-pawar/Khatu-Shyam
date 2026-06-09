import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  useListAdminsQuery,
  useCreateAdminMutation,
  useToggleAdminStatusMutation,
} from "../api/adminApi";
import { selectCurrentAdmin } from "../features/auth/authSlice";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import Badge from "../components/Badge";
import Button from "../components/Button";
import FormField from "../components/FormField";
import { getErrorMessage } from "../utils/errorMessage";

const ROLE_OPTIONS = [
  { value: "admin", label: "Admin" },
  { value: "super_admin", label: "Super Admin" },
];

const initialForm = { firstName: "", lastName: "", email: "", phoneNumber: "", password: "", role: "admin" };

const CreateAdminModal = ({ onClose }) => {
  const [form, setForm] = useState(initialForm);
  const [createAdmin, { isLoading }] = useCreateAdminMutation();

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAdmin(form).unwrap();
      toast.success("Admin created successfully");
      onClose();
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to create admin"));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-lg font-bold text-slate-800">Create new admin</h2>
        <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="First name" name="firstName" required value={form.firstName} onChange={handleChange} />
          <FormField label="Last name" name="lastName" required value={form.lastName} onChange={handleChange} />
          <FormField label="Email" name="email" type="email" required value={form.email} onChange={handleChange} />
          <FormField label="Phone number" name="phoneNumber" required value={form.phoneNumber} onChange={handleChange} />
          <FormField label="Password" name="password" type="password" required value={form.password} onChange={handleChange} />
          <FormField as="select" label="Role" name="role" options={ROLE_OPTIONS} value={form.role} onChange={handleChange} />

          <div className="sm:col-span-2 flex justify-end gap-3">
            <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
            <Button type="submit" isLoading={isLoading}>Create admin</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AdminManagementPage = () => {
  const currentAdmin = useSelector(selectCurrentAdmin);
  const [showModal, setShowModal] = useState(false);
  const { data, isFetching, isError, error } = useListAdminsQuery();
  const [toggleStatus] = useToggleAdminStatusMutation();

  const handleToggle = async (id) => {
    try {
      await toggleStatus(id).unwrap();
      toast.success("Admin status updated");
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to update admin status"));
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Admins</h1>
          <p className="text-sm text-slate-500">Manage administrator accounts</p>
        </div>
        <Button onClick={() => setShowModal(true)}>
          <Plus size={16} /> New admin
        </Button>
      </div>

      {isFetching && <Loader label="Loading admins..." />}
      {isError && <EmptyState title="Could not load admins" description={getErrorMessage(error)} />}

      {!isFetching && data?.admins?.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Name</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Email</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Role</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Status</th>
                <th className="px-4 py-3 text-right font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.admins.map((admin) => (
                <tr key={admin._id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{admin.firstName} {admin.lastName}</td>
                  <td className="px-4 py-3 text-slate-600">{admin.email}</td>
                  <td className="px-4 py-3"><Badge color="orange">{admin.role.replace("_", " ")}</Badge></td>
                  <td className="px-4 py-3"><Badge color={admin.isActive ? "green" : "slate"}>{admin.isActive ? "Active" : "Inactive"}</Badge></td>
                  <td className="px-4 py-3 text-right">
                    {admin.role !== "super_admin" && admin._id !== currentAdmin?._id && (
                      <Button variant="outline" onClick={() => handleToggle(admin._id)}>
                        {admin.isActive ? "Deactivate" : "Activate"}
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && <CreateAdminModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default AdminManagementPage;
