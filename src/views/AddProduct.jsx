// -------------------------------------------------------------
// AddProduct.jsx
// • Solo accesible para ROLE_ADMIN (ruta protegida)
// • Carga categorías para seleccionar
// • Convierte las imágenes a base64 y las envía en el JSON
//   { name, description, price, stock, categoryId, images: [ ... ] }
// -------------------------------------------------------------
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authHeader } from "../utils/auth";

export default function AddProduct() {
  const [name,        setName]        = useState("");
  const [description, setDescription] = useState("");
  const [price,       setPrice]       = useState("");
  const [stock,       setStock]       = useState("");
  const [category,    setCategory]    = useState("");
  const [images,      setImages]      = useState([]);
  const [catList,     setCatList]     = useState([]);

  const navigate = useNavigate();
  const BACKEND  = "http://localhost:8080";

  /* ───── cargar categorías al montar ───────────────────────── */
  useEffect(() => {
    fetch(`${BACKEND}/api/categories`, { headers: authHeader() })
      .then((r) => r.json())
      .then(setCatList)
      .catch(() => setCatList([]));
  }, []);

  /* ───── helper: file → base64 ─────────────────────────────── */
  const toBase64 = (file) =>
    new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload = () => res(reader.result.split(",")[1]); // sin encabezado
      reader.onerror = rej;
      reader.readAsDataURL(file);
    });

  /* ───── submit ────────────────────────────────────────────── */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const img64 = await Promise.all([...images].map(toBase64));

      const payload = {
        name,
        description,
        price: Number(price),
        stock: Number(stock),
        categoryId: category,
        images: img64
      };

      const res = await fetch(`${BACKEND}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeader()
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Error al crear producto");

      alert("🎉 Producto creado");
      navigate("/admin");          // vuelve al dashboard
    } catch (err) {
      console.error(err);
      alert("Hubo un problema al crear el producto");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Paper sx={{ p: 4, bgcolor: "#0b0b2e", color: "#fff" }}>
        <Typography variant="h5" gutterBottom fontFamily="'Orbitron', sans-serif">
          Agregar Producto
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nombre"
                required
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputProps={{ sx: { color: "#fff" } }}
                InputLabelProps={{ sx: { color: "#ccc" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Precio"
                required
                fullWidth
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                InputProps={{ sx: { color: "#fff" } }}
                InputLabelProps={{ sx: { color: "#ccc" } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Descripción"
                required
                fullWidth
                multiline
                minRows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                InputProps={{ sx: { color: "#fff" } }}
                InputLabelProps={{ sx: { color: "#ccc" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Stock"
                required
                fullWidth
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                InputProps={{ sx: { color: "#fff" } }}
                InputLabelProps={{ sx: { color: "#ccc" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Categoría"
                required
                fullWidth
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                InputProps={{ sx: { color: "#fff" } }}
                InputLabelProps={{ sx: { color: "#ccc" } }}
              >
                {catList.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" component="label" sx={{ color: "#00e0ff" }}>
                Seleccionar Imágenes
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => setImages(e.target.files)}
                />
              </Button>
              <Typography variant="caption" sx={{ ml: 1 }}>
                {images.length} archivo(s) seleccionado(s)
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                sx={{ bgcolor: "#00e0ff", color: "#001b36", fontWeight: 700 }}
              >
                Guardar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
