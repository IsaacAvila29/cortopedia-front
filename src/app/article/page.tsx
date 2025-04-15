"use client";
import React from "react";
import { Article } from "../components/Article";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const page = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Article id={3} />
    </QueryClientProvider>
  );
};

export default page;
