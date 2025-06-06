import {
    Box,
    Button,
    Link,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { isAdmin } from "../utils/auth";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:8080/api/v1/auth/authenticate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) throw new Error("Login fallido");

            const data = await res.json();

            // Guardar token y usuario
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("user", JSON.stringify(data.user));

            console.log("Login exitoso:", data.user);

            window.location.href = isAdmin() ? "/admin" : "/";
        } catch (err) {
            console.error("Error en login:", err.message);
            alert("Credenciales incorrectas.");
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

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ backgroundColor: "#00e0ff", color: "#001b36", fontWeight: "bold" }}
                >
                    Iniciar sesión
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
