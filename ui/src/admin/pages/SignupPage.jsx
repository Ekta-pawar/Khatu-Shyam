import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  password: "",
  phoneNumber: "",
};

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
      dispatch(setCredentials({ admin: response.data.admin, token: response.data.token }));
      toast.success("Super admin account created successfully");
      navigate("/admin/dashboard", { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error, "Signup failed. Please try again"));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 via-white to-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800">Create super admin</h1>
        <p className="mt-1 text-sm text-slate-500">
          This is only available before any admin account exists. The first account created becomes the super admin.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="First name"
              name="firstName"
              required
              value={form.firstName}
              onChange={handleChange}
              autoComplete="given-name"
            />
            <FormField
              label="Last name"
              name="lastName"
              required
              value={form.lastName}
              onChange={handleChange}
              autoComplete="family-name"
            />
          </div>
          <FormField
            label="Email address"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="admin@example.com"
            autoComplete="email"
          />
          <FormField
            label="Phone number"
            name="phoneNumber"
            type="tel"
            required
            value={form.phoneNumber}
            onChange={handleChange}
            autoComplete="tel"
          />
          <FormField
            label="Password"
            name="password"
            type="password"
            required
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            autoComplete="new-password"
          />

          <Button type="submit" isLoading={isLoading} className="mt-2 w-full" bgColor="bg-yellow-500" hoverColor="hover:bg-yellow-600" textColor="text-white">
            Create account
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
