"use client";

import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import Logo from "./Logo";

export default function TopBar() {
  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box>
            <Logo height={50} />
          </Box>

          <Box>
            <Button color="inherit" href="/article">
              Ir a un articulo
            </Button>
            <Button color="inherit">Iniciar sesión</Button>
            <Button color="inherit">Registrarse</Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Contenedor principal sin margen superior */}
      <Box></Box>
    </>
  );
}
