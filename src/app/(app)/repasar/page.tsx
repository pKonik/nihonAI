import type { Metadata } from "next";

import { FeaturePlaceholder } from "@/components/navigation/FeaturePlaceholder";

export const metadata: Metadata = {
  title: "Repasar | NihonAI",
};

export default function ReviewPage() {
  return (
    <FeaturePlaceholder
      description="Aquí practicarás el vocabulario guardado mediante sesiones breves y enfocadas."
      nextStep="La repetición espaciada con FSRS está planificada para la fase 17."
      title="Repasar"
    />
  );
}
