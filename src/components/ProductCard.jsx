import {
  Card,
  CardContent,
  Typography,
  Button,
  Box
} from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CARD_WIDTH  = 260;
const CARD_HEIGHT = 400;
const IMG_HEIGHT  = 180;

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const multiple = product.images?.length > 1;
    const { token, user } = useSelector((state) => state.user);
    const logged = Boolean(token);
    const admin = user?.role === "ADMIN"; // o "ROLE_ADMIN"

  /* ─── Click en la tarjeta ─── */
  const handleCardClick = () => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  /* ─── Click en “Agregar al carrito” ─── */
  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!logged) {
      navigate("/login");
      return;
    }
    navigate("/checkout", { state: { product } });
  };

  return (
    <Card
      sx={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        m: 3,
        display: "flex",
        flexDirection: "column",
        cursor: "default",
        backgroundColor: "#281c61",
        color: "#ffffff",
        borderRadius: 3,
        boxShadow: 4
      }}
    >
      {/* Imágenes */}
      <Box sx={{ width: "100%", height: IMG_HEIGHT, overflow: "hidden" }}>
        {multiple ? (
          <Carousel
            showArrows
            showStatus={false}
            showThumbs={false}
            swipeable
            emulateTouch
            infiniteLoop
            onClickItem={(e) => e.stopPropagation()}
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

      {/* Texto + botón */}
      <CardContent
        onClick={handleCardClick}
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          cursor: "pointer"
        }}
      >
        <Typography
          variant="h6"
          color="#ffffff"
          sx={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          {product.description}
        </Typography>

        <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
          ${product.price}
        </Typography>
        <Typography variant="caption" sx={{ mb: 1 }}>
          Stock: {product.stock > 0 ? product.stock : "Sin stock"}
        </Typography>

        {/* Botón sólo para usuarios (no admin) */}
        {!admin && (
          <Box sx={{ mt: "auto" }}>
            <Button
              variant="contained"
              fullWidth
              size="small"
              disabled={product.stock <= 0}
              onClick={handleAddToCart}
              sx={{
                fontWeight: "bold",
                background: "#00e0ff",
                color: "#001b36",
                boxShadow: "0 0 12px #00e0ff",
                transition: "transform .3s, box-shadow .3s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 0 20px #00e0ff",
                  background: "#00e0ff"
                }
              }}
            >
              Agregar al carrito
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
