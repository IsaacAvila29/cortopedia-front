"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Article } from "./components/Article";

export default function Home() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Article />;
    </QueryClientProvider>
  );
}
