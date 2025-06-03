// -------------------------------------------------------------
//  PrivateRoute.jsx
//  • Bloquea el acceso si no hay token (redirige a /login)
//  • Opcionalmente bloquea si no es ADMIN  (redirige a /)
//  • Usa helpers de src/utils/auth.js
// -------------------------------------------------------------
import { Navigate, Outlet } from "react-router-dom";
import { getToken, isAdmin } from "../utils/auth";

/**
 * Encierra rutas protegidas.
 * @param {boolean} adminOnly  Si true, solo deja pasar a ROLE_ADMIN
 */
export default function PrivateRoute({ adminOnly = false }) {
  const token = getToken();       // null si no hay sesión
  const admin = isAdmin();        // true / false

  if (!token) return <Navigate to="/login" replace />;
  if (adminOnly && !admin) return <Navigate to="/" replace />;

  // pasa la request a las rutas hijas
  return <Outlet />;
}
