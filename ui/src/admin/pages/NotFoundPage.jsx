import { Link } from "react-router-dom";
import Button from "../components/Button";

const NotFoundPage = () => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
    <p className="text-5xl font-bold text-orange-500">404</p>
    <p className="text-lg font-semibold text-slate-700">Page not found</p>
    <Link to="/admin/dashboard">
      <Button>Go to dashboard</Button>
    </Link>
  </div>
);

export default NotFoundPage;
