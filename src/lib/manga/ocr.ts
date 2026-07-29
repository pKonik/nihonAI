export type JapaneseOcrOrientation = "horizontal" | "vertical";

export type JapaneseOcrProgress = {
  progress: number;
  stage: "loading" | "recognizing";
};

export type JapaneseOcrCandidate = {
  confidence: number;
  text: string;
};

type RecognizeJapaneseCropOptions = {
  height: number;
  onProgress?: (progress: JapaneseOcrProgress) => void;
  signal?: AbortSignal;
  width: number;
};

const OCR_TARGET_LONG_SIDE = 1800;
const OCR_MAX_SCALE = 3;
const OCR_CONTRAST = 1.35;

export function getJapaneseOcrOrientation(
  width: number,
  height: number,
): JapaneseOcrOrientation {
  return height > width * 1.2 ? "vertical" : "horizontal";
}

export function getJapaneseOcrScale(width: number, height: number): number {
  const longSide = Math.max(width, height);
  if (longSide <= 0) return 1;

  return Math.min(
    OCR_MAX_SCALE,
    Math.max(1, OCR_TARGET_LONG_SIDE / longSide),
  );
}

export function selectBestJapaneseOcrResult(
  candidates: readonly JapaneseOcrCandidate[],
): string {
  const usableCandidates = candidates.filter(
    (candidate) => candidate.text.trim().length > 0,
  );

  if (usableCandidates.length === 0) return "";

  return usableCandidates.reduce((best, candidate) =>
    candidate.confidence > best.confidence ? candidate : best,
  ).text;
}

function throwIfAborted(signal?: AbortSignal) {
  if (signal?.aborted) {
    throw new DOMException("OCR cancelado.", "AbortError");
  }
}

function canvasToPngBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob && blob.size > 0) {
        resolve(blob);
      } else {
        reject(new Error("No se pudo preparar la imagen para OCR."));
      }
    }, "image/png");
  });
}

function getOtsuThreshold(grayscale: Uint8ClampedArray): number {
  const histogram = new Uint32Array(256);
  for (const value of grayscale) {
    histogram[value] += 1;
  }

  const pixelCount = grayscale.length;
  let totalIntensity = 0;
  for (let intensity = 0; intensity < histogram.length; intensity += 1) {
    totalIntensity += intensity * histogram[intensity];
  }

  let backgroundCount = 0;
  let backgroundIntensity = 0;
  let bestVariance = -1;
  let threshold = 127;

  for (let intensity = 0; intensity < histogram.length; intensity += 1) {
    backgroundCount += histogram[intensity];
    if (backgroundCount === 0) continue;

    const foregroundCount = pixelCount - backgroundCount;
    if (foregroundCount === 0) break;

    backgroundIntensity += intensity * histogram[intensity];
    const backgroundMean = backgroundIntensity / backgroundCount;
    const foregroundMean =
      (totalIntensity - backgroundIntensity) / foregroundCount;
    const meanDifference = backgroundMean - foregroundMean;
    const variance =
      backgroundCount * foregroundCount * meanDifference * meanDifference;

    if (variance > bestVariance) {
      bestVariance = variance;
      threshold = intensity;
    }
  }

  return threshold;
}

