"use client";
import ArticleForm from "@/app/components/ArticleForm";
import BibliographyForm from "@/app/components/Bibliography/BibliographyForm";
import { useQuery } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

export default function EditPage({ params }: { params: { id: string } }) {
  interface Bibliography {
    article_id: string;
    author?: string;
    year?: string;
    title?: string;
    date?: string;
    publisher?: string;
    websiteName?: string;
    url?: string;
    id?: string;
  }

  const { id } = params; // Obtén el id directamente de params

  const fetchBibliographyById = async (): Promise<Bibliography> => {
    const res = await fetch(`http://localhost:3001/bibliography/${id}`); //TODO, Esto tal vez en un futuro cambie a un endpoint de una API
    if (!res.ok) {
      throw new Error("Error fetching bibliography");
    }
    return res.json();
  };

  const {
    data: bibliography,
    isLoading: isLoadingBibliography,
    isError: isErrorBibliography,
  } = useQuery<Bibliography>({
    queryKey: ["bibliography", id],
    queryFn: fetchBibliographyById,
  });
  console.log("El ID de la pagina es", id);
  console.log("El ID de la bibliografía es", bibliography?.id);

  if (isLoadingBibliography) return <div>Loading...</div>;
  if (isErrorBibliography) return <div>Error fetching bibliography</div>;

  return (
    <>
      <BibliographyForm article_id={id} id={id} />
      <Toaster />
    </>
  );
}
