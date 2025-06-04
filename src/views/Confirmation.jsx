import { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Confirmation() {
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedOrder = localStorage.getItem("lastOrder");
        const storedUser = localStorage.getItem("user");

        if (!storedOrder || !storedUser) {
            // si no hay orden o usuario, redirigimos
            navigate("/");
            return;
        }

        setOrder(JSON.parse(storedOrder));
        setUser(JSON.parse(storedUser));
    }, [navigate]);

    if (!order || !user) return null;

    const product = order.items?.[0];

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
                }}
            >
                <Typography variant="h4" sx={{ fontFamily: "'Orbitron', sans-serif", mb: 2 }}>
                    Orden Confirmada
                </Typography>
                <Typography variant="h6">Orden ID: {order.orderId}</Typography>
                <Typography variant="h6">Producto: {product?.description}</Typography>
                <Typography variant="body1" sx={{ mt: 3 }}>
                    ¡Gracias {user.firstname} por viajar al futuro con nosotros! 🚀
                </Typography>
            </Paper>
        </Box>
    );
}
