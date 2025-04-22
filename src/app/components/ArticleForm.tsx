import React, { use, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { useFetchArticle, useSubmitArticle } from "../hooks/articleHooks";
import { Toaster } from "react-hot-toast";
import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import ImageUploadForm from "./ImageUploadForm";
import { supabase } from "../supabase/supabaseClient";
export interface ArticleFormProps {
  title: string;
  content: string;
  image_url: string;
}

export const ArticleForm = ({ id }: { id?: string }) => {
  const [image, setImage] = React.useState<File | null>(null);
  const [uploading, setUploading] = React.useState(false);
  const [uploadedUrl, setUploadedUrl] = React.useState<string | null>(null);
  const ImageUploadForm = () => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        setImage(event.target.files[0]);
      }
    };
    const handleUpload = async () => {
      if (!image) {
        alert("Selecciona una imagen para subir");
        return; // TODO, tambien hacer que se pueda o no subir una imagen
      }
      setUploading(true);
      try {
        const fileName = `${Date.now()}_${image?.name}`;
        const { data, error } = await supabase.storage
          .from("images") // Nombre de tu bucket
          .upload(fileName, image as File); // Asegúrate de que image no sea null

        if (error) throw error;

        const { data: publicUrlData } = supabase.storage
          .from("images")
          .getPublicUrl(fileName);

        setUploadedUrl(publicUrlData.publicUrl);
        alert("Imagen subida con éxito"); //Reemplaza esto con un toast o notificación si lo deseas
      } catch (error) {
        console.error("Error al subir la imagen:", error);
        alert("Error al subir la imagen"); //Reemplaza esto con un toast o notificación si lo deseas
      } finally {
        setUploading(false);
      }
    };
    console.log(uploadedUrl);
    return (
      <div>
        <Typography variant="h6" marginBottom={2}>
          Subir Imagen
        </Typography>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={uploading || !image}
          sx={{ marginTop: 2 }}
        >
          {uploading ? <CircularProgress size={24} /> : "Subir Imagen"}
        </Button>
        {uploadedUrl && (
          <div style={{ marginTop: "1rem" }}>
            <Typography variant="body1">Imagen subida:</Typography>
            <img
              src={uploadedUrl}
              alt="Uploaded"
              style={{ maxWidth: "100%", marginTop: "0.5rem" }}
            />
          </div>
        )}
      </div>
    );
  };

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

  useEffect(() => {
    if (uploadedUrl) {
      setValue("image_url", uploadedUrl);
    }
  }, [uploadedUrl, setValue]);
  console.log(uploadedUrl);

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
        />{" "}
        <TextField
          {...register("image_url")}
          label="URL de la imagen"
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
          rows={10} // Incrementar el número de filas para abarcar más altura
          margin="normal"
          inputProps={{ style: { height: "auto" } }} // Permitir que el campo crezca dinámicamente
        />
        <ImageUploadForm />
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
