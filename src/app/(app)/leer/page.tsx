import type { Metadata } from "next";

import { MangaImporter } from "@/components/manga/MangaImporter";
import { getI18n } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { dictionary } = await getI18n();

  return { title: dictionary.meta.readTitle };
}

export default async function ReadMangaPage() {
  const { dictionary } = await getI18n();

  return <MangaImporter text={dictionary.read} />;
}
