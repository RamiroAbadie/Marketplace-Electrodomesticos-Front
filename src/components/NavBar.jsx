import {
    AppBar,
    Toolbar,
    Button,
    Box
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/userSlice.js";
import {clearCart} from "../redux/slices/cartSlice.js";
import {clearOrderState} from "../redux/slices/orderSlice.js";

export default function NavBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Accedemos al estado desde Redux
    const { user, token } = useSelector((state) => state.user);

    const logged = Boolean(token);
    const admin = user?.role === "ADMIN"; // o "ROLE_ADMIN" si tu backend lo manda así

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearCart());
        dispatch(clearOrderState());
        navigate("/login");
    };

    /* —— barra dentro del panel de admin —— */
    if (admin && location.pathname.startsWith("/admin")) {
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
                            color: "#ffffff",
                            textTransform: "none",
                            fontFamily: "'Orbitron', sans-serif",
                            mr: 3
                        }}
                    >
                        Nexus&nbsp;Admin
                    </Button>
                    <Box sx={{ flexGrow: 1 }} />

                    <Button
                        component={RouterLink}
                        to="/products"
                        sx={{ color: "#fff", mr: 1}}
                    >
                        Productos
                    </Button>

                    <Button
                        component={RouterLink}
                        to="/admin/add-product"
                        sx={{ color: "#fff", mr: 1 }}
                    >
                        Control&nbsp;panel
                    </Button>
                    <Button onClick={handleLogout} sx={{ color: "#fff" }}>
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
                        color: "#ffffff",
                        textTransform: "none",
                        fontFamily: "'Orbitron', sans-serif",
                        mr: 3
                    }}
                >
                    Nexus&nbsp;Electronics
                </Button>

                <Box sx={{ flexGrow: 1 }} />



                {/* —— ADMIN fuera del panel —— */}
                {admin && (
                    <>
                        <Button
                            component={RouterLink}
                            to="/products"
                            sx={{ color: "#fff", mr: -100 }}
                        >
                            Productos
                        </Button>
                        <Box sx={{ flexGrow: 1 }} />
                        <Button
                            component={RouterLink}
                            to="/admin/add-product"
                            sx={{ color: "#fff", mr: 1 }}
                        >
                            Control&nbsp;panel
                        </Button>
                        <Button onClick={handleLogout} sx={{ color: "#fff" }}>
                            Cerrar&nbsp;sesión
                        </Button>
                    </>
                )}

                {/* —— Usuario logueado (no admin) —— */}
                {logged && !admin && (
                    <>


                        <Button
                            component={RouterLink}
                            to="/products"
                            sx={{ color: "#fff", mr: 1 }}
                        >
                            Productos
                        </Button>
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
                        <Button onClick={handleLogout} sx={{ color: "#fff" }}>
                            Cerrar&nbsp;sesión
                        </Button>
                    </>
                )}

                {/* —— Invitado (no logueado) —— */}
                {!logged && (
                    <>

                        <Button
                            component={RouterLink}
                            to="/products"
                            sx={{ color: "#fff", mr: 1 }}
                        >
                            Productos
                        </Button>

                        <Button
                            component={RouterLink}
                            to="/login"
                            sx={{ color: "#fff", mr: 1 }}
                        >
                            Login
                        </Button>
                        <Button
                            component={RouterLink}
                            to="/register"
                            sx={{ color: "#fff" }}
                        >
                            Crear&nbsp;cuenta
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}
