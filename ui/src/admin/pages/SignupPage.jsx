import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import FormField from "../components/FormField";
import Button from "../components/Button";
import { useSignupMutation } from "../api/adminApi";
import { setCredentials } from "../features/auth/authSlice";
import { getErrorMessage } from "../utils/errorMessage";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
};

/**
 * Signup is intentionally limited to bootstrapping the very first super admin —
 * the backend rejects this endpoint once any admin already exists. Subsequent
 * admins are created from the dashboard by an existing super admin.
 */
const SignupPage = () => {
  const [form, setForm] = useState(initialForm);
  const [signup, { isLoading }] = useSignupMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await signup(form).unwrap();
      dispatch(setCredentials({ admin: response.data.admin }));
      toast.success("Super admin account created");
      navigate("/admin/dashboard", { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error, "Signup failed. Please try again"));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 via-white to-slate-100 px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800">Create Super Admin</h1>
        <p className="mt-1 text-sm text-slate-500">
          This sets up the first administrator account. Once created, signup is closed and new admins can only be
          added from the dashboard.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="First name" name="firstName" required value={form.firstName} onChange={handleChange} />
          <FormField label="Last name" name="lastName" required value={form.lastName} onChange={handleChange} />
          <FormField label="Email address" name="email" type="email" required value={form.email} onChange={handleChange} />
          <FormField label="Phone number" name="phoneNumber" required value={form.phoneNumber} onChange={handleChange} />
          <div className="sm:col-span-2">
            <FormField
              label="Password"
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
            />
          </div>

          <Button type="submit" isLoading={isLoading} className="sm:col-span-2">
            Create account
          </Button>
        </form>

      
      </div>
    </div>
  );
};

export default SignupPage;
