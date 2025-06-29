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

/* ─────────────────Acciones──────────────────────────────────────────────────────── */
const ACTIONS = [
  { label: "Listar productos", method: "GET", path: "/api/products" },

  { label: "Crear producto",   method: "POST", path: "/api/products",
    bodyTemplate: {
      description:"", price:0, stock:0, categoryId:0, images: []
    }
  },

  { label: "Actualizar producto", method: "PUT", path: "/api/products/{id}",
    bodyTemplate: {
      description:"", price:0, stock:0, categoryId:0, images: []
    }
  },

  { label: "Eliminar producto", method: "DELETE", path: "/api/products/{id}" },

  { label: "Subir imágenes",   method: "POST",
    path: "/api/products/{id}/images", fileUpload: true },

  { label: "Listar categorías", method: "GET", path: "/api/categories" },
  { label: "Crear categoría",   method: "POST", path: "/api/categories",
    bodyTemplate: { description:"" } },

  { label: "Actualizar categoría", method: "PUT",
    path: "/api/categories/{id}", bodyTemplate: { description:"" } },

  { label: "Eliminar categoría", method: "DELETE", path: "/api/categories/{id}" },

  { label: "Obtener usuario por ID", method: "GET", path: "/api/users/{id}" },
  { label: "Listar órdenes por ID usuario", method: "GET", path: "/api/orders/user/{id}" },
  { label: "Obtener orden por ID", method: "GET", path: "/api/orders/{id}" }
];

export default function AdminDashboard() {
  const [selected, setSelected] = useState(null);
  const [paramId,  setParamId ] = useState("");
  const [body,     setBody    ] = useState("{}");
  const [files,    setFiles   ] = useState([]);
  const [response, setResponse] = useState(null);
  const [loading,  setLoading ] = useState(false);

  const BACKEND = "http://localhost:8080";

  /* ─── Ejecutar petición ─── */
  const handleRun = async () => {
    if (!selected) return;
    setLoading(true);
    setResponse(null);

    const endpoint = selected.path.includes("{id}")
      ? selected.path.replace("{id}", paramId || "0")
      : selected.path;

    try {
      let opts;

      if (selected.fileUpload) {
        const fd = new FormData();
        files.forEach((f) => fd.append("images", f));      // clave = images
        opts = { method:"POST", headers: authHeader(), body: fd };
      } else {
        opts = {
          method : selected.method,
          headers: { "Content-Type":"application/json", ...authHeader() },
          body   : ["POST","PUT"].includes(selected.method) ? body : undefined
        };
      }

      const res  = await fetch(`${BACKEND}${endpoint}`, opts);
      const text = await res.text();

      /* — Safe-parse: solo si es JSON — */
      let processed = text;
      try {
        const json = JSON.parse(text);

        // Si realmente es un array de productos, ocultamos images:
        if (Array.isArray(json)) {
          processed = JSON.stringify(
            json.map(({ images, ...r }) => r),
            null, 2
          );
        } else {
          processed = JSON.stringify(json, null, 2);
        }
      } catch { /* no JSON, deja text crudo */ }

      setResponse(`Status: ${res.status} ${res.statusText}\n\n${processed}`);
    } catch (err) {
      setResponse(`ERROR: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  /* ─── Al seleccionar acción ─── */
  const selectAction = (a) => {
    setSelected(a);
    setParamId("");
    setFiles([]);
    setResponse(null);
    setBody(a.bodyTemplate ? JSON.stringify(a.bodyTemplate, null, 2) : "{}");
  };

  return (
    <Box sx={{ display:"flex", height:"100vh" }}>
      {/* Sidebar */}
      <Paper sx={{ width:300, overflowY:"auto", bgcolor:"#0b0b2e", color:"#fff" }}>
        <Toolbar><Typography variant="h6">Panel Admin</Typography></Toolbar>
        <Divider/>
        <List dense>
          {ACTIONS.map((a,i)=>(
            <ListItem button key={i} selected={selected===a} onClick={()=>selectAction(a)}>
              <ListItemText primary={a.label} />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Panel derecho */}
      <Box sx={{ flexGrow:1, p:4, bgcolor:"#1a1a1a", color:"#fff", overflowY:"auto" }}>
        {!selected && (
          <Typography variant="h5" color="#888">
            Seleccioná una acción a la izquierda
          </Typography>
        )}

        {selected && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>{selected.label}</Typography>

              {selected.path.includes("{id}") && (
                <TextField
                  label="ID"
                  variant="filled"
                  fullWidth
                  margin="normal"
                  value={paramId}
                  onChange={(e)=>setParamId(e.target.value)}
                  InputProps={{ sx:{ color:"#fff" } }}
                  InputLabelProps={{ sx:{ color:"#ccc" } }}
                />
              )}

              {selected.fileUpload && (
                <>
                  <Button variant="outlined" component="label"
                    sx={{ mt:2, color:"#00e0ff" }}
                  >
                    Seleccionar imágenes
                    <input
                      hidden type="file" accept="image/*" multiple
                      onChange={(e)=>{
                        const list = [...e.target.files];
                        setFiles(list);
                        setBody(JSON.stringify({ files:list.map(f=>f.name) }, null, 2));
                      }}
                    />
                  </Button>
                  {files.length>0 && (
                    <Typography variant="caption" sx={{ ml:1 }}>
                      {files.length} archivo(s) seleccionado(s)
                    </Typography>
                  )}
                </>
              )}

              {["POST","PUT"].includes(selected.method) && !selected.fileUpload && (
                <TextField
                  label="Cuerpo JSON"
                  variant="filled"
                  fullWidth
                  multiline
                  minRows={8}
                  margin="normal"
                  value={body}
                  onChange={(e)=>setBody(e.target.value)}
                  InputProps={{ sx:{ color:"#fff", fontFamily:"monospace" } }}
                  InputLabelProps={{ sx:{ color:"#ccc" } }}
                />
              )}

              <Button
                variant="contained"
                sx={{ mt:2, bgcolor:"#00e0ff", color:"#001b36" }}
                disabled={loading}
                onClick={handleRun}
              >
                {loading ? "Ejecutando…" : "EJECUTAR"}
              </Button>
            </Grid>

            <Grid item xs={12} md={8}>
              <Box sx={{
                bgcolor:"#101040", p:2, borderRadius:1, minHeight:300,
                position:"relative"
              }}>
                <IconButton
                  size="small"
                  onClick={()=>setResponse(null)}
                  sx={{ position:"absolute", top:8, right:8, color:"#ccc" }}
                >
                  <RefreshIcon fontSize="inherit" />
                </IconButton>
                <Typography component="pre" sx={{
                  whiteSpace:"pre-wrap",
                  wordBreak:"break-all",
                  fontFamily:"JetBrains Mono, monospace",
                  color:"#c1e4ff"
                }}>
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
