import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 300, m: 2 }}>
      {product.image && (
        <CardMedia
          component="img"
          height="200"
          image={`data:image/jpeg;base64,${product.image}`}
          alt={product.name}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="h6" color="primary">
          ${product.price}
        </Typography>
        <Typography variant="caption" display="block">
          Stock: {product.stock > 0 ? product.stock : "Sin stock"}
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 1 }}>
          Agregar al carrito
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
