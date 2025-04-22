import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFetchArticle, useSubmitArticle } from "../hooks/articleHooks";
import { Toaster } from "react-hot-toast";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { supabase } from "../supabase/supabaseClient";
import Image from "./ui/Image";
export interface ArticleFormProps {
  title: string;
  content: string;
  image_url?: string;
  image_description?: string;
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
      <Box
        sx={{
          maxWidth: 400,
          margin: "auto",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" marginBottom={2}>
          Subir Imagen
        </Typography>

        {/* Botón personalizado para seleccionar archivo */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          id="file-input"
          disabled={uploading}
          hidden
        />
        <label htmlFor="file-input">
          <Button
            variant="outlined"
            component="span"
            disabled={uploading}
            sx={{ borderRadius: 2 }}
          >
            {image ? "Cambiar Imagen" : "Seleccionar Imagen"}
          </Button>
        </label>
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={uploading || !image}
          sx={{ borderRadius: 2, minWidth: 160, mt: 2 }}
        >
          {uploading ? <CircularProgress size={24} /> : "Subir Imagen"}
        </Button>

        {/* Imagen subida o vista previa */}
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="body1" gutterBottom>
            {uploadedUrl ? "Imagen subida:" : "Vista previa"}
          </Typography>

          <Box
            sx={{
              overflow: "hidden",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Image
              src={uploadedUrl || data?.image_url || "/Logo.png"}
              alt="Imagen"
              width={300}
            />
          </Box>
        </Box>
      </Box>
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
    if (uploadedUrl) {
      setValue("image_url", uploadedUrl);
    }
  }, [uploadedUrl, setValue]);
  console.log("EL UPLOAD", uploadedUrl);

  useEffect(() => {
    if (data) {
      setValue("title", data.title);
      setValue("content", data.content);
      setValue("image_url", data.image_url);
      console.log("EL DE DATA", data.image_url);
    }
  }, [data, setValue]);

  if (loadingFetch) return <p>Cargando...</p>;
  if (errorFetch) return <p>Error al cargar el artículo</p>;

  return (
    <>
      <Toaster />
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", gap: "2rem" }}
      >
        <Box style={{ flex: 1 }}>
          <TextField
            {...register("title")}
            label="Título"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            {...register("image_url")}
            label="URL de la imagen"
            variant="outlined"
            fullWidth
            margin="normal"
            disabled
            style={{ display: "none" }}
          />
          <TextField
            {...register("content")}
            label="Contenido"
            variant="outlined"
            fullWidth
            multiline
            rows={10}
            margin="normal"
            inputProps={{ style: { height: "auto" } }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
            disabled={loadingSubmit}
          >
            {loadingSubmit ? "Guardando..." : id ? "Editar" : "Crear"}
          </Button>
          {errorSubmit && (
            <Box style={{ color: "red" }}>Error: {errorSubmit}</Box>
          )}
        </Box>
        <Box style={{ flex: 0.5 }}>
          <ImageUploadForm />
          <TextField
            {...register("image_description")}
            label="Descripción de la imagen"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="Descripción de la imagen"
          />
        </Box>
      </form>
    </>
  );
};

export default ArticleForm;
