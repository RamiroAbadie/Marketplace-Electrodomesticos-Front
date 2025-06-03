import {
  AppBar,
  Toolbar,
  Button,
  Box
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { isAdmin, getToken } from "../utils/auth";

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const token  = getToken();
  const logged = Boolean(token);
  const admin  = isAdmin();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  /* —— barra especial cuando navegas dentro del panel de admin —— */
  if (admin && location.pathname.startsWith("/admin")) {
    return (
      <AppBar position="fixed" sx={{ bgcolor: "#0d73d1" }}>
        <Toolbar sx={{ minHeight: 56, px: 2 }}>
          <Button
            component={RouterLink}
            to="/admin"
            disableRipple
            sx={{
              fontSize: "1.3rem",
              fontWeight: 700,
              color: "#bde0ff",
              textTransform: "none",
              mr: 3
            }}
          >
            Nexus&nbsp;Admin
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <Button onClick={logout} sx={{ color: "#fff" }}>
            Cerrar&nbsp;sesión
          </Button>
        </Toolbar>
      </AppBar>
    );
  }

  /* —— barra general (home, productos, etc.) —— */
  return (
    <AppBar position="fixed" sx={{ bgcolor: "#0d73d1" }}>
      <Toolbar sx={{ minHeight: 56, px: 2 }}>
        <Button
          component={RouterLink}
          to="/"
          disableRipple
          sx={{
            fontSize: "1.3rem",
            fontWeight: 700,
            color: "#bde0ff",
            textTransform: "none",
            mr: 3
          }}
        >
          Nexus&nbsp;Electronics
        </Button>

        <Box sx={{ flexGrow: 1 }} />

        <Button
          component={RouterLink}
          to="/products"
          sx={{ color: "#fff", mr: 1 }}
        >
          Productos
        </Button>

        {/* —— ADMIN fuera del panel (solo “Cerrar sesión”) —— */}
        {admin && (
          <Button onClick={logout} sx={{ color: "#fff" }}>
            Cerrar&nbsp;sesión
          </Button>
        )}

        {/* —— Usuario logueado (no admin) —— */}
        {logged && !admin && (
          <>
            <Button
              component={RouterLink}
              to="/cart"
              startIcon={<ShoppingCart />}
              sx={{ color: "#fff", mr: 1 }}
            >
              Carrito
            </Button>
            <Button
              component={RouterLink}
              to="/profile"
              sx={{ color: "#fff", mr: 1 }}
            >
              Mi&nbsp;Cuenta
            </Button>
            <Button onClick={logout} sx={{ color: "#fff" }}>
              Cerrar&nbsp;sesión
            </Button>
          </>
        )}

        {/* —— Invitado (no logueado) —— */}
        {!logged && (
          <>
            <Button
              component={RouterLink}
              to="/login"
              sx={{ color: "#fff", mr: 1 }}
            >
              Login
            </Button>
            <Button component={RouterLink} to="/register" sx={{ color: "#fff" }}>
              Crear&nbsp;cuenta
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
