// src/components/NavBar.jsx
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";

const linkBase = { color: "inherit", textDecoration: "none", letterSpacing: 1 };
const active = { textDecoration: "underline" };

export default function NavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
      <AppBar position="fixed" elevation={0} sx={{ px: { xs: 1, sm: 2 } }}>
        <Toolbar disableGutters>
          <Typography
              variant="h6"
              component={NavLink}
              to="/"
              sx={{
                ...linkBase,
                fontWeight: 700,
                fontFamily: "'Orbitron', sans-serif",
                mx: 3,
              }}
          >
            Nexus Electronics
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Button
              component={NavLink}
              to="/products"
              color="inherit"
              sx={linkBase}
              style={({ isActive }) => (isActive ? active : undefined)}
          >
            Productos
          </Button>

          <Button
              component={NavLink}
              to="/cart"
              color="inherit"
              startIcon={<ShoppingCart />}
              sx={linkBase}
              style={({ isActive }) => (isActive ? active : undefined)}
          >
            Carrito
          </Button>

          {token ? (
              <>
                <Button
                    component={NavLink}
                    to="/profile"
                    color="inherit"
                    sx={linkBase}
                    style={({ isActive }) => (isActive ? active : undefined)}
                >
                  Mi cuenta
                </Button>
                <Button
                    onClick={handleLogout}
                    color="inherit"
                    sx={{ ...linkBase, ml: 1 }}
                >
                  Cerrar sesión
                </Button>
              </>
          ) : (
              <>
                <Button
                    component={NavLink}
                    to="/login"
                    color="inherit"
                    sx={linkBase}
                    style={({ isActive }) => (isActive ? active : undefined)}
                >
                  Login
                </Button>
                <Button
                    component={NavLink}
                    to="/register"
                    color="inherit"
                    sx={{ ...linkBase, ml: 1 }}
                    style={({ isActive }) => (isActive ? active : undefined)}
                >
                  Crear cuenta
                </Button>
              </>
          )}
        </Toolbar>
      </AppBar>
  );
}
