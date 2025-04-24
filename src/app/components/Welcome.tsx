import { Box, Typography } from "@mui/material";
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

  if (data.length === 0) {
    return (
      <div>
        <Typography variant="h4" marginBottom={2}>
          ¡De momento no hay artículos disponibles!
        </Typography>
        <Typography marginBottom={2}>
          Te invitamos a crear un articulo
        </Typography>
      </div>
    );
  }

  return (
    <>
      <Typography variant="h4" marginBottom={2}>
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
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  display: "inline",
                }}
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
      <center>
        <Typography variant="h3">Bienvenido a La cortopedia</Typography>
      </center>
      <Box bgcolor={"#f0f0f0"} p={2} borderRadius={2} marginTop={5}>
        <ArticlesList />
      </Box>
    </Box>
  );
};

export default Welcome;
