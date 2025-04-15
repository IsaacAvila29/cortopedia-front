"use client";
import { TextField, Typography } from "@mui/material";
import React from "react";
import { articleMocks } from "./Articlemocks";
import { useQuery } from "@tanstack/react-query";

export const Article = () => {
  interface Article {
    id: number;
    title: string;
    content: string;
  }

  //   const [inputValue, setInputValue] = React.useState("");
  //   const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
  //     setInputValue(event.target.value);
  //   };
  //   console.log(inputValue);
  const { data, isLoading } = useQuery<Article[]>({
    queryKey: ["article"],
    queryFn: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(articleMocks);
        }, 1000);
      });
    },
  });

  if (isLoading) {
    return <div>Cargando...</div>;
  }
  console.log(data);
  return (
    <>
      <Typography variant="h3" marginBottom={10}>
        {data?.[1].title}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          whiteSpace: "pre-wrap", // Importante para respetar saltos de línea
          textAlign: "justify",
        }}
        marginBottom={10}
      >
        {data?.[1].content}
      </Typography>

      {/* <TextField onChange={handleInputChange} multiline rows={4} fullWidth /> */}
    </>
  );
};
