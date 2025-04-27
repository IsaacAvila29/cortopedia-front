"use client";
import React, { use } from "react";
import BibliographyForm from "../components/Bibliography/BibliographyForm";

export default function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <BibliographyForm />;
}
