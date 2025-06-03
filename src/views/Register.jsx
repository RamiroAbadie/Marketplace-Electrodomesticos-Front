// src/views/Register.jsx
import { Box, Container, Typography } from "@mui/material";
import RegisterForm from "../components/RegisterForm";

export default function Register() {
    return (
        <Box
            sx={{
                width: "100vw",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                background: "linear-gradient(135deg,#040404 0%,#060320 40%,#05003d 100%)",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* scan-lines opcional (como Home) */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.02) 3px)",
                    pointerEvents: "none",
                }}
            />

            {/* CONTENIDO CENTRADO */}
            <Container maxWidth="xs" sx={{ position: "relative", zIndex: 1 }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontFamily: "'Orbitron', sans-serif",
                        color: "#fff",
                        fontWeight: 700,
                        mb: 3,
                        textAlign: "center",
                    }}
                >
                    Crear cuenta
                </Typography>

                <RegisterForm />
            </Container>

            {/* LOGO decorativo */}
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
        </Box>
    );
}
