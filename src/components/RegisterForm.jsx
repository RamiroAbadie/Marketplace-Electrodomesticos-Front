import {
    Box,
    Button,
    Link,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";

export default function RegisterForm() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirm) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        // Todavía no tocamos esto
    };

    return (
        <Box
            component="form"
            onSubmit={handleRegister}
            sx={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                p: 4,
                borderRadius: 2,
                backdropFilter: "blur(5px)",
            }}
        >
            <Stack spacing={2}>
                <TextField
                    label="Nombre"
                    fullWidth
                    required
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    InputProps={{ sx: { color: "white" } }}
                    InputLabelProps={{ sx: { color: "white" } }}
                />
                <TextField
                    label="Apellido"
                    fullWidth
                    required
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    InputProps={{ sx: { color: "white" } }}
                    InputLabelProps={{ sx: { color: "white" } }}
                />
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{ sx: { color: "white" } }}
                    InputLabelProps={{ sx: { color: "white" } }}
                />
                <TextField
                    label="Nombre de usuario"
                    fullWidth
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    InputProps={{ sx: { color: "white" } }}
                    InputLabelProps={{ sx: { color: "white" } }}
                />
                <TextField
                    label="Contraseña"
                    type="password"
                    fullWidth
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{ sx: { color: "white" } }}
                    InputLabelProps={{ sx: { color: "white" } }}
                />
                <TextField
                    label="Confirmar contraseña"
                    type="password"
                    fullWidth
                    required
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    InputProps={{ sx: { color: "white" } }}
                    InputLabelProps={{ sx: { color: "white" } }}
                />

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ backgroundColor: "#00e0ff", color: "#001b36", fontWeight: "bold" }}
                >
                    Crear cuenta
                </Button>

                <Typography variant="body2" color="white">
                    ¿Ya tenés cuenta?{" "}
                    <Link href="/login" underline="hover" color="#00e0ff">
                        Iniciar sesión
                    </Link>
                </Typography>
            </Stack>
        </Box>
    );
}
