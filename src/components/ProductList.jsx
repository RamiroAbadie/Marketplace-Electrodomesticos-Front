import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Grid, Container, Typography } from "@mui/material";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const API_URL = "http://localhost:8080/api/products";

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error al obtener productos:", error));
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Lista de Productos
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {products.map((p) => (
          <Grid item key={p.id}>
            <ProductCard product={p} />
          </Grid>
        ))}
      </Grid>

    </Container>
  );
};

export default ProductList;
