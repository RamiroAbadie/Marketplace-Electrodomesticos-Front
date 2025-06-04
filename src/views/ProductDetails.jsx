import { Box, Typography, Container, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function ProductDetails() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const product = state?.product;

    if (!product) {
        return (
            <Container sx={{ py: 10 }}>
                <Typography variant="h5" color="error">
                    ⚠️ Producto no disponible.
                </Typography>
            </Container>
        );
    }

    const handleBuyNow = () => {
        navigate("/checkout", { state: { product } });
    };

    return (
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
                    background: "rgb(47,29,101)", // azul claro translúcido
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
                    <Typography variant="h3" sx={{ fontWeight: "bold", color: "#ffffff", mb: 2 }}>
                        {product.description}
                    </Typography>

                    <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
                        ${product.price}
                    </Typography>

                    <Typography variant="subtitle2" color="success.light" sx={{ mb: 4 }}>
                        Stock disponible: {product.stock}
                    </Typography>

                    <Button
                        variant="contained"
                        onClick={handleBuyNow}
                        sx={{
                            alignSelf: "start",
                            px: 4,
                            py: 1.5,
                            fontWeight: "bold",
                            fontSize: "1rem",
                            backgroundColor: "#9c27b0",
                            "&:hover": { backgroundColor: "#7b1fa2" },
                        }}
                    >
                        Comprar ahora
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
