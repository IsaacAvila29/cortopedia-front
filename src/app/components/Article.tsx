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
          fetch("http://localhost:3000/article")
            .then((response) => response.json())
            .then((data) => resolve(mocks ? articleMocks : data))
            .catch((error) => {
              console.error("Error fetching articles:", error);
              resolve([]);
            });
        }, 1000);
      });
    },
  });
  console.log("La data", data);
  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!data) {
    return <div>Artículo no encontrado</div>;
  }

  return (
    <Box px={10} py={5}>
      <Typography variant="h3" marginBottom={10}>
        {data[1]?.title}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          whiteSpace: "pre-wrap", // Importante para respetar saltos de línea
          textAlign: "justify",
        }}
        marginBottom={10}
      >
        {data[1]?.content}
      </Typography>
    </Box>
  );
};
