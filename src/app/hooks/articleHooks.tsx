import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ArticleFormProps } from "../components/ArticleForm";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { BibliographyFormProps } from "../components/Bibliography/BibliographyForm";
import { useRouter } from "next/navigation";

export function useFetchArticle(id: string) {
  const [data, setData] = useState<ArticleFormProps | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setValue } = useForm<ArticleFormProps>();
  const notiftyErrorFetch = () => toast.error("Error al cargar el artículo");

  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        setLoading(true);
        try {
          const res = await fetch(`http://localhost:3001/article/${id}`);
          if (!res.ok) throw new Error("Error al obtener artículo");
          const data = await res.json();

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
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
      const responseData = await res.json();
      console.log("Response data:", responseData?.id);
      if (!res.ok) throw new Error("Error al guardar artículo");
      id ? notiftyEdit() : notiftyCreate();
      router.push(`/article/${responseData?.id}`);
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

export function useSubmitBibliography(id?: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const notiftyCreate = () =>
    toast.success("Bibliografía guardada correctamente");
  const notiftyEdit = () => toast.success("Bibliografía editada correctamente");
  const notiftyError = () => toast.error("Error al guardar la bibliografía");
  const notiftyErrorEdit = () => toast.error("Error al editar la bibliografía");

  const onSubmit = async (data: BibliographyFormProps) => {
    setLoading(true);
    try {
      const url = id
        ? `http://localhost:3001/bibliography/${id}` // Endpoint para editar
        : "http://localhost:3001/bibliography"; // Endpoint para crear

      const method = id ? "PUT" : "POST"; // Método HTTP según la acción

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Error al guardar bibliografía");
      id ? notiftyEdit() : notiftyCreate();
      console.log(id ? "Bibliografía editada" : "Bibliografía creada");
    } catch (err) {
      id ? notiftyErrorEdit() : notiftyError();
      console.log(id);
      setError("No se pudo guardar la bibliografía");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return { onSubmit, loading, error };
}
export function useFetchBibliography(id: string) {
  const [data, setData] = useState<BibliographyFormProps | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const notiftyErrorFetch = () =>
    toast.error("Error al cargar la bibliografía");

  useEffect(() => {
    if (id) {
      const fetchBibliography = async () => {
        setLoading(true);
        try {
          const res = await fetch(`http://localhost:3001/bibliography/${id}`);
          if (!res.ok) throw new Error("Error al obtener bibliografía");
          const data = await res.json();
          setData(data);
        } catch (err) {
          notiftyErrorFetch();
          setError("No se pudo cargar la bibliografía");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchBibliography();
    }
  }, [id]);
  return { loading, error, data };
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

export function useSearchArticles(title: string) {
  const fetchArticles = async () => {
    const res = await fetch(`http://localhost:3001/article?title=${title}`);
    if (!res.ok) {
      throw new Error("Error fetching articles");
    }
    return res.json();
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["articles", title],
    queryFn: fetchArticles,
  });
  return {
    data,
    isLoading,
    isError,
  };
}
