import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ArticleFormProps } from "../components/ArticleForm";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

export function useFetchArticle(id: string) {
  const [data, setData] = useState<ArticleFormProps | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setValue } = useForm<ArticleFormProps>();
  const notiftyErrorFetch = () => toast.error("Error al cargar el artículo");

  // Efecto para cargar los datos del artículo si se proporciona un ID
  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        setLoading(true);
        try {
          const res = await fetch(`http://localhost:3001/article/${id}`);
          if (!res.ok) throw new Error("Error al obtener artículo");
          const data = await res.json();

          // Establece los valores iniciales del formulario
          //   setValue("title", data.title);
          //   setValue("content", data.content);
          setData(data);
        } catch (err) {
          notiftyErrorFetch();
          setError("No se pudo cargar el artículo");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchArticle();
    }
  }, [id, setValue]);
  return { loading, error, data };
}

export function useSubmitArticle(id?: string) {
  const [data, setData] = useState<ArticleFormProps | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setValue } = useForm<ArticleFormProps>();
  const notiftyErrorFetch = () => toast.error("Error al cargar el artículo");
  const notiftyCreate = () => toast.success("Artículo guardado correctamente");
  const notiftyEdit = () => toast.success("Artículo editado correctamente");
  const notiftyError = () => toast.error("Error al guardar el artículo");
  const notiftyErrorEdit = () => toast.error("Error al editar el artículo");
  const onSubmit = async (data: ArticleFormProps) => {
    setLoading(true);
    try {
      const url = id
        ? `http://localhost:3001/article/${id}` // Endpoint para editar
        : "http://localhost:3001/article"; // Endpoint para crear

      const method = id ? "PUT" : "POST"; // Método HTTP según la acción

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Error al guardar artículo");
      id ? notiftyEdit() : notiftyCreate();
      console.log(id ? "Artículo editado" : "Artículo creado");
    } catch (err) {
      id ? notiftyErrorEdit() : notiftyError();
      setError("No se pudo guardar el artículo");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return { onSubmit, loading, error };
}

export function useAllArticles() {
  const fetchArticles = async () => {
    const res = await fetch("http://localhost:3001/article");
    if (!res.ok) {
      throw new Error("Error fetching articles");
    }
    return res.json();
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["articles"],
    queryFn: fetchArticles,
  });

  return {
    data,
    isLoading,
    isError,
  };
}
