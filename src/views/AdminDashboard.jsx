// -------------------------------------------------------------
//  AdminDashboard.jsx
//  • Muestra un menú de acciones autorizadas para el rol ADMIN
//  • Permite lanzar peticiones GET / POST / PUT / DELETE
//    y ver la respuesta en crudo (JSON) dentro de la UI
//  • Usa el helper  authHeader()  para incluir el Bearer token
// -------------------------------------------------------------
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Toolbar,
  Typography
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useState } from "react";
import { authHeader } from "../utils/auth";

// —— catálogo de acciones rápidas ————————————————
//  Agregá / quitá lo que necesites.  path relativo al backend.
const ACTIONS = [
  { label: "Listar productos",          method: "GET",    path: "/api/products" },
  { label: "Crear producto",            method: "POST",   path: "/api/products",          bodyTemplate: { name:"", description:"", price:0, stock:0, categoryId:1 } },
  { label: "Actualizar producto",       method: "PUT",    path: "/api/products/{id}",     bodyTemplate: { name:"", description:"", price:0, stock:0, categoryId:1 } },
  { label: "Eliminar producto",         method: "DELETE", path: "/api/products/{id}" },

  { label: "Listar categorías",         method: "GET",    path: "/api/categories" },
  { label: "Crear categoría",           method: "POST",   path: "/api/categories",        bodyTemplate: { name:"", description:"" } },
  { label: "Actualizar categoría",      method: "PUT",    path: "/api/categories/{id}",   bodyTemplate: { name:"", description:"" } },
  { label: "Eliminar categoría",        method: "DELETE", path: "/api/categories/{id}" },

  { label: "Listar usuarios",           method: "GET",    path: "/api/users" },
  { label: "Obtener usuario por ID",    method: "GET",    path: "/api/users/{id}" },
  { label: "Eliminar usuario",          method: "DELETE", path: "/api/users/{id}" },

  { label: "Listar órdenes",            method: "GET",    path: "/api/orders" },
  { label: "Obtener orden por ID",      method: "GET",    path: "/api/orders/{id}" },
];

export default function AdminDashboard() {
  const [selected, setSelected]     = useState(null);          // acción elegida
  const [paramId, setParamId]       = useState("");            // id dinámico
  const [body, setBody]             = useState("{}");          // cuerpo JSON
  const [response, setResponse]     = useState(null);          // respuesta del fetch
  const [loading, setLoading]       = useState(false);
  const BACKEND = "http://localhost:8080";                     // cambia si usás proxy

  const handleRun = async () => {
    if (!selected) return;
    setLoading(true);
    setResponse(null);

    // reemplazar {id} si corresponde
    let endpoint = selected.path.includes("{id}")
      ? selected.path.replace("{id}", paramId || "0")
      : selected.path;

    try {
      const opts = {
        method: selected.method,
        headers: {
          "Content-Type": "application/json",
          ...authHeader()
        }
      };
      if (["POST", "PUT"].includes(selected.method)) {
        opts.body = body;
      }

      const res  = await fetch(`${BACKEND}${endpoint}`, opts);
      const text = await res.text();
      setResponse(
        `Status: ${res.status} ${res.statusText}\n\n` +
        (text.startsWith("{") || text.startsWith("[")
          ? JSON.stringify(JSON.parse(text), null, 2)
          : text)
      );
    } catch (err) {
      setResponse(`ERROR: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // cuando elijo una acción preparo plantillas
  const selectAction = (act) => {
    setSelected(act);
    setParamId("");
    setBody(
      act.bodyTemplate
        ? JSON.stringify(act.bodyTemplate, null, 2)
        : "{}"
    );
    setResponse(null);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* ——— LADO IZQUIERDO · Acciones ——— */}
      <Paper
        sx={{
          width: 300,
          p: 0,
          overflowY: "auto",
          borderRight: "1px solid #1e1e1e",
          background: "#0b0b2e",
          color: "#fff"
        }}
      >
        <Toolbar>
          <Typography variant="h6">Panel Admin</Typography>
        </Toolbar>
        <Divider />
        <List dense>
          {ACTIONS.map((a, i) => (
            <ListItem
              button
              key={i}
              selected={selected === a}
              onClick={() => selectAction(a)}
            >
              <ListItemText
                primary={a.label}
                secondary={`${a.method} ${a.path}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* ——— LADO DERECHO · Detalle ——— */}
      <Box sx={{ flexGrow: 1, p: 4, overflowY: "auto", color: "#fff" }}>
        {!selected && (
          <Typography variant="h5" color="#888">
            Seleccioná una acción a la izquierda
          </Typography>
        )}

        {selected && (
          <Grid container spacing={3}>
            {/* Configuración petición */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                {selected.label}
              </Typography>

              {selected.path.includes("{id}") && (
                <TextField
                  label="ID"
                  variant="filled"
                  fullWidth
                  margin="normal"
                  value={paramId}
                  onChange={(e) => setParamId(e.target.value)}
                  InputProps={{ sx: { color: "#fff" } }}
                  InputLabelProps={{ sx: { color: "#ccc" } }}
                />
              )}

              {["POST", "PUT"].includes(selected.method) && (
                <TextField
                  label="Cuerpo JSON"
                  variant="filled"
                  fullWidth
                  multiline
                  minRows={8}
                  margin="normal"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  InputProps={{
                    sx: { color: "#fff", fontFamily: "monospace" }
                  }}
                  InputLabelProps={{ sx: { color: "#ccc" } }}
                />
              )}

              <Button
                variant="contained"
                onClick={handleRun}
                disabled={loading}
                sx={{ mt: 2, bgcolor: "#00e0ff", color: "#001b36" }}
              >
                {loading ? "Ejecutando..." : "Ejecutar"}
              </Button>
            </Grid>

            {/* Respuesta */}
            <Grid item xs={12} md={8}>
              <Box
                sx={{
                  bgcolor: "#101040",
                  p: 2,
                  borderRadius: 1,
                  minHeight: 300,
                  position: "relative"
                }}
              >
                <IconButton
                  size="small"
                  onClick={() => setResponse(null)}
                  sx={{ position: "absolute", top: 8, right: 8, color: "#ccc" }}
                >
                  <RefreshIcon fontSize="inherit" />
                </IconButton>

                <Typography
                  component="pre"
                  sx={{
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-all",
                    fontFamily: "JetBrains Mono, monospace",
                    color: "#c1e4ff"
                  }}
                >
                  {response || "— Sin respuesta aún —"}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
}
