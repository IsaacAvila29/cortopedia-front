// app/layout.tsx
"use client";
import "./globals.css";
import TopBar from "./components/ui/TopBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <TopBar />
        {children}
      </body>
    </html>
  );
}
