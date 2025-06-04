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
import { isAdmin } from "../utils/auth.js";

const CARD_WIDTH  = 260;
const CARD_HEIGHT = 360;
const IMG_HEIGHT  = 180;

export default function ProductCard({ product }) {
    const navigate = useNavigate();
    const multiple = product.images?.length > 1;
    const admin    = isAdmin();

    const handleCardClick = () => {
        navigate(`/product/${product.id}`, { state: { product } });
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
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
                cursor: "default", // evitamos que parezca todo clickeable
                backgroundColor: "#2e1755",
                color: "#ffffff",
                borderRadius: 3,
                boxShadow: 4,
            }}
        >
            {/* ——— Imágenes ——— */}
            <Box sx={{ width: "100%", height: IMG_HEIGHT, overflow: "hidden" }}>
                {multiple ? (
                    <Carousel
                        showArrows
                        showStatus={false}
                        showThumbs={false}
                        swipeable
                        emulateTouch
                        infiniteLoop
                        onClickItem={(e) => e.stopPropagation()} // <-- previene navegación desde la imagen
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

            {/* ——— Texto + botón ——— */}
            <CardContent
                onClick={handleCardClick}
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer"
                }}
            >

                <Typography variant="h5" color="#ffffff">
                    {product.description}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                    ${product.price}
                </Typography>
                <Typography variant="caption" sx={{ mb: 1 }}>
                    Stock: {product.stock > 0 ? product.stock : "Sin stock"}
                </Typography>

                {!admin && (
                    <Box sx={{ mt: "auto" }}>
                        <Button
                            variant="contained"
                            fullWidth
                            size="small"
                            disabled={product.stock <= 0}
                            onClick={handleAddToCart}
                            sx={{ fontWeight: "bold" }}
                        >
                            Agregar al carrito
                        </Button>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
}
