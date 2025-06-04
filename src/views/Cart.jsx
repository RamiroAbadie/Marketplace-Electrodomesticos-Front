// src/views/Cart.jsx
import { Box, Typography, Container } from "@mui/material";

export default function Cart() {
    return (
        <Box
            sx={{
                width: "100vw",
                minHeight: "100vh",
                background: "linear-gradient(135deg,#040404 0%,#060320 40%,#05003d 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                py: 0,
            }}
        >
            <Container maxWidth="sm" sx={{ textAlign: "center", color: "white" }}>
                <Box
                    component="img"
                    src="/construction.png"
                    alt="En construcción"
                    sx={{ width: 300, mb: 4 }}
                />
                <Typography variant="h4" sx={{ fontFamily: "'Orbitron', sans-serif", fontWeight: "bold", mb: 2 }}>
                    Estamos trabajando
                </Typography>
                <Typography variant="body1">
                    Pronto vas a poder ver el contenido de tu carrito 🚀
                </Typography>
            </Container>
        </Box>
    );
}
