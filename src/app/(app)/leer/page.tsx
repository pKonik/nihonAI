import type { Metadata } from "next";

import { FeaturePlaceholder } from "@/components/navigation/FeaturePlaceholder";
import { getI18n } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { dictionary } = await getI18n();

  return { title: dictionary.meta.readTitle };
}

export default async function ReadMangaPage() {
  const { dictionary } = await getI18n();

  return (
    <FeaturePlaceholder
      description={dictionary.read.description}
      nextStep={dictionary.read.nextStep}
      text={dictionary.feature}
      title={dictionary.read.title}
    />
  );
}
