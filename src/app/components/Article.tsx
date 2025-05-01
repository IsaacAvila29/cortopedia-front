"use client";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "./ui/Image";

export const Article = ({ id }: { id: string }) => {
  interface Article {
    id: string;
    title: string;
    content: string;
    image_url: string;
    image_description?: string;
  }
  interface Bibliography {
    article_id: string;
    author?: string;
    year?: string;
    title?: string;
    date?: string;
    publisher?: string;
    websiteName?: string;
    url?: string;
  }

  const fetchArticleById = async (): Promise<Article> => {
    const res = await fetch(`http://localhost:3001/article/${id}`); //TODO, Esto tal vez en un futuro cambie a un endpoint de una API
    if (!res.ok) {
      throw new Error("Error fetching article");
    }
    return res.json();
  };
  const fetchBiblographyById = async (): Promise<Bibliography> => {
    const res = await fetch(`http://localhost:3001/bibliography/${id}`); //TODO, Esto tal vez en un futuro cambie a un endpoint de una API
    if (!res.ok) {
      throw new Error("Error fetching bibliography");
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

  const {
    data: bibliography,
    isLoading: isLoadingBibliography,
    isError: isErrorBibliography,
  } = useQuery<Bibliography>({
    queryKey: ["bibliography", id],
    queryFn: fetchBiblographyById,
  });

  console.log("BIBLIOGRAFIAS", bibliography);

  const Bibliographies = () => {
    if (isLoadingBibliography) {
      return <div>Cargando...</div>;
    }
    if (isErrorBibliography || !bibliography) {
      return <div>Bibliografía no encontrada</div>;
    }
    const formatBibliography = (bibliography: Bibliography) => {
      const parts = [
        bibliography.author,
        bibliography.year ? `(${bibliography.year})` : null,
        bibliography.title,
        bibliography.publisher,
        bibliography.websiteName,
      ];
      const formattedText = parts.filter(Boolean).join(". ");
      return (
        <>
          {formattedText}
          {bibliography.url && (
            <>
              .{" "}
              <a href={bibliography.url} target="_blank">
                {bibliography.url}
              </a>
            </>
          )}
        </>
      );
    };
    return <Typography>{formatBibliography(bibliography)}</Typography>;
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (isError || !article) {
    return <div>Artículo no encontrado</div>;
  }

  return (
    <Box
      px={10}
      py={5}
      display="flex"
      flexDirection="row"
      alignItems="flex-start"
    >
      <Box flex={1}>
        <Button href={`${id}/edit`}>Editar</Button>
        <Typography variant="h3" marginBottom={10}>
          {article.title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            whiteSpace: "pre-wrap",
            textAlign: "justify",
          }}
          marginBottom={10}
        >
          {article.content}
        </Typography>
        <Typography variant="h5" marginBottom={10}>
          {bibliography ? (
            <>
              <Bibliographies />
              <Button href={`/bibliography/${id}/edit`}>
                Editar la bibliografía
              </Button>
            </>
          ) : (
            <>
              ¿Deseas añadir una bibliografía? <br /> Haz click en editar!
            </>
          )}
        </Typography>
      </Box>
      <Box marginLeft={5} marginTop={20}>
        {article.image_url && (
          <Image
            src={article.image_url}
            descriptionImage={article.image_description}
          />
        )}
      </Box>
    </Box>
  );
};
