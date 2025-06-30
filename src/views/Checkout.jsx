import { useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import CheckoutForm from "../components/CheckoutForm";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";

export default function Checkout() {
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.items);
    const { token } = useSelector((state) => state.user);

    useEffect(() => {
        if (!token) {
            navigate("/");
            return;
        }

        if (cartItems.length === 0) {
            alert("Tu carrito está vacío.");
            navigate("/products");
        }
    }, [navigate, token, cartItems]);

    return (
        <Box
            sx={{
                width: "100vw",
                minHeight: "100vh",
                background: "linear-gradient(135deg,#040404 0%,#060320 40%,#05003d 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                py: 0,
            }}
        >
            <Box
                component="img"
                src="/NexusElectronics Logo (tinify).png"
                alt="Logo NE"
                sx={{
                    position: "absolute",
                    right: { xs: -60, md: -40 },
                    bottom: { xs: -20, md: -10 },
                    width: { xs: "60vw", md: "420px" },
                    maxWidth: "600px",
                    opacity: 0.9,
                    pointerEvents: "none",
                }}
            />

            <Container maxWidth="xl" sx={{ zIndex: 1 }}>
                <Typography
                    variant="h4"
                    color="white"
                    sx={{ fontWeight: 700, mb: 4, fontFamily: "'Orbitron', sans-serif" }}
                >
                    Finalizar Compra
                </Typography>

                <CheckoutForm />
            </Container>
        </Box>
    );
}
