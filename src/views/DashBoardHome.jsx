import { Typography, Box } from "@mui/material";

export default function DashboardHome() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        ¡Bienvenido al panel de administración!
      </Typography>
      <Typography variant="body1">
        Usá la barra lateral para gestionar productos, categorías y usuarios.
      </Typography>
    </Box>
  );
}
