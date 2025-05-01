"use client";
import BibliographyForm from "@/app/components/Bibliography/BibliographyForm";
import React, { use } from "react";

export default function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <BibliographyForm article_id={id} />;
}
