"use client";

import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import Logo from "./Logo";

export default function TopBar() {
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "white" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box
            sx={{
              backgroundColor: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => (window.location.href = "/")}
          >
            <Logo height={64} />
            <Typography
              marginLeft={1}
              fontSize={30}
              color="black"
              sx={{ fontFamily: "Times New Roman, Times, serif" }}
            >
              La Cortopedia
            </Typography>
          </Box>

          <Box>
            <Button color="inherit" href="/article">
              Ir a un articulo
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Contenedor principal sin margen superior */}
    </>
  );
}
