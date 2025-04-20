import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAllArticles } from "../hooks/articleHooks";

const ArticlesList = () => {
  const { data, isLoading, isError } = useAllArticles();
  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (isError || !data) {
    return <div>Error al cargar los artículos</div>;
  }

  return (
    <>
      <Typography variant="h4" marginBottom={2} marginTop={10}>
        Estos son los artículos disponibles:
      </Typography>
      <div>
        {data.map((article: { id: string; title: string }) => (
          <div key={article.id}>
            <a
              href={`/article/${article.id}`}
              style={{ textDecoration: "none" }}
            >
              <Typography
                color="blue"
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                {article.title}
              </Typography>
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export const Welcome = () => {
  return (
    <Box px={10} py={5}>
      <Typography variant="h3">Bienvenido a La cortopedia</Typography>
      <ArticlesList />
    </Box>
  );
};

export default Welcome;
