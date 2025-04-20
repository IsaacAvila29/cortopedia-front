"use client";
import React, { use } from "react";
import ArticleForm from "../components/ArticleForm";

export default function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <ArticleForm id={id} />;
}
