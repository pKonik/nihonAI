import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NihonAI",
  description: "Aplicación personal para organizar el aprendizaje de japonés.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
