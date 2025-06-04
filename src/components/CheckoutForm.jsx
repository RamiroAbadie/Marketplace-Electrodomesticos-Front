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
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CheckoutForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const product = location.state?.product;

    // Estados para los campos del cliente
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [zip, setZip] = useState("");
    const [city, setCity] = useState("");

    // Estado del método de pago
    const [paymentMethod, setPaymentMethod] = useState("tarjeta");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cardHolder, setCardHolder] = useState("");
    const [cvv, setCvv] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones de formato
        const nameRegex = /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/;
        const addressRegex = /^[A-Za-z0-9\s]+$/;
        const zipRegex = /^\d{4,8}$/;
        const cardNumberRegex = /^\d{15}$/;
        const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/; // mm/yy
        const cardHolderRegex = /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/;
        const cvvRegex = /^\d{3}$/;

        if (!nameRegex.test(fullName)) {
            alert("El nombre y apellido solo puede contener letras.");
            return;
        }

        if (!addressRegex.test(address)) {
            alert("La dirección no debe contener símbolos especiales.");
            return;
        }

        if (!zipRegex.test(zip)) {
            alert("El código postal debe contener solo números (entre 4 y 8 dígitos).");
            return;
        }

        if (!nameRegex.test(city)) {
            alert("La localidad solo puede contener letras.");
            return;
        }

        if (!cardNumberRegex.test(cardNumber)) {
            alert("El número de tarjeta debe tener 15 dígitos.");
            return;
        }

        if (!expiryRegex.test(expiry)) {
            alert("La fecha de vencimiento debe tener el formato MM/AA.");
            return;
        }

        if (!cardHolderRegex.test(cardHolder)) {
            alert("El nombre del titular solo puede contener letras.");
            return;
        }

        if (!cvvRegex.test(cvv)) {
            alert("El código de seguridad debe tener exactamente 3 números.");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Debés iniciar sesión para realizar la compra.");
            navigate("/login");
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

            const data = await res.json();
            localStorage.setItem("lastOrder", JSON.stringify(data));

            alert("Orden confirmada 🚀");
            window.location.href = "/confirmation";
        } catch (err) {
            console.error(err);
            alert("Hubo un problema al crear la orden");
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={4} alignItems="flex-start" justifyContent="space-between" wrap="nowrap">
                {/* 1 - Cliente */}
                <Grid item xs={4}>
                    <Paper sx={{ p: 3, backgroundColor: "rgba(20, 20, 60, 0.7)", color: "#fff", borderRadius: 2 }}>
                        <Typography variant="h6" fontFamily="'Orbitron', sans-serif" mb={2}>
                            Datos del Cliente
                        </Typography>
                        <TextField label="Nombre y Apellido" fullWidth variant="filled" margin="normal"
                                   value={fullName} onChange={(e) => setFullName(e.target.value)}
                                   InputProps={{ sx: { color: "#fff" } }} InputLabelProps={{ sx: { color: "#ccc" } }} />
                        <TextField label="Dirección y Número" fullWidth variant="filled" margin="normal"
                                   value={address} onChange={(e) => setAddress(e.target.value)}
                                   InputProps={{ sx: { color: "#fff" } }} InputLabelProps={{ sx: { color: "#ccc" } }} />
                        <TextField label="Código Postal" fullWidth variant="filled" margin="normal"
                                   value={zip} onChange={(e) => setZip(e.target.value)}
                                   InputProps={{ sx: { color: "#fff" } }} InputLabelProps={{ sx: { color: "#ccc" } }} />
                        <TextField label="Localidad" fullWidth variant="filled" margin="normal"
                                   value={city} onChange={(e) => setCity(e.target.value)}
                                   InputProps={{ sx: { color: "#fff" } }} InputLabelProps={{ sx: { color: "#ccc" } }} />
                    </Paper>
                </Grid>

                {/* 2 - Pago */}
                <Grid item xs={4}>
                    <Paper sx={{ p: 3, backgroundColor: "rgba(20, 20, 60, 0.7)", color: "#fff", borderRadius: 2 }}>
                        <Typography variant="h6" fontFamily="'Orbitron', sans-serif" mb={2}>
                            Método de Pago
                        </Typography>
                        <FormControl fullWidth margin="normal" variant="filled">
                            <InputLabel sx={{ color: "#ccc" }}>Método</InputLabel>
                            <Select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} sx={{ color: "#fff" }}>
                                <MenuItem value="tarjeta">Tarjeta de crédito</MenuItem>
                                <MenuItem value="debito">Tarjeta de débito</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField label="Número de tarjeta" fullWidth variant="filled" margin="normal"
                                   value={cardNumber} onChange={(e) => setCardNumber(e.target.value)}
                                   InputProps={{ sx: { color: "#fff" } }} InputLabelProps={{ sx: { color: "#ccc" } }} />
                        <TextField label="Fecha de vencimiento" placeholder="MM/AA" fullWidth variant="filled" margin="normal"
                                   value={expiry} onChange={(e) => setExpiry(e.target.value)}
                                   InputProps={{ sx: { color: "#fff" } }} InputLabelProps={{ sx: { color: "#ccc" } }} />
                        <TextField label="Nombre del titular" fullWidth variant="filled" margin="normal"
                                   value={cardHolder} onChange={(e) => setCardHolder(e.target.value)}
                                   InputProps={{ sx: { color: "#fff" } }} InputLabelProps={{ sx: { color: "#ccc" } }} />
                        <TextField label="Código de seguridad" type="password" fullWidth variant="filled" margin="normal"
                                   value={cvv} onChange={(e) => setCvv(e.target.value)}
                                   InputProps={{ sx: { color: "#fff" } }} InputLabelProps={{ sx: { color: "#ccc" } }} />
                    </Paper>
                </Grid>

                {/* 3 - Producto + botón */}
                <Grid item xs={4}>
                    <Paper sx={{
                        p: 3,
                        backgroundColor: "rgba(20, 20, 60, 0.7)",
                        color: "#fff",
                        borderRadius: 2,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}>
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
