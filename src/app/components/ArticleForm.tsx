import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFetchArticle, useSubmitArticle } from "../hooks/articleHooks";
import { Toaster, toast } from "react-hot-toast";
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
  bibliography?: string;
}

export const ArticleForm = ({ id }: { id?: string }) => {
  const [image, setImage] = React.useState<File | null>(null);
  const [uploading, setUploading] = React.useState(false);
  const [uploadedUrl, setUploadedUrl] = React.useState<string | null>(null);

  const handlePaste = (event: React.ClipboardEvent) => {
    const items = event.clipboardData.items;
    for (const item of items) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file) {
          setImage(file);
          toast.success("Imagen pegada correctamente");
        }
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!image) {
      toast.error("Selecciona una imagen para subir");
      return;
    }
    setUploading(true);
    try {
      const fileName = `${Date.now()}_${image.name}`;
      const { data, error } = await supabase.storage
        .from("images")
        .upload(fileName, image);

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from("images")
        .getPublicUrl(fileName);

      setUploadedUrl(publicUrlData.publicUrl);
      toast.success("Imagen subida con éxito");
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      toast.error("Error al subir la imagen");
    } finally {
      setUploading(false);
    }
  };

  const ImageUploadForm = () => (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        textAlign: "center",
      }}
      onPaste={handlePaste}
    >
      <Typography variant="h6" marginBottom={2}>
        Subir Imagen. <br></br> También puedes pegar una imagen aquí.
      </Typography>

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
          <Image src={uploadedUrl || "/Logo.png"} alt="Imagen" width={300} />
        </Box>
      </Box>
    </Box>
  );

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

  useEffect(() => {
    if (data) {
      setValue("title", data.title);
      setValue("content", data.content);
      setValue("image_url", data.image_url);
      setValue("image_description", data.image_description);
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