async function prepareJapaneseOcrVariants(
  image: Blob,
  signal?: AbortSignal,
): Promise<readonly Blob[]> {
  throwIfAborted(signal);
  const bitmap = await createImageBitmap(image);

  try {
    throwIfAborted(signal);
    const scale = getJapaneseOcrScale(bitmap.width, bitmap.height);
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const enhancedCanvas = document.createElement("canvas");
    enhancedCanvas.width = width;
    enhancedCanvas.height = height;
    const enhancedContext = enhancedCanvas.getContext("2d", {
      willReadFrequently: true,
    });

    if (!enhancedContext) {
      throw new Error("No se pudo preparar la imagen para OCR.");
    }

    enhancedContext.imageSmoothingEnabled = true;
    enhancedContext.imageSmoothingQuality = "high";
    enhancedContext.drawImage(bitmap, 0, 0, width, height);

    const enhancedImage = enhancedContext.getImageData(0, 0, width, height);
    const grayscale = new Uint8ClampedArray(width * height);

    for (
      let pixelIndex = 0, grayscaleIndex = 0;
      pixelIndex < enhancedImage.data.length;
      pixelIndex += 4, grayscaleIndex += 1
    ) {
      const red = enhancedImage.data[pixelIndex];
      const green = enhancedImage.data[pixelIndex + 1];
      const blue = enhancedImage.data[pixelIndex + 2];
      const luminance = red * 0.299 + green * 0.587 + blue * 0.114;
      const contrasted = Math.round(
        Math.min(
          255,
          Math.max(0, (luminance - 128) * OCR_CONTRAST + 128),
        ),
      );

      grayscale[grayscaleIndex] = contrasted;
      enhancedImage.data[pixelIndex] = contrasted;
      enhancedImage.data[pixelIndex + 1] = contrasted;
      enhancedImage.data[pixelIndex + 2] = contrasted;
      enhancedImage.data[pixelIndex + 3] = 255;
    }

    enhancedContext.putImageData(enhancedImage, 0, 0);
    throwIfAborted(signal);

    const binaryCanvas = document.createElement("canvas");
    binaryCanvas.width = width;
    binaryCanvas.height = height;
    const binaryContext = binaryCanvas.getContext("2d");

    if (!binaryContext) {
      throw new Error("No se pudo preparar la imagen para OCR.");
    }

    const binaryImage = binaryContext.createImageData(width, height);
    const threshold = getOtsuThreshold(grayscale);

    for (
      let pixelIndex = 0, grayscaleIndex = 0;
      pixelIndex < binaryImage.data.length;
      pixelIndex += 4, grayscaleIndex += 1
    ) {
      const value = grayscale[grayscaleIndex] <= threshold ? 0 : 255;
      binaryImage.data[pixelIndex] = value;
      binaryImage.data[pixelIndex + 1] = value;
      binaryImage.data[pixelIndex + 2] = value;
      binaryImage.data[pixelIndex + 3] = 255;
    }

    binaryContext.putImageData(binaryImage, 0, 0);
    throwIfAborted(signal);

    return await Promise.all([
      canvasToPngBlob(enhancedCanvas),
      canvasToPngBlob(binaryCanvas),
    ]);
  } finally {
    bitmap.close();
  }
}

export async function recognizeJapaneseCrop(
  image: Blob,
  options: RecognizeJapaneseCropOptions,
): Promise<string> {
  const { createWorker, OEM, PSM } = await import("tesseract.js");
  const orientation = getJapaneseOcrOrientation(
    options.width,
    options.height,
  );
  const language = orientation === "vertical" ? "jpn_vert" : "jpn";

  throwIfAborted(options.signal);
  let variants: readonly Blob[];
  try {
    variants = await prepareJapaneseOcrVariants(image, options.signal);
  } catch {
    throwIfAborted(options.signal);
    variants = [image];
  }
  let recognitionPass = 0;

  const worker = await createWorker(language, OEM.LSTM_ONLY, {
    logger(message) {
      if (options.signal?.aborted) return;

      const isRecognizing = message.status === "recognizing text";
      options.onProgress?.({
        progress: isRecognizing
          ? Math.min(
              1,
              Math.max(
                0,
                (recognitionPass + message.progress) / variants.length,
              ),
            )
          : 0,
        stage: isRecognizing ? "recognizing" : "loading",
      });
    },
  });
  let termination: ReturnType<typeof worker.terminate> | null = null;
  const terminateWorker = () => {
    termination ??= worker.terminate();
  };
  options.signal?.addEventListener("abort", terminateWorker, { once: true });

  try {
    throwIfAborted(options.signal);
    await worker.setParameters({
      tessedit_pageseg_mode:
        orientation === "vertical"
          ? PSM.SINGLE_BLOCK_VERT_TEXT
          : PSM.SINGLE_BLOCK,
      user_defined_dpi: "300",
    });
    throwIfAborted(options.signal);

    const candidates: JapaneseOcrCandidate[] = [];
    for (const variant of variants) {
      const result = await worker.recognize(variant);
      throwIfAborted(options.signal);
      candidates.push({
        confidence: result.data.confidence,
        text: result.data.text,
      });
      recognitionPass += 1;
      options.onProgress?.({
        progress: recognitionPass / variants.length,
        stage: "recognizing",
      });
    }

    return selectBestJapaneseOcrResult(candidates);
  } finally {
    options.signal?.removeEventListener("abort", terminateWorker);
    terminateWorker();
    await termination;
  }
}
