/* src/components/NavBar.jsx */
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const linkBase = { color: "inherit", textDecoration: "none", letterSpacing: 1 };
const active = { textDecoration: "underline" };

export default function NavBar() {
  return (
    <AppBar
      position="fixed"              /* fijo arriba */
      elevation={0}
      sx={{ px: { xs: 1, sm: 2 } }} /* padding horizontal responsivo */
    >
      <Toolbar disableGutters>
        <Typography
        variant="h6"
        component={NavLink}
        to="/"
        sx={{
          ...linkBase,
          fontWeight: 700,
          fontFamily: "'Orbitron', sans-serif",   // 👈
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
        <Button
          component={NavLink}
          to="/login"
          color="inherit"
          sx={linkBase}
          style={({ isActive }) => (isActive ? active : undefined)}
        >
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}
