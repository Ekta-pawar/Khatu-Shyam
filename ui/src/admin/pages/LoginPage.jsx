import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import FormField from "../components/FormField";
import Button from "../components/Button";
import { useLoginMutation } from "../api/adminApi";
import { setCredentials } from "../features/auth/authSlice";
import { getErrorMessage } from "../utils/errorMessage";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from?.pathname || "/admin/dashboard";

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login(form).unwrap();
      dispatch(setCredentials({ admin: response.data.admin, token: response.data.token }));
      toast.success("Welcome back!");
      navigate(redirectTo, { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error, "Login failed. Check your credentials"));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-orange-50 via-white to-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-yellow-500">Admin Login</h1>
        <p className="mt-1 text-sm text-slate-500">Sign in to access the Family Member Management dashboard.</p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
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
            label="Password"
            name="password"
            type="password"
            required
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            autoComplete="current-password"
          />

          <Button type="submit" isLoading={isLoading} className="mt-2 w-full" bgColor="bg-yellow-500" hoverColor="hover:bg-yellow-600" textColor="text-white">
            Sign in
          </Button>
        </form>

      
      </div>
    </div>
  );
};

export default LoginPage;
