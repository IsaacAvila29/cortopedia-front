"use client";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import ArticleForm from "./ArticleForm";

export const Article = ({ id }: { id: string }) => {
  interface Article {
    id: string;
    title: string;
    content: string;
  }

  const fetchArticleById = async (): Promise<Article> => {
    const res = await fetch(`http://localhost:3001/article/${id}`); //TODO, Esto tal vez en un futuro cambie a un endpoint de una API
    if (!res.ok) {
      throw new Error("Error fetching article");
    }
    return res.json();
  };

  const {
    data: article,
    isLoading,
    isError,
  } = useQuery<Article>({
    queryKey: ["article", id],
    queryFn: fetchArticleById,
  });

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (isError || !article) {
    return <div>Artículo no encontrado</div>;
  }

  return (
    <Box px={10} py={5}>
      <Button href={`${id}/edit`}>Editar</Button>
      <Typography variant="h3" marginBottom={10}>
        {article.title}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          whiteSpace: "pre-wrap", // Importante para respetar saltos de línea
          textAlign: "justify",
        }}
        marginBottom={10}
      >
        {article.content}
      </Typography>
    </Box>
  );
};
