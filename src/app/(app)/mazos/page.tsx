import type { Metadata } from "next";

import { FeaturePlaceholder } from "@/components/navigation/FeaturePlaceholder";
import { getI18n } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { dictionary } = await getI18n();

  return { title: dictionary.meta.decksTitle };
}

export default async function DecksPage() {
  const { dictionary } = await getI18n();

  return (
    <FeaturePlaceholder
      description={dictionary.decks.description}
      nextStep={dictionary.decks.nextStep}
      text={dictionary.feature}
      title={dictionary.decks.title}
    />
  );
}
