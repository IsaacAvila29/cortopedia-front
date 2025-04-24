import { Autocomplete, Box, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSearchArticles } from "../hooks/articleHooks";
import { useRouter } from "next/navigation";

const ArticleSearch = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const router = useRouter();

  // Debouncing: Actualiza `debouncedSearch` después de 200 ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 200);

    return () => {
      clearTimeout(handler); // Limpia el timeout si el valor de `search` cambia antes de los 200 ms
    };
  }, [search]);

  const { data, isLoading, isError } = useSearchArticles(debouncedSearch);

  if (isError) {
    return <div>Error al cargar los artículos</div>;
  }

  // Opciones con id y title, solo si hay texto en debouncedSearch
  const options =
    debouncedSearch && data
      ? data.map((article: { id: string; title: string }) => ({
          id: article.id,
          title: article.title,
        }))
      : [];

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(event.target.value);
  };

  return (
    <Box>
      <Autocomplete
        style={{ width: 300 }}
        loading={isLoading}
        options={options} // No muestra opciones si debouncedSearch está vacío
        getOptionLabel={(option: any) => option.title || ""} // Devuelve el título como string
        onChange={(_, value) => {
          if (value?.id) {
            router.push(`/article/${value.id}`);
          }
        }}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {option.title}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={(event) => handleSearchChange(event)}
            label="Buscar artículos"
          />
        )}
        noOptionsText={
          search === "" ? "Escribe para buscar" : "No hay opciones disponibles"
        } // Personaliza el mensaje
      />
    </Box>
  );
};

export default ArticleSearch;
