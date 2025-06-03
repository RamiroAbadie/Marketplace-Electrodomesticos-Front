import { Box, Container, Typography, Paper } from "@mui/material";

export default function Confirmation() {
    // Obtener usuario y orden desde localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const order = JSON.parse(localStorage.getItem("lastOrder"));

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
            <Container maxWidth="sm" sx={{ zIndex: 1 }}>
                <Paper
                    sx={{
                        p: 4,
                        borderRadius: 3,
                        backgroundColor: "rgba(255,255,255,0.04)",
                        backdropFilter: "blur(8px)",
                        color: "#fff",
                        textAlign: "center",
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{ fontFamily: "'Orbitron', sans-serif", mb: 2 }}
                    >
                        Orden Confirmada
                    </Typography>

                    <Typography variant="h6" sx={{ mb: 1 }}>
                        Orden ID: <strong>{order?.orderId || "—"}</strong>
                    </Typography>

                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Producto: <strong>{order?.items?.[0]?.description || "—"}</strong>
                    </Typography>

                    <Typography variant="h6" sx={{ mt: 4 }}>
                        ¡Gracias {user?.firstname || "Usuario"} por viajar al futuro con nosotros! 🚀
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
}
