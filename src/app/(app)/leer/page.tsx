import type { Metadata } from "next";

import { FeaturePlaceholder } from "@/components/navigation/FeaturePlaceholder";

export const metadata: Metadata = {
  title: "Leer manga | NihonAI",
};

export default function ReadMangaPage() {
  return (
    <FeaturePlaceholder
      description="Aquí podrás importar páginas de manga y convertir la lectura en vocabulario con contexto."
      nextStep="La importación de imágenes y archivos ZIP llegará en la fase 7."
      title="Leer manga"
    />
  );
}
