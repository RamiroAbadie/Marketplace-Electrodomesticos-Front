import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute({ adminOnly = false }) {
  const { token, user } = useSelector((state) => state.user);

  // Paso 1: mientras no cargó ni siquiera null, no renderizar nada
  if (token === undefined || user === undefined) {
    return null;
  }

  // Paso 2: si no hay token => redirige
  if (!token) return <Navigate to="/login" replace />;

  // Paso 3: si requiere admin y no lo es => redirige
  if (adminOnly && user?.role !== "ADMIN") return <Navigate to="/" replace />;

  // Paso 4: todo bien => deja pasar
  return <Outlet />;
}