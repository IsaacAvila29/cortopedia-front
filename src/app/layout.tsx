// app/layout.tsx
"use client";
import "./globals.css";
import TopBar from "./components/ui/TopBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="es">
      <body>
        <QueryClientProvider client={queryClient}>
          <TopBar />
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
