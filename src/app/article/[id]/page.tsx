"use client";
import React, { use } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Article } from "@/app/components/Article";

const queryClient = new QueryClient();

export default function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = use(props.params);

  return (
    <QueryClientProvider client={queryClient}>
      <Article id={id} />
    </QueryClientProvider>
  );
}
