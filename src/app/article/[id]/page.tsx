"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Article } from "@/app/components/Article";

const queryClient = new QueryClient();

export const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params; // Desenvuelve la promesa de params

  return (
    <QueryClientProvider client={queryClient}>
      <Article id={id} />
    </QueryClientProvider>
  );
};

export default page;
