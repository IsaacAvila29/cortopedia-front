import React, { use, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFetchArticle, useSubmitArticle } from "../hooks/articleHooks";
import { Toaster } from "react-hot-toast";
import { Button, TextField } from "@mui/material";
export interface ArticleFormProps {
  title: string;
  content: string;
}

export const ArticleForm = ({ id }: { id?: string }) => {
  const { register, handleSubmit, setValue } = useForm<ArticleFormProps>();
  const {
    data,
    loading: loadingFetch,
    error: errorFetch,
  } = useFetchArticle(id || "");
  const {
    onSubmit,
    loading: loadingSubmit,
    error: errorSubmit,
  } = useSubmitArticle(id || "");

  useEffect(() => {
    if (data) {
      setValue("title", data.title);
      setValue("content", data.content);
    }
  }, [data, setValue]);

  if (loadingFetch) return <p>Cargando...</p>;
  if (errorFetch) return <p>Error al cargar el artículo</p>;

  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("title")}
          label="Título"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          {...register("content")}
          label="Contenido"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
          disabled={loadingSubmit} // Deshabilitar el botón mientras se envía el formulario
        >
          {loadingSubmit ? "Guardando..." : id ? "Editar" : "Crear"}
        </Button>
      </form>
      {errorSubmit && <div style={{ color: "red" }}>Error: {errorSubmit}</div>}
    </>
  );
};

export default ArticleForm;
