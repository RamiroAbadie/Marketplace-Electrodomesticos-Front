import {
  Box,
  Typography,
  Container,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { useState } from "react";

const n = (v) => (isFinite(v) ? Number(v) : 0);

export default function ProductDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;

  const { token, user } = useSelector((s) => s.user);
  const logged = Boolean(token);
  const admin = user?.role === "ADMIN";
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const dispatch = useDispatch();

  if (!product) {
    return (
      <Container sx={{ py: 10 }}>
        <Typography variant="h5" color="error">
          ⚠️ Producto no disponible.
        </Typography>
      </Container>
    );
  }

  /* calculo de precio */
  const price = n(product.price);
  const discount = n(product.discount);
  const hasDiscount = discount > 0;
  const finalNum = price * (1 - discount / 100);
  const finalTxt = finalNum.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
  });
  const origTxt = price.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
  });

  const handleAddToCart = () => {
    if (!logged) {
      navigate("/login");
      return;
    }
    dispatch(
      addToCart({
        id: product.id,
        name: product.description,
        price: finalNum,
        quantity: 1,
      })
    );
    setOpenSnackbar(true);
  };

  return (
    <>
      <Box
        sx={{
          width: "100vw",
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #040404 0%, #060320 40%, #05003d 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            maxWidth: 1000,
            width: "100%",
            gap: 5,
            borderRadius: 4,
            background: "rgb(47,29,101)",
            backdropFilter: "blur(10px)",
            boxShadow: 6,
            p: 4,
            color: "#fff",
          }}
        >
          {/* Imagen */}
          <Box
            component="img"
            src={`data:image/jpeg;base64,${product.images?.[0]}`}
            alt={product.description}
            sx={{
              width: { xs: "100%", md: "50%" },
              maxHeight: 400,
              objectFit: "contain",
              borderRadius: 2,
              backgroundColor: "#0c1024",
            }}
          />

          {/* Info */}
          <Box
            sx={{ flex: 1, display: "flex", flexDirection: "column" }}
          >
            <Typography
              variant="h3"
              sx={{ fontFamily: "'Orbitron', sans-serif", mb: 3 }}
            >
              {product.description}
            </Typography>

            {/* Precio */}
            <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
              {hasDiscount ? (
                <>
                  <s style={{ opacity: 0.7 }}>${origTxt}</s>{" "}
                  <strong>${finalTxt}</strong>
                </>
              ) : (
                <>${origTxt}</>
              )}
            </Typography>

            <Typography variant="subtitle2" color="success.light" sx={{ mb: 4 }}>
              Stock disponible: {product.stock}
            </Typography>

            {!admin && (
              <Button
                disabled={product.stock <= 0}
                variant="contained"
                onClick={handleAddToCart}
                sx={{
                  fontWeight: "bold",
                  background: "#00e0ff",
                  color: "#001b36",
                  boxShadow: "0 0 12px #00e0ff",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 0 20px #00e0ff",
                  },
                }}
              >
                Agregar al Carrito
              </Button>
            )}
          </Box>
        </Box>
      </Box>

      {/* Snackbar */}
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
