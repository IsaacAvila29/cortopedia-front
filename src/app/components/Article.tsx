"use client";
import { Box, Typography } from "@mui/material";
import React from "react";
import { articleMocks } from "./Articlemocks";
import { useQuery } from "@tanstack/react-query";

export const Article = ({ id }: { id: number }) => {
  interface Article {
    id: number;
    title: string;
    content: string;
  }

  const mocks = false;

  const { data, isLoading } = useQuery<Article[]>({
    queryKey: ["article"],
    queryFn: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mocks ? articleMocks : articleMocks); // Usar la live data del servidor
        }, 1000);
      });
    },
  });

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  const article = data?.find((article) => article.id === id);

  if (!article) {
    return <div>Artículo no encontrado</div>;
  }

  return (
    <Box px={10} py={5}>
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
