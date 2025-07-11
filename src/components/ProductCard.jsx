import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { useState } from "react";

const CARD_WIDTH = 260;
const CARD_HEIGHT = 400;
const IMG_HEIGHT = 180;

/* helper seguro: string|undefined -> Número */
const n = (v) => (isFinite(v) ? Number(v) : 0);

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const multiple = product.images?.length > 1;
  const { token, user } = useSelector((state) => state.user);
  const logged = Boolean(token);
  const admin = user?.role === "ADMIN";
  const dispatch = useDispatch();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  /* ─── calculo precio ─── */
  const price = n(product.price);
  const discount = n(product.discount);
  const hasDiscount = discount > 0;
  const finalPriceNum = price * (1 - discount / 100);
  const finalTxt = finalPriceNum.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
  });
  const origTxt = price.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
  });

  /* ─── handlers ─── */
  const handleCardClick = () => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!logged) {
      navigate("/login");
      return;
    }
    dispatch(
      addToCart({
        id: product.id,
        name: product.description,
        price: finalPriceNum,
        quantity: 1,
      })
    );
    setOpenSnackbar(true);
  };

  return (
    <>
      <Card
        sx={{
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
          m: 3,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#281c61",
          color: "#ffffff",
          borderRadius: 3,
          boxShadow: 4,
        }}
      >
        {/* Imagenes */}
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
                    alt={`${product.description} ${i + 1}`}
                    style={{
                      width: "100%",
                      height: IMG_HEIGHT,
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
            </Carousel>
          ) : (
            <img
              src={`data:image/jpeg;base64,${product.images?.[0]}`}
              alt={product.description}
              style={{
                width: "100%",
                height: IMG_HEIGHT,
                objectFit: "cover",
              }}
            />
          )}
        </Box>

        {/* Texto + boton */}
        <CardContent
          onClick={handleCardClick}
          sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
        >
          <Typography variant="h6" sx={{ fontFamily: "'Orbitron', sans-serif" }}>
            {product.description}
          </Typography>

          <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
            {hasDiscount ? (
              <>
                <s style={{ opacity: 0.7 }}>${origTxt}</s>{" "}
                <strong>${finalTxt}</strong>
              </>
            ) : (
              <>${origTxt}</>
            )}
          </Typography>

          <Typography variant="caption" sx={{ mb: 1 }}>
            Stock: {product.stock > 0 ? product.stock : "Sin stock"}
          </Typography>

          {!admin && (
            <Box sx={{ mt: "auto" }}>
              <Button
                fullWidth
                variant="contained"
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
                    background: "#00e0ff",
                  },
                }}
              >
                Agregar al carrito
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Producto agregado al carrito ✅
        </Alert>
      </Snackbar>
    </>
  );
}
