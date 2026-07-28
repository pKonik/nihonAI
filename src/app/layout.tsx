import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";

import { AuthCallbackError } from "@/components/auth/AuthCallbackError";
import { BackgroundDetails } from "@/components/brand/BackgroundDetails";
import { getI18n } from "@/lib/i18n/server";

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

export async function generateMetadata(): Promise<Metadata> {
  const { dictionary } = await getI18n();

  return {
    title: "NihonAI",
    description: dictionary.meta.description,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { locale, dictionary } = await getI18n();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${notoSansJapanese.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <BackgroundDetails />
        <div className="relative z-10 flex min-h-full flex-col">
          <AuthCallbackError text={dictionary.authNotice} />
          {children}
        </div>
      </body>
    </html>
  );
}
