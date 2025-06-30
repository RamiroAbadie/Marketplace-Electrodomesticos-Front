import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute({ adminOnly = false }) {
  const { token, user } = useSelector((state) => state.user);

  const isAdmin = user?.role === "ADMIN";

  if (!token) return <Navigate to="/login" replace />;
  if (adminOnly && !isAdmin) return <Navigate to="/" replace />;

  return <Outlet />;
}
