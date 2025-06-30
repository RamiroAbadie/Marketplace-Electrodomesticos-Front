import { useEffect, useState } from "react";
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

import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  getAvailableProducts,
  getProductsByCategory,
  getProductsByPriceRange,
  searchProducts,
} from "../redux/slices/productSlice";

export default function Products() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    categoryId: "",
    onlyAvailable: false,
    min: "",
    max: "",
  });

  useEffect(() => {
    const delay = setTimeout(() => {
      if (search) {
        dispatch(searchProducts(search));
      } else if (filters.categoryId) {
        dispatch(getProductsByCategory(filters.categoryId));
      } else if (filters.onlyAvailable) {
        dispatch(getAvailableProducts());
      } else if (filters.min !== "" || filters.max !== "") {
        const min = filters.min || 0;
        const max = filters.max || 500000;
        dispatch(getProductsByPriceRange({ min, max }));
      } else {
        dispatch(getAllProducts());
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [search, filters, dispatch]);

  return (
      <Box sx={{ display: "flex", minHeight: "100vh", background: "#121242" }}>
        <FilterSidebar onApply={setFilters} />

        <Container maxWidth="xl" sx={{ py: 4 }}>
          <TextField
              fullWidth
              placeholder="Buscar producto…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "white" }} />
                    </InputAdornment>
                ),
                sx: {
                  color: "white",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "lightblue",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#00e0ff",
                  },
                },
              }}
              inputProps={{
                style: {
                  color: "white",
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
