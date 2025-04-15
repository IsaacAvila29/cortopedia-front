import { Button, TextField } from "@mui/material";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface ArticleFormProps {
  title: string;
  content: string;
}

export const ArticleForm = () => {
  const { register, handleSubmit } = useForm<ArticleFormProps>();

  const onSubmit = async (data: ArticleFormProps) => {
    try {
      const res = await fetch("http://localhost:3000/article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Error al crear artículo");

      console.log("Artículo creado");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register("title")}
        label="Título"
        variant="outlined"
        fullWidth
        margin="normal"
      ></TextField>
      <TextField
        {...register("content")}
        label="Contenido"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        margin="normal"
      ></TextField>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
      ></Button>
    </form>
  );
};
export default ArticleForm;
