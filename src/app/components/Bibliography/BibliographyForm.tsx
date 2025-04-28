"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import {
  useFetchBibliography,
  useSubmitBibliography,
} from "@/app/hooks/articleHooks";

export interface BibliographyFormProps {
  id?: string;
  article_id: string;
  author?: string;
  year?: string;
  title?: string;
  date?: string;
  publisher?: string;
  websiteName?: string;
  url?: string;
}

const BibliographyForm = ({
  article_id,
  id,
}: {
  article_id?: string;
  id?: string;
}) => {
  const [bibliographyType, setBibliographyType] = useState<"web" | "book">(
    "web"
  );
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BibliographyFormProps>();

  const subtitle = useMemo(() => {
    return bibliographyType === "web"
      ? "Estamos tomando las referencias de una página web"
      : "Estamos tomando las referencias de un libro";
  }, [bibliographyType]);

  const {
    onSubmit,
    loading: loadingSubmit,
    error: errorSubmit,
  } = useSubmitBibliography(id || "");

  const {
    data,
    loading: loadingFetch,
    error: errorFetch,
  } = useFetchBibliography(id || "");

  useEffect(() => {
    if (data) {
      setValue("author", data.author);
      setValue("year", data.year);
      setValue("title", data.title);
      setValue("date", data.date);
      setValue("publisher", data.publisher);
      setValue("websiteName", data.websiteName);
      setValue("url", data.url);
      setValue("article_id", data.article_id);
      setBibliographyType(data.websiteName ? "web" : "book");
    }
  }, [data, setValue]);

  const handleBibliographyTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBibliographyType(event.target.value as "web" | "book");
    setPreview(null);
  };

  if (loadingFetch) return <p>Cargando...</p>;
  if (errorFetch) return <p>Error al cargar la bibliografía</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" gutterBottom>
        Escribe tus referencias:
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {subtitle}
      </Typography>

      <RadioGroup
        row
        value={bibliographyType}
        onChange={handleBibliographyTypeChange}
        aria-labelledby="bibliography-type-label"
      >
        <FormControlLabel value="web" control={<Radio />} label="Página Web" />
        <FormControlLabel value="book" control={<Radio />} label="Libro" />
      </RadioGroup>

      <Box sx={{ mt: 2 }}>
        <TextField
          label={
            bibliographyType === "web"
              ? "Autor/a o nombre del sitio"
              : "Autor/a (Apellido, Inicial)"
          }
          fullWidth
          margin="normal"
          {...register("author")}
        />
        <TextField
          {...register("article_id", { value: article_id })}
          style={{ display: "none" }}
        />
        <TextField
          label={
            bibliographyType === "web"
              ? "Fecha (Año, día mes)"
              : "Año de publicación"
          }
          fullWidth
          margin="normal"
          {...register("year")}
        />
        <TextField
          label={
            bibliographyType === "web"
              ? "Título de la página"
              : "Título del libro"
          }
          fullWidth
          margin="normal"
          {...register("title")}
        />

        {bibliographyType === "web" ? (
          <>
            <TextField
              label="Nombre del sitio web"
              fullWidth
              margin="normal"
              {...register("websiteName")}
            />
            <TextField
              label="URL"
              fullWidth
              margin="normal"
              {...register("url")}
            />
          </>
        ) : (
          <TextField
            label="Editorial"
            fullWidth
            margin="normal"
            {...register("publisher")}
          />
        )}
      </Box>

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        {loadingSubmit ? "Guardando..." : id ? "Guardar edición" : "Crear"}
      </Button>

      {errorSubmit && <Box style={{ color: "red" }}>Error: {errorSubmit}</Box>}

      {preview && (
        <Box mt={3}>
          <Typography variant="subtitle2">Referencia generada:</Typography>
          <Typography>{preview}</Typography>
        </Box>
      )}
    </form>
  );
};

export default BibliographyForm;
