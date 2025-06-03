import {
    Grid,
    TextField,
    Typography,
    Paper,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";

export default function CheckoutForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const product = location.state?.product;
    console.log("Producto recibido:", product);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Debés iniciar sesión para realizar la compra.");
            navigate("/login")
            return;
        }

        try {
            const res = await fetch("http://localhost:8080/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    items: [
                        {
                            productId: product.id,
                            quantity: 1,
                        },
                    ],
                }),
            });

            if (!res.ok) throw new Error("Error al crear la orden");

            alert("Orden confirmada 🚀");
            window.location.href = "/";
        } catch (err) {
            console.error(err);
            alert("Hubo un problema al crear la orden");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid
                container
                spacing={4}
                alignItems="flex-start"
                justifyContent="space-between"
                wrap="nowrap"
            >
                {/* 1 - Cliente */}
                <Grid item xs={4}>
                    <Paper
                        sx={{
                            p: 3,
                            backgroundColor: "rgba(20, 20, 60, 0.7)",
                            color: "#fff",
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="h6" fontFamily="'Orbitron', sans-serif" mb={2}>
                            Datos del Cliente
                        </Typography>

                        <TextField fullWidth label="Nombre y Apellido" variant="filled" margin="normal"
                                   InputProps={{ sx: { color: "#fff" } }} InputLabelProps={{ sx: { color: "#ccc" } }} />
                        <TextField fullWidth label="Dirección y Número" variant="filled" margin="normal"
                                   InputProps={{ sx: { color: "#fff" } }} InputLabelProps={{ sx: { color: "#ccc" } }} />
                        <TextField fullWidth label="Código Postal" variant="filled" margin="normal"
                                   InputProps={{ sx: { color: "#fff" } }} InputLabelProps={{ sx: { color: "#ccc" } }} />
                        <TextField fullWidth label="Localidad" variant="filled" margin="normal"
                                   InputProps={{ sx: { color: "#fff" } }} InputLabelProps={{ sx: { color: "#ccc" } }} />
                    </Paper>
                </Grid>

                {/* 2 - Pago */}
                <Grid item xs={4}>
                    <Paper
                        sx={{
                            p: 3,
                            backgroundColor: "rgba(20, 20, 60, 0.7)",
                            color: "#fff",
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="h6" fontFamily="'Orbitron', sans-serif" mb={2}>
                            Método de Pago
                        </Typography>

                        <FormControl fullWidth margin="normal" variant="filled">
                            <InputLabel sx={{ color: "#ccc" }}>Método</InputLabel>
                            <Select defaultValue="tarjeta" sx={{ color: "#fff" }}>
                                <MenuItem value="tarjeta">Tarjeta de crédito</MenuItem>
                                <MenuItem value="debito">Tarjeta de débito</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField fullWidth label="Número de tarjeta" variant="filled" margin="normal"
                                   InputProps={{ sx: { color: "#fff" } }} InputLabelProps={{ sx: { color: "#ccc" } }} />
                        <TextField fullWidth label="Fecha de vencimiento" variant="filled" margin="normal" placeholder="MM/AA"
                                   InputProps={{ sx: { color: "#fff" } }} InputLabelProps={{ sx: { color: "#ccc" } }} />
                        <TextField fullWidth label="Nombre del titular" variant="filled" margin="normal"
                                   InputProps={{ sx: { color: "#fff" } }} InputLabelProps={{ sx: { color: "#ccc" } }} />
                        <TextField fullWidth label="Código de seguridad" type="password" variant="filled" margin="normal"
                                   InputProps={{ sx: { color: "#fff" } }} InputLabelProps={{ sx: { color: "#ccc" } }} />
                    </Paper>
                </Grid>

                {/* 3 - Producto + botón */}
                <Grid item xs={4}>
                    <Paper
                        sx={{
                            p: 3,
                            backgroundColor: "rgba(20, 20, 60, 0.7)",
                            color: "#fff",
                            borderRadius: 2,
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box>
                            <Typography variant="h6" fontFamily="'Orbitron', sans-serif" mb={2}>
                                Producto
                            </Typography>
                            <Typography variant="body1" mb={1}>
                                Producto: <strong>{product?.description || "Sin nombre"}</strong>
                            </Typography>
                            <Typography variant="body1" mb={1}>
                                Precio: <strong>${product?.price?.toLocaleString() || "0"}</strong>
                            </Typography>
                            <Typography variant="body2" mb={2}>
                                Cantidad: 1 unidad
                            </Typography>
                        </Box>

                        <Box textAlign="center" mt={4}>
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{
                                    px: 4,
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
                                Confirmar Compra
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </form>
    );
}
