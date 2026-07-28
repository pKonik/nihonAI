import type { Metadata } from "next";

import { FeaturePlaceholder } from "@/components/navigation/FeaturePlaceholder";

export const metadata: Metadata = {
  title: "Mazos | NihonAI",
};

export default function DecksPage() {
  return (
    <FeaturePlaceholder
      description="Este espacio reunirá los mazos que uses para organizar palabras por tema, obra u objetivo."
      nextStep="La administración de mazos está planificada para la fase 16."
      title="Mazos"
    />
  );
}
