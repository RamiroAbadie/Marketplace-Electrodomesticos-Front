import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <Box
        sx={{
          width: "100vw",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          background: "linear-gradient(135deg,#040404 0%,#060320 40%,#05003d 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.02) 3px)",
            pointerEvents: "none",
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: "'Orbitron', sans-serif",
              color: "#fff",
              fontWeight: 700,
              mb: 2,
            }}
          >
            Tecnología del Mañana,
            <br />
            Hoy.
          </Typography>

          <Typography
            variant="h5"
            sx={{ color: "rgba(255,255,255,0.8)", maxWidth: 600, mb: 4 }}
          >
            En Nexus Electronics, no esperamos al futuro.<br/>Lo creamos.
          </Typography>

          <Button
            component={Link}
            to="/products"
            size="large"
            variant="contained"
            className="glitch"
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
            Explorar catálogo
          </Button>
        </Container>

        {/* LOGO decorativo */}
        <Box
          component="img"
          src="/NexusElectronics Logo (tinify).png"
          alt="Logo NE"
          sx={{
            position: "absolute",
            right: { xs: -60, md: -40 },
            bottom: { xs: -20, md: -10 },
            width: { xs: "60vw", md: "420px" },
            maxWidth: "600px",
            opacity: 0.9,
            pointerEvents: "none",
          }}
        />
      </Box>
    </>
  );
}