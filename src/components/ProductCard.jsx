import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CARD_WIDTH  = 260;   // ancho fijo
const CARD_HEIGHT = 420;   // alto fijo
const IMG_HEIGHT  = 180;   // alto de la foto/carrusel

const ProductCard = ({ product }) => {
  const multiple = product.images?.length > 1;

  return (
    <Card
      sx={{ width: CARD_WIDTH, height: CARD_HEIGHT, m: 1, display: "flex", flexDirection: "column" }}
    >
      <Box sx={{ width: "100%", height: IMG_HEIGHT, overflow: "hidden" }}>
        {multiple ? (
          <Carousel
            showArrows
            showThumbs={true}
            showStatus={false}
            infiniteLoop
            swipeable
            emulateTouch
          >
            {product.images.map((img, i) => (
              <div key={i}>
                <img
                  src={`data:image/jpeg;base64,${img}`}
                  alt={`${product.name} ${i + 1}`}
                  style={{ width: "100%", height: IMG_HEIGHT, objectFit: "cover" }}
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <img
            src={`data:image/jpeg;base64,${product.images[0]}`}
            alt={product.name}
            style={{ width: "100%", height: IMG_HEIGHT, objectFit: "cover" }}
          />
        )}
      </Box>

      {/* Contenido – usamos flexGrow para empujar el botón al fondo */}
      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
          ${product.price}
        </Typography>
        <Typography variant="caption" sx={{ mb: 1 }}>
          Stock: {product.stock > 0 ? product.stock : "Sin stock"}
        </Typography>

        {/* Botón fijo abajo */}
        <Box sx={{ mt: "auto" }}>
          <Button variant="contained" fullWidth size="small">
            Agregar al carrito
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
