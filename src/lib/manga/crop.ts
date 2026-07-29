import type { SelectionRect } from "@/lib/manga/selection";

export const MANGA_CROP_MAX_SIDE = 2048;

export type PixelCrop = {
  sourceX: number;
  sourceY: number;
  sourceWidth: number;
  sourceHeight: number;
  outputWidth: number;
  outputHeight: number;
};

export function calculatePixelCrop(
  imageWidth: number,
  imageHeight: number,
  selection: SelectionRect,
): PixelCrop {
  const sourceX = Math.round((selection.left / 100) * imageWidth);
  const sourceY = Math.round((selection.top / 100) * imageHeight);
  const sourceWidth = Math.max(
    1,
    Math.min(
      imageWidth - sourceX,
      Math.round((selection.width / 100) * imageWidth),
    ),
  );
  const sourceHeight = Math.max(
    1,
    Math.min(
      imageHeight - sourceY,
      Math.round((selection.height / 100) * imageHeight),
    ),
  );
  const scale = Math.min(
    1,
    MANGA_CROP_MAX_SIDE / sourceWidth,
    MANGA_CROP_MAX_SIDE / sourceHeight,
  );

  return {
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    outputWidth: Math.max(1, Math.round(sourceWidth * scale)),
    outputHeight: Math.max(1, Math.round(sourceHeight * scale)),
  };
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("No se pudo abrir la imagen."));
    image.src = url;
  });
}

export async function createMangaCrop(
  imageUrl: string,
  selection: SelectionRect,
): Promise<{ blob: Blob; width: number; height: number }> {
  const image = await loadImage(imageUrl);
  const crop = calculatePixelCrop(
    image.naturalWidth,
    image.naturalHeight,
    selection,
  );
  const canvas = document.createElement("canvas");
  canvas.width = crop.outputWidth;
  canvas.height = crop.outputHeight;
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("No se pudo preparar el recorte.");
  }

  context.drawImage(
    image,
    crop.sourceX,
    crop.sourceY,
    crop.sourceWidth,
    crop.sourceHeight,
    0,
    0,
    crop.outputWidth,
    crop.outputHeight,
  );

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, "image/png");
  });

  if (!blob || blob.size === 0) {
    throw new Error("No se pudo generar el recorte.");
  }

  return {
    blob,
    width: crop.outputWidth,
    height: crop.outputHeight,
  };
}
