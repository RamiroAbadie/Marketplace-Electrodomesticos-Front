import { useEffect, useState, useCallback } from "react";
import {
  Box,
  Typography,
  Divider,
  FormControlLabel,
  Switch,
  Slider,
  MenuItem,
  Button,
  Drawer,
  IconButton,
  TextField,
  Fade,
  Tooltip,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import getCategoryLabel from "../utils/getCategoryLabels";

/* =============  CONSTANTES  ============= */
const DRAWER_WIDTH = 300;       // ancho fijo para el panel
const PRICE_MAX      = 100_000; // valor máx. del slider

/* =============  COMPONENTE  ============= */
export default function FilterSidebar({ onApply }) {
  /* -------------- estado interno -------------- */
  const [open, setOpen]           = useState(false);
  const [categories, setCategories] = useState([]);

  const [filters, setFilters] = useState({
    categoryId: "",
    onlyAvailable: false,
    min: "",
    max: "",
  });

  /* ---- cargar categorías ---- */
  useEffect(() => {
    fetch("http://localhost:8080/api/categories")
      .then((r) => r.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  /* ---------------- handlers ---------------- */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSlider = (_, newVal) => {
    setFilters((prev) => ({ ...prev, min: newVal[0], max: newVal[1] }));
  };

  const clearFilters = () =>
    setFilters({ categoryId: "", onlyAvailable: false, min: "", max: "" });

  const handleApply = useCallback(() => {
    onApply(filters);
    setOpen(false);
  }, [filters, onApply]);

  /* -------------- BOTÓN -------------- */
  const FabFilters = (
    <Tooltip title="Filtros" arrow TransitionComponent={Fade}>
      <IconButton
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          bottom: { xs: 24, md: 32 },
          right: { xs: 24, md: 32 },
          zIndex: 1300,
          bgcolor: "primary.main",
          color: "common.white",
          boxShadow: 3,
          "&:hover": { bgcolor: "primary.dark" },
        }}
      >
        <FilterListIcon fontSize="large" />
      </IconButton>
    </Tooltip>
  );

  /* -------------- RENDER -------------- */
  return (
    <>
      {FabFilters}

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: { width: DRAWER_WIDTH, p: 3 },
        }}
      >
        <SidebarContent />
      </Drawer>
    </>
  );

  /* ----------- CONTENIDO ----------- */
  function SidebarContent() {
    return (
      <Box>
        <Typography variant="h6" mb={2}>
          Filtros
        </Typography>

        {/* Categoría */}
        <Typography fontWeight={500} mb={0.5}>
          Categoría
        </Typography>
        <TextField
          select
          size="small"
          fullWidth
          name="categoryId"
          value={filters.categoryId}
          onChange={handleChange}
          sx={{ mb: 3 }}
        >
          <MenuItem value="">Todas</MenuItem>
          {categories.map((c) => (
            <MenuItem key={c.id} value={c.id}>
              {getCategoryLabel(c)}
            </MenuItem>
          ))}
        </TextField>

        {/* Disponibilidad */}
        <FormControlLabel
          control={
            <Switch
              checked={filters.onlyAvailable}
              name="onlyAvailable"
              onChange={handleChange}
            />
          }
          label="Solo disponibles"
          sx={{ mb: 3 }}
        />

        {/* Precio */}
        <Typography fontWeight={500} mb={1}>
          Precio ($)
        </Typography>
        <Slider
          value={[
            Number(filters.min) || 0,
            Number(filters.max) || PRICE_MAX,
          ]}
          min={0}
          max={PRICE_MAX}
          step={1000}
          onChange={handleSlider}
          sx={{ mb: 2 }}
        />

        <Box display="flex" gap={1} mb={3}>
          <TextField
            label="Mín"
            name="min"
            value={filters.min}
            onChange={handleChange}
            size="small"
            type="number"
            fullWidth
          />
          <TextField
            label="Máx"
            name="max"
            value={filters.max}
            onChange={handleChange}
            size="small"
            type="number"
            fullWidth
          />
        </Box>

        <Button variant="contained" fullWidth onClick={handleApply} sx={{ mb: 1 }}>
          Aplicar filtros
        </Button>
        <Button fullWidth onClick={clearFilters}>
          Limpiar
        </Button>
      </Box>
    );
  }
}
