import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Paper, Divider } from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {clearCart} from "../redux/slices/cartSlice.js";

export default function Confirmation() {
    const navigate = useNavigate();

    const order = useSelector((state) => state.orders.selectedOrder);
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!order || !user) {
            navigate("/");
        } else {
            dispatch(clearCart());
        }
    }, [order, user, navigate, dispatch]);

    if (!order || !user) return null;

    return (
        <Box
            sx={{
                width: "100vw",
                minHeight: "100vh",
                background: "linear-gradient(135deg,#040404 0%,#060320 40%,#05003d 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Paper
                sx={{
                    px: 6,
                    py: 5,
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: "#fff",
                    borderRadius: 3,
                    textAlign: "center",
                    backdropFilter: "blur(5px)",
                    maxWidth: 600,
                }}
            >
                <Typography variant="h4" sx={{ fontFamily: "'Orbitron', sans-serif", mb: 2 }}>
                    Orden Confirmada
                </Typography>

                <Typography variant="h6" gutterBottom>
                    Orden ID: {order.orderId}
                </Typography>

                {order.items && order.items.length > 0 ? (
                    <>
                        {order.items.map((item, i) => (
                            <Box key={i} sx={{ mb: 2 }}>
                                <Typography>Producto: <strong>{item.description}</strong></Typography>
                                <Typography>Cantidad: {item.quantity}</Typography>
                                <Divider sx={{ my: 1, borderColor: "#ccc" }} />
                            </Box>
                        ))}
                    </>
                ) : (
                    <Typography>No hay productos en esta orden.</Typography>
                )}

                <Typography variant="body1" sx={{ mt: 3 }}>
                    ¡Gracias {user.firstname} por viajar al futuro con nosotros! 🚀
                </Typography>
            </Paper>
        </Box>
    );
}
