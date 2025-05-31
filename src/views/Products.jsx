import { useEffect, useState, useCallback } from "react";
import {
  Container,
  Grid,
  TextField,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearch] = useState("");

  const fetchProducts = useCallback(async (q) => {
    setLoading(true);
    try {
      const url = q
        ? `http://localhost:8080/api/products/search?query=${encodeURIComponent(q)}`
        : "http://localhost:8080/api/products";

      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProducts(""); }, [fetchProducts]);

  useEffect(() => {
    const t = setTimeout(() => fetchProducts(searchTerm), 400);
    return () => clearTimeout(t);
  }, [searchTerm, fetchProducts]);

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <TextField
        fullWidth
        placeholder="Buscar producto…"
        value={searchTerm}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="center">
          {products.map((p) => (
            <Grid item key={p.id}>
              <ProductCard product={p} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
