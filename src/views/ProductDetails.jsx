import { Box, Typography, Container, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "../redux/slices/cartSlice.js";
import {useState} from "react";
import { Snackbar, Alert } from "@mui/material";

export default function ProductDetails() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const product = state?.product;
    const { token, user } = useSelector((state) => state.user);
    const logged = Boolean(token);
    const admin = user?.role === "ADMIN"; // o "ROLE_ADMIN"
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const dispatch = useDispatch();

    // console.log("DISPATCH getOrdersByUser:", user.id);
   // console.log("El TOKEN", token);
    if (!product) {
        return (
            <Container sx={{ py: 10 }}>
                <Typography variant="h5" color="error">
                    ⚠️ Producto no disponible.
                </Typography>
            </Container>
        );
    }

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
                price: product.price,
                quantity: 1,
            })
        );

        setOpenSnackbar(true); // mostrar mensaje
    };

    return (
        <>

        <Box
            sx={{
                width: "100vw",
                minHeight: "100vh",
                background: "linear-gradient(135deg, #040404 0%, #060320 40%, #05003d 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                py: 0,
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
                    alt={product.name}
                    sx={{
                        width: { xs: "100%", md: "50%" },
                        maxHeight: 400,
                        objectFit: "contain",
                        borderRadius: 2,
                        backgroundColor: "#0c1024",
                    }}
                />

                {/* Info */}
                <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <Typography
                        variant="h3"
                        color="#ffffff"
                        sx={{ fontFamily: "'Orbitron', sans-serif", mb: 3 }}
                    >
                        {product.description}
                    </Typography>

                    <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
                        ${product.price}
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
                                transition: "transform .3s, box-shadow .3s",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: "0 0 20px #00e0ff",
                                    background: "#00e0ff",
                                },
                            }}
                        >
                            Agregar al Carrito
                        </Button>
                    )}
                </Box>
            </Box>
        </Box>
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
