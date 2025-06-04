import { useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";

export default function Checkout() {
    const navigate = useNavigate();
    const location = useLocation();
    const product = location.state?.product;
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/");
            return;
        }

        if (!product) {
            alert("No se ha seleccionado ningún producto.");
            navigate("/products");
        }
    }, [navigate, token, product]);

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
                py: 8,
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
