"use client";
import React, { useMemo, useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

const BibliographyForm = () => {
  const [bibliographyType, setBibliographyType] = useState("web");

  const subtitle = useMemo(() => {
    return bibliographyType === "web"
      ? "Estamos tomando las referencias de una página web"
      : "Estamos tomando las referencias de un libro";
  }, [bibliographyType]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBibliographyType(event.target.value);
  };

  const BibliographyBook = () => (
    <>
      <TextField
        label="Autor/a (Apellido, Inicial)"
        fullWidth
        margin="normal"
      />
      <TextField label="Año de publicación" fullWidth margin="normal" />
      <TextField label="Título del libro" fullWidth margin="normal" />
      <TextField label="Editorial" fullWidth margin="normal" />
    </>
  );

  const BibliographyWeb = () => (
    <>
      <TextField label="Autor/a o nombre del sitio" fullWidth margin="normal" />
      <TextField label="Fecha (Año, día mes)" fullWidth margin="normal" />
      <TextField label="Título de la página" fullWidth margin="normal" />
      <TextField label="Nombre del sitio web" fullWidth margin="normal" />
      <TextField label="URL" fullWidth margin="normal" />
    </>
  );

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Escribe tus referencias:
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {subtitle}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <Box sx={{ flex: 2 }}>
          {bibliographyType === "web" ? (
            <BibliographyWeb />
          ) : (
            <BibliographyBook />
          )}
        </Box>
        <FormControl sx={{ flex: 1 }}>
          <FormLabel id="bibliography-type-label">Tipo de referencia</FormLabel>
          <RadioGroup
            aria-labelledby="bibliography-type-label"
            value={bibliographyType}
            name="bibliography-type"
            onChange={handleChange}
          >
            <FormControlLabel
              value="web"
              control={<Radio />}
              label="Página Web"
            />
            <FormControlLabel value="book" control={<Radio />} label="Libro" />
          </RadioGroup>
        </FormControl>
      </Box>
    </Box>
  );
};

export default BibliographyForm;
