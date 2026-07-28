import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import { headers } from "next/headers";

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
  const requestHeaders = await headers();
  const forwardedHost = requestHeaders.get("x-forwarded-host");
  const host = (forwardedHost ?? requestHeaders.get("host"))
    ?.split(",")[0]
    .trim();
  const forwardedProtocol = requestHeaders
    .get("x-forwarded-proto")
    ?.split(",")[0]
    .trim();
  const isLocalHost =
    host?.startsWith("localhost") === true ||
    host?.startsWith("127.0.0.1") === true;
  const protocol =
    forwardedProtocol === "http" || forwardedProtocol === "https"
      ? forwardedProtocol
      : isLocalHost
        ? "http"
        : "https";
  const metadataBase =
    host && /^[a-zA-Z0-9.-]+(?::\d+)?$/.test(host)
      ? new URL(`${protocol}://${host}`)
      : undefined;

  return {
    metadataBase,
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
