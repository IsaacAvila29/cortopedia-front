"use client";

import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Autocomplete,
  TextField,
} from "@mui/material";
import Logo from "./Logo";
import { Article } from "../Article";
import ArticleSearch from "../ArticleSearch";

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
          <ArticleSearch />
          <Box>
            <Button color="inherit" href="/article">
              <Typography color="black" fontSize={20}>
                Crear un articulo
              </Typography>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Contenedor principal sin margen superior */}
    </>
  );
}
