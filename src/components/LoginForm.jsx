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
import { loginUser } from "../redux/slices/userSlice.js";
import { isAdmin } from "../utils/auth";

export default function LoginForm() {
    const dispatch = useDispatch();

    // Estado local para campos del formulario
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Estado global de Redux (slice de usuario)
    const { loading, error } = useSelector((state) => state.user);

    // Al enviar el formulario
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Disparar acción asincrónica
            const result = await dispatch(loginUser({ email, password })).unwrap();
            console.log("Login exitoso:", result.user);
            // Redireccionar según el rol
            window.location.href = isAdmin() ? "/admin" : "/";
        } catch (err) {
            console.error("Login fallido:", err);
            alert(err);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleLogin}
            sx={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                p: 4,
                borderRadius: 2,
                backdropFilter: "blur(5px)",
            }}
        >
            <Stack spacing={2}>
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
                    sx={{
                        backgroundColor: "#00e0ff",
                        color: "#001b36",
                        fontWeight: "bold",
                    }}
                >
                    {loading ? "Ingresando..." : "Iniciar sesión"}
                </Button>

                <Typography variant="body2" color="white">
                    ¿No tenés cuenta?{" "}
                    <Link href="/register" underline="hover" color="#00e0ff">
                        Crear una
                    </Link>
                </Typography>
            </Stack>
        </Box>
    );
}
