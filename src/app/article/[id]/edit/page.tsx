"use client";
import ArticleForm from "@/app/components/ArticleForm";
import { use } from "react";
import { Toaster } from "react-hot-toast";

export default function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return (
    <>
      <ArticleForm id={id} /> <Toaster />
    </>
  );
}
