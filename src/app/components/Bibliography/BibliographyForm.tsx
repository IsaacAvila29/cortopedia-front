"use client";
import React, { useMemo, useState } from "react";
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
import { useSubmitBibliography } from "@/app/hooks/articleHooks";

export interface BibliographyFormProps {
  id: string;
  author?: string;
  year?: string;
  title?: string;
  date?: string;
  publisher?: string;
  websiteName?: string;
  url?: string;
}

const formatBibliography = (
  type: string,
  data: BibliographyFormProps
): string => {
  if (type === "web") {
    return `${data.author || ""} (${data.year || ""}). ${data.title || ""}. ${
      data.websiteName || ""
    }. ${data.url || ""}`;
  }

  if (type === "book") {
    return `${data.author || ""} (${data.year || ""}). ${data.title || ""}. ${
      data.publisher || ""
    }.`;
  }

  return "";
};

const BibliographyForm = ({ id }: { id?: string }) => {
  const [bibliographyType, setBibliographyType] = useState<"web" | "book">(
    "web"
  );
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
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
  } = useSubmitBibliography();

  const handleBibliographyTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBibliographyType(event.target.value as "web" | "book");
    setPreview(null);
  };

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
        <TextField value={id} {...register("id")} />

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
        Guardar referencia
      </Button>

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
