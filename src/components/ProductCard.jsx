import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";

const CARD_WIDTH = 260;
const CARD_HEIGHT = 420;
const IMG_HEIGHT = 180;

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const multiple = product.images?.length > 1;

  const handleAddToCart = () => {
    navigate("/checkout", { state: { product } });
  };

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

          <Box sx={{ mt: "auto" }}>
            <Button
                variant="contained"
                fullWidth
                size="small"
                className="glitch"
                disabled={product.stock <= 0}
                onClick={handleAddToCart}
            >
              Agregar al carrito
            </Button>
          </Box>
        </CardContent>
      </Card>
  );
};

export default ProductCard;
