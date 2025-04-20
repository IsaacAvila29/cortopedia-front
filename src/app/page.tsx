"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Welcome from "./components/Welcome";

export default function Home() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Welcome />
    </QueryClientProvider>
  );
}
