import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";

import { AuthCallbackError } from "@/components/auth/AuthCallbackError";
import { BackgroundDetails } from "@/components/brand/BackgroundDetails";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const notoSansJapanese = Noto_Sans_JP({
  display: "swap",
  preload: false,
  variable: "--font-noto-sans-jp",
  weight: "variable",
});

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
    <html
      lang="es"
      className={`${inter.variable} ${notoSansJapanese.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <BackgroundDetails />
        <div className="relative z-10 flex min-h-full flex-col">
          <AuthCallbackError />
          {children}
        </div>
      </body>
    </html>
  );
}
