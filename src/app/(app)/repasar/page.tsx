import type { Metadata } from "next";

import { FeaturePlaceholder } from "@/components/navigation/FeaturePlaceholder";
import { getI18n } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { dictionary } = await getI18n();

  return { title: dictionary.meta.reviewTitle };
}

export default async function ReviewPage() {
  const { dictionary } = await getI18n();

  return (
    <FeaturePlaceholder
      description={dictionary.review.description}
      nextStep={dictionary.review.nextStep}
      text={dictionary.feature}
      title={dictionary.review.title}
    />
  );
}
