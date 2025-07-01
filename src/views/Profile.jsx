import { useEffect } from "react";
import {Box, Typography, Paper, Divider, Grid} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOrdersByUser } from "../redux/slices/orderSlice.js";

export default function Profile() {
    const { user } = useSelector((state) => state.user);
    const orders = useSelector((state) => state.orders.orders);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const calcularTotalOrden = (items) => {
        return items.reduce((total, item) => {
            return total + item.quantity * parseFloat(item.unitPrice);
        }, 0).toFixed(2);
    };
    console.log(orders)
    useEffect(() => {
        if (!user) {
            navigate("/login");
        } else {
            dispatch(getOrdersByUser(user.id));
        }
    }, [user]);

    return (
        <Box
            sx={{
                width: "100vw",
                minHeight: "100vh",
                background: "linear-gradient(135deg,#040404 0%,#060320 40%,#05003d 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                py: 0,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    borderRadius: 3,
                    backgroundColor: "rgba(20, 20, 60, 0.8)",
                    color: "#fff",
                    maxWidth: 600,
                }}
            >
                <Typography variant="h4" fontFamily="'Orbitron', sans-serif" gutterBottom>
                    Mi Cuenta
                </Typography>

                {user ? (
                    <>
                        <Typography variant="h6">Nombre:</Typography>
                        <Typography mb={2}>{user.firstname} {user.lastname}</Typography>

                        <Typography variant="h6">Email:</Typography>
                        <Typography mb={2}>{user.email}</Typography>

                        <Divider sx={{ my: 2, borderColor: "#888" }} />

                        <Typography variant="h6" gutterBottom>Mis Órdenes:</Typography>

                        {orders && orders.length > 0 ? (


                            <Grid container spacing={2}>
                                {orders.map((order) => (
                                    <Grid item xs={12} sm={6} key={order.orderId}>
                                        <Paper sx={{ p: 2,color: "#fff", backgroundColor: "rgb(29,42,110)" }}>
                                            <Typography variant="body2">Orden ID: {order.orderId}</Typography>
                                            <Typography variant="body2">
                                                Total: ${calcularTotalOrden(order.items)}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>


                        ) : (
                            <Typography variant="body2">No tenés órdenes registradas.</Typography>
                        )}
                    </>
                ) : (
                    <Typography>Cargando usuario...</Typography>
                )}
            </Paper>
        </Box>
    );
}
