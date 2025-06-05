import { useEffect, useState, useCallback } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  InputAdornment,
  CircularProgress,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import FilterSidebar from "../components/FilterSideBar";
import ProductCard from "../components/ProductCard";

export default function Products() {
  /* ---------- estados ---------- */
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(false);
  const [search, setSearch]     = useState("");

  const [filters, setFilters] = useState({
    categoryId: "",
    onlyAvailable: false,
    min: "",
    max: "",
  });

  /* ---------- fetch ---------- */
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      let url = "/api/products";

      // 1) texto de búsqueda (tiene prioridad)
      if (search) {
        url = `/api/products/search?query=${encodeURIComponent(search)}`;
      } else {
        // 2) filtros
        if (filters.categoryId) {
          url = `/api/products/category/${filters.categoryId}`;
        } else if (filters.onlyAvailable) {
          url = "/api/products/available";
        } else if (filters.min !== "" || filters.max !== "") {
          const min = filters.min || 0;
          const max = filters.max || 500000;
          url = `/api/products/price-range?min=${min}&max=${max}`;
        }
      }

      const res  = await fetch(`http://localhost:8080${url}`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [search, filters]);

  /* inicial + cambios */
  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  /* búsqueda */
  useEffect(() => {
    const t = setTimeout(fetchProducts, 400);
    return () => clearTimeout(t);
  }, [search, fetchProducts]);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "#121242" }}>
      <FilterSidebar onApply={setFilters} />

      <Container maxWidth="xl" sx={{ py: 4 }} >
        <TextField
            fullWidth
            placeholder="Buscar producto…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'white' }} />
                  </InputAdornment>
              ),
              sx: {
                color: 'white',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'lightblue',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#00e0ff',
                },
              },
            }}
            inputProps={{
              style: {
                color: 'white',
              },
            }}
        />


        {loading ? (
          <Box textAlign="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : products.length ? (
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {products.map((p) => (
              <Grid item key={p.id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={p} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h6" mt={4}>
            Sin resultados 🙁
          </Typography>
        )}
      </Container>
    </Box>
  );
}
