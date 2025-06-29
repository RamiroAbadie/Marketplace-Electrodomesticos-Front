import { useEffect } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Profile() {
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [navigate, user]);

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
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    borderRadius: 3,
                    backgroundColor: "rgba(20, 20, 60, 0.8)",
                    color: "#fff",
                    maxWidth: 500,
                }}
            >
                <Typography variant="h4" fontFamily="'Orbitron', sans-serif" gutterBottom>
                    Mi Cuenta
                </Typography>

                {user ? (
                    <>
                        <Typography variant="h6">Nombre:</Typography>
                        <Typography mb={2}>{user.firstname} {user.lastname}</Typography>

                        <Typography variant="h6">Email:</Typography>
                        <Typography mb={2}>{user.email}</Typography>
                    </>
                ) : (
                    <Typography>Cargando usuario...</Typography>
                )}
            </Paper>
        </Box>
    );
}
