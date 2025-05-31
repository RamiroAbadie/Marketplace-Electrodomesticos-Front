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
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Productos
      </Typography>

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        justifyContent="center"
      >
        {products.map((prod) => (
          <Grid item key={prod.id}>
            <ProductCard product={prod} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
