import { useSelector, useDispatch } from "react-redux";
import {
    Box,
    Typography,
    Container,
    Grid,
    Button,
    Divider,
} from "@mui/material";
import {clearCart, removeFromCart} from "../redux/slices/cartSlice.js";
import { useNavigate } from "react-router-dom";



export default function Cart() {
    const cartItems = useSelector((state) => state.cart.items);
    const total = useSelector((state) => state.cart.total);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    return (
        <Box
            sx={{
                width: "100vw",
                minHeight: "100vh",
                background: "linear-gradient(135deg,#040404 0%,#060320 40%,#05003d 100%)",
                py: 4,
                color: "white",
            }}
        >
            <Container maxWidth="md">
                <Typography
                    variant="h4"
                    sx={{ fontFamily: "'Orbitron', sans-serif", mb: 4, textAlign: "center" }}
                >
                    Tu carrito 🛒
                </Typography>

                {cartItems.length === 0 ? (
                    <Typography variant="body1" align="center">
                        El carrito está vacío.
                    </Typography>
                ) : (
                    <>
                        <Grid container spacing={2}>
                            {cartItems.map((item) => (
                                <Grid item xs={12} key={item.id}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            backgroundColor: "#0a0a23",
                                            p: 2,
                                            borderRadius: 2,
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="h7" sx={{ mr: 2, flexGrow: 1 }}>
                                                {item.name}
                                            </Typography>
                                            <Typography variant="body2" sx={{ mb: 0.5 }}>
                                                Cantidad: {item.quantity}
                                            </Typography>
                                            <Typography variant="body2">
                                                Precio unitario: ${item.price.toFixed(2)}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ textAlign: "right" }}>
                                            <Typography variant="subtitle1" sx={{ whiteSpace: "nowrap" }}>
                                                Subtotal: ${(item.quantity * item.price).toFixed(2)}
                                            </Typography>
                                            <Button
                                                size="small"
                                                color="error"
                                                onClick={() => dispatch(removeFromCart(item.id))}
                                            >
                                                Quitar
                                            </Button>
                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>

                        <Divider sx={{ my: 4, borderColor: "white" }} />

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mt: 2,
                            }}
                        >
                            <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
                            <Box sx={{ display: "flex", gap: 2 }}>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => dispatch(clearCart())}
                                >
                                    Vaciar carrito
                                </Button>
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={() => navigate("/checkout")}
                                    sx={{
                                        fontWeight: "bold",
                                        background: "#00e0ff",
                                        color: "#001b36",
                                        boxShadow: "0 0 12px #00e0ff",
                                        transition: "transform .3s, box-shadow .3s",
                                        "&:hover": {
                                            transform: "translateY(-4px)",
                                            boxShadow: "0 0 20px #00e0ff",
                                            background: "#00e0ff"
                                        }
                                    }}
                                >
                                    Finalizar compra
                                </Button>
                            </Box>
                        </Box>
                    </>
                )}
            </Container>
        </Box>
    );
}
