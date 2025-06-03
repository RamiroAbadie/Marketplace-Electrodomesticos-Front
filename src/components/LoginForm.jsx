// src/components/LoginForm.jsx  (reemplaza TODO el componente)
import { useState } from "react";
import {
  Box, Stack, TextField, Button, Typography, Link, Alert,
} from "@mui/material";

export default function LoginForm() {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState(null);

  async function handleLogin(e) {
    e.preventDefault();
    setError(null);

    try {
      const resp = await fetch(
        "http://localhost:8080/api/v1/auth/authenticate",
        {
          method : "POST",
          headers: { "Content-Type": "application/json" },
          body   : JSON.stringify({ email, password }),
        }
      );

      if (!resp.ok) {
        const msg = resp.status === 401 ? "Credenciales incorrectas" : "Error inesperado";
        throw new Error(msg);
      }

      const { accessToken } = await resp.json();

      /* ─────────────  GUARDAMOS EL TOKEN  ───────────── */
      localStorage.setItem("token", accessToken);      // o sessionStorage
      window.location.href = "/products";              // redirige al catálogo
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{ background:"rgba(255,255,255,.05)", p:4, borderRadius:2, backdropFilter:"blur(5px)" }}
    >
      <Stack spacing={2}>
        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Email"
          type="email"
          fullWidth
          required
          value={email}
          onChange={e=>setEmail(e.target.value)}
          InputProps={{ sx:{color:"#fff"} }}
          InputLabelProps={{ sx:{color:"#ccc"} }}
        />

        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          required
          value={password}
          onChange={e=>setPassword(e.target.value)}
          InputProps={{ sx:{color:"#fff"} }}
          InputLabelProps={{ sx:{color:"#ccc"} }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ background:"#00e0ff", color:"#001b36", fontWeight:"bold" }}
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
