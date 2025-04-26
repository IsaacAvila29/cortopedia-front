"use client";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React from "react";

const BibliographyBook = () => {
  return (
    <>
      <TextField label="Autor/a (Apellido, Inicial)" fullWidth />
      <TextField label="Año de publicación" fullWidth />
      <TextField label="Título del libro" fullWidth />
      <TextField label="Editorial" fullWidth />
    </>
  );
};

const BibliographyWeb = () => {
  return (
    <>
      <TextField label="Autor/a o nombre del sitio" fullWidth />
      <TextField label="Fecha (Año, día mes)" fullWidth />
      <TextField label="Título de la página" fullWidth />
      <TextField label="Nombre del sitio web" fullWidth />
      <TextField label="URL" fullWidth />
    </>
  );
};

export const BibliographyForm = () => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log((event.target as HTMLInputElement).value);
  };
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">
        Tipo de referencia
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="web"
        name="radio-buttons-group"
        onChange={handleChange}
      >
        <FormControlLabel value="web" control={<Radio />} label="Página Web" />
        <FormControlLabel value="book" control={<Radio />} label="Libro" />
      </RadioGroup>
    </FormControl>
  );
};
export default BibliographyForm;
