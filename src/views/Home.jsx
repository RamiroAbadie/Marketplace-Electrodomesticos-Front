import { Button, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        Bienvenido al Marketplace
      </Typography>
      <Button component={Link} to="/products" variant="contained">
        Comprar ahora
      </Button>
    </Container>
  );
};

export default Home;
