import {
    Box,
    Button,
    Link,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/userSlice.js";

export default function RegisterForm() {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.user);

    // Estado local para inputs
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirm) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        try {
            const result = await dispatch(
                registerUser({ firstname, lastname, email, password })
            ).unwrap();

            console.log("Registro exitoso:", result.user);
            window.location.href = "/";
        } catch (err) {
            console.error("Error en registro:", err);
            alert(err);
        }
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

                {error && (
                    <Typography color="error" textAlign="center">
                        {error}
                    </Typography>
                )}

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                    sx={{ backgroundColor: "#00e0ff", color: "#001b36", fontWeight: "bold" }}
                >
                    {loading ? "Creando cuenta..." : "Crear cuenta"}
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
