import type {
  InferenceSession,
  Tensor as OnnxTensor,
} from "onnxruntime-web";

const MODEL_REVISION = "aa0d7d3199f5843f8f5d743f85b44098c8e3ac98";
const MODEL_BASE_URL =
  `/models/manga-ocr-mobile/${MODEL_REVISION}`;
const LEGACY_MODEL_BASE_URL =
  `https://huggingface.co/ogkalu/manga-ocr-mobile/resolve/${MODEL_REVISION}`;
const MODEL_CACHE = `nihonai-manga-ocr-mobile-${MODEL_REVISION}`;
const MAX_MODEL_FILE_BYTES = 35 * 1024 * 1024;
const MAX_VOCAB_BYTES = 1024 * 1024;
const IMAGE_SIZE = 224;
const VOCAB_SIZE = 9415;
const MAX_SEQUENCE_LENGTH = 256;
const DECODER_LAYERS = 4;
const ATTENTION_HEADS = 4;
const HEAD_SIZE = 64;
const CLS_TOKEN_ID = 2;
const SEP_TOKEN_ID = 3;

const assets = {
  decoderInit: {
    expectedBytes: 24_875_052,
    name: "decoder_init.onnx",
    maxBytes: MAX_MODEL_FILE_BYTES,
  },
  decoderStep: {
    expectedBytes: 22_776_797,
    name: "decoder_step.onnx",
    maxBytes: MAX_MODEL_FILE_BYTES,
  },
  encoder: {
    expectedBytes: 17_070_003,
    name: "encoder.onnx",
    maxBytes: MAX_MODEL_FILE_BYTES,
  },
  vocabulary: {
    expectedBytes: 37_193,
    name: "vocab.txt",
    maxBytes: MAX_VOCAB_BYTES,
  },
} as const;

const orderedAssets = [
  assets.encoder,
  assets.decoderInit,
  assets.decoderStep,
  assets.vocabulary,
] as const;
const modelAssetSizes = orderedAssets.map(
  (asset) => asset.expectedBytes,
);

type ModelAsset = (typeof orderedAssets)[number];

type MangaOcrRuntime = {
  decoderInit: InferenceSession;
  decoderStep: InferenceSession;
  encoder: InferenceSession;
  vocabulary: readonly string[];
};

export type MangaOcrProgress = {
  progress: number;
  stage: "downloading" | "loading" | "recognizing";
};

export type MangaOcrOptions = {
  onProgress?: (progress: MangaOcrProgress) => void;
  signal?: AbortSignal;
};

let runtimePromise: Promise<MangaOcrRuntime> | null = null;
let activeRecognitions = 0;
let disposeRequested = false;

function getAssetUrl(asset: ModelAsset): string {
  return `${MODEL_BASE_URL}/${asset.name}`;
}

function getLegacyAssetUrl(asset: ModelAsset): string {
  return `${LEGACY_MODEL_BASE_URL}/${asset.name}`;
}

function throwIfAborted(signal?: AbortSignal): void {
  if (signal?.aborted) {
    throw new DOMException("OCR cancelado.", "AbortError");
  }
}

async function getCache(): Promise<Cache | null> {
  if (!("caches" in globalThis)) return null;

  try {
    return await caches.open(MODEL_CACHE);
  } catch {
    return null;
  }
}

async function readAsset(
  asset: ModelAsset,
  onProgress?: (progress: number) => void,
  signal?: AbortSignal,
): Promise<ArrayBuffer> {
  throwIfAborted(signal);
  const url = getAssetUrl(asset);
  const cache = await getCache();
  let cachedResponse = await cache?.match(url);
  const usesLegacyCache = !cachedResponse;
  cachedResponse ??= await cache?.match(getLegacyAssetUrl(asset));

  if (cachedResponse) {
    try {
      const cachedBytes = await readResponseBytes(
        cachedResponse,
        asset.maxBytes,
        asset.expectedBytes,
        onProgress,
      );
      if (cachedBytes.byteLength === asset.expectedBytes) {
        throwIfAborted(signal);
        if (cache && usesLegacyCache) {
          void cache
            .put(url, new Response(cachedBytes))
            .catch(() => {
              // Reusing the legacy entry must not depend on migration.
            });
        }
        return cachedBytes;
      }
    } catch {
      // An incomplete cache entry is removed and downloaded again below.
    }

    await cache?.delete(url);
  }

  const response = await fetch(url, {
    credentials: "omit",
    redirect: "follow",
    signal,
  });
  if (!response.ok) {
    throw new Error(`No se pudo descargar ${asset.name}.`);
  }

  const declaredSize = Number(response.headers.get("content-length"));
  if (
    Number.isFinite(declaredSize) &&
    declaredSize > 0 &&
    declaredSize > asset.maxBytes
  ) {
    throw new Error(`${asset.name} supera el tamaño permitido.`);
  }

  const bytes = await readResponseBytes(
    response,
    asset.maxBytes,
    asset.expectedBytes,
    onProgress,
  );
  if (
    bytes.byteLength !== asset.expectedBytes ||
    bytes.byteLength > asset.maxBytes
  ) {
    throw new Error(`${asset.name} tiene un tamaño no válido.`);
  }

  if (cache) {
    void cache
      .put(
        url,
        new Response(bytes, {
          headers: {
            "content-type":
              response.headers.get("content-type") ?? "",
          },
        }),
      )
      .catch(() => {
        // A full cache must not prevent local recognition.
      });
  }

  return bytes;
}

async function readResponseBytes(
  response: Response,
  maxBytes: number,
  expectedBytes: number,
  onProgress?: (progress: number) => void,
): Promise<ArrayBuffer> {
  const declaredSize = Number(response.headers.get("content-length"));
  const progressSize =
    Number.isFinite(declaredSize) && declaredSize > 0
      ? declaredSize
      : expectedBytes;
  const reader = response.body?.getReader();
  if (!reader) {
    const bytes = await response.arrayBuffer();
    onProgress?.(1);
    return bytes;
  }

  const bytes = new Uint8Array(expectedBytes);
  let receivedBytes = 0;
  let lastReportedProgress = 0;
  let lastReportedAt = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const nextReceivedBytes = receivedBytes + value.byteLength;
    if (
      nextReceivedBytes > maxBytes ||
      nextReceivedBytes > expectedBytes
    ) {
      await reader.cancel();
      throw new Error("Un archivo del modelo supera el tamaño permitido.");
    }
    bytes.set(value, receivedBytes);
    receivedBytes = nextReceivedBytes;

    const progress = Math.min(receivedBytes / progressSize, 0.99);
    const now = Date.now();
    if (
      progress - lastReportedProgress >= 0.005 &&
      (lastReportedAt === 0 || now - lastReportedAt >= 100)
    ) {
      lastReportedProgress = progress;
      lastReportedAt = now;
      onProgress?.(progress);
    }
  }

  onProgress?.(Math.min(receivedBytes / expectedBytes, 1));
  return receivedBytes === expectedBytes
    ? bytes.buffer
    : bytes.slice(0, receivedBytes).buffer;
}

export function calculateCombinedModelDownloadProgress(
  assetProgresses: readonly number[],
  assetSizes: readonly number[] = modelAssetSizes,
): number {
  const totalBytes = assetSizes.reduce(
    (total, size) => total + size,
    0,
  );
  if (
    assetProgresses.length !== assetSizes.length ||
    totalBytes <= 0 ||
    assetSizes.some((size) => !Number.isFinite(size) || size <= 0)
  ) {
    throw new Error("El progreso del modelo no es válido.");
  }

  const receivedBytes = assetSizes.reduce((total, size, index) => {
    const progress = Math.min(
      1,
      Math.max(0, assetProgresses[index] ?? 0),
    );
    return total + size * progress;
  }, 0);
  return receivedBytes / totalBytes;
}

async function createRuntime(
  options: MangaOcrOptions,
): Promise<MangaOcrRuntime> {
  const assetProgresses = orderedAssets.map(() => 0);
  let lastProgressReport = 0;
  let lastReportedProgress = 0;
  options.onProgress?.({ progress: 0, stage: "downloading" });
  const buffers = await Promise.all(
    orderedAssets.map((asset, index) =>
      readAsset(
        asset,
        (assetProgress) => {
          assetProgresses[index] = Math.max(
            assetProgresses[index],
            assetProgress,
          );
          const progress =
            calculateCombinedModelDownloadProgress(assetProgresses);
          const now = Date.now();
          if (
            progress === 1 ||
            (progress - lastReportedProgress >= 0.001 &&
              (lastProgressReport === 0 ||
                now - lastProgressReport >= 100))
          ) {
            lastReportedProgress = progress;
            lastProgressReport = now;
            options.onProgress?.({
              progress,
              stage: "downloading",
            });
          }
        },
        options.signal,
      ),
    ),
  );

  throwIfAborted(options.signal);
  options.onProgress?.({ progress: 0, stage: "loading" });

  const ort = await import("onnxruntime-web");
  ort.env.wasm.numThreads = 1;
  ort.env.wasm.simd = true;

  const sessionOptions: InferenceSession.SessionOptions = {
    executionProviders: ["wasm"],
    graphOptimizationLevel: "all",
  };
  const sessions: InferenceSession[] = [];

  try {
    const encoder = await ort.InferenceSession.create(
      buffers[0],
      sessionOptions,
    );
    sessions.push(encoder);
    options.onProgress?.({ progress: 1 / 3, stage: "loading" });

    const decoderInit = await ort.InferenceSession.create(
      buffers[1],
      sessionOptions,
    );
    sessions.push(decoderInit);
    options.onProgress?.({ progress: 2 / 3, stage: "loading" });

    const decoderStep = await ort.InferenceSession.create(
      buffers[2],
      sessionOptions,
    );
    sessions.push(decoderStep);

    const vocabulary = new TextDecoder()
      .decode(buffers[3])
      .replace(/\r/g, "")
      .split("\n")
      .filter((token, index, allTokens) => {
        return index < allTokens.length - 1 || token.length > 0;
      });

    if (vocabulary.length !== VOCAB_SIZE) {
      throw new Error("El vocabulario del modelo no es válido.");
    }

    options.onProgress?.({ progress: 1, stage: "loading" });
    return { decoderInit, decoderStep, encoder, vocabulary };
  } catch (error) {
    for (const session of sessions) {
      await session.release();
    }
    throw error;
  }
}

async function getRuntime(options: MangaOcrOptions): Promise<MangaOcrRuntime> {
  runtimePromise ??= createRuntime(options).catch((error: unknown) => {
    runtimePromise = null;
    throw error;
  });
  return runtimePromise;
}

async function preprocessImage(blob: Blob): Promise<Float32Array> {
  const bitmap = await createImageBitmap(blob);

  try {
    const canvas = document.createElement("canvas");
    canvas.width = IMAGE_SIZE;
    canvas.height = IMAGE_SIZE;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) throw new Error("No se pudo preparar el recorte.");

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, IMAGE_SIZE, IMAGE_SIZE);
    const scale = Math.min(
      IMAGE_SIZE / bitmap.width,
      IMAGE_SIZE / bitmap.height,
    );
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    context.drawImage(
      bitmap,
      Math.floor((IMAGE_SIZE - width) / 2),
      Math.floor((IMAGE_SIZE - height) / 2),
      width,
      height,
    );

    const pixels = context.getImageData(
      0,
      0,
      IMAGE_SIZE,
      IMAGE_SIZE,
    ).data;
    const planeSize = IMAGE_SIZE * IMAGE_SIZE;
    const input = new Float32Array(planeSize * 3);

    for (let pixelIndex = 0; pixelIndex < planeSize; pixelIndex += 1) {
      const sourceIndex = pixelIndex * 4;
      const grayscale =
        (pixels[sourceIndex] * 0.299 +
          pixels[sourceIndex + 1] * 0.587 +
          pixels[sourceIndex + 2] * 0.114) /
        255;
      input[pixelIndex] = grayscale;
      input[planeSize + pixelIndex] = grayscale;
      input[planeSize * 2 + pixelIndex] = grayscale;
    }

    return input;
  } finally {
    bitmap.close();
  }
}

function requireFloatData(tensor: OnnxTensor): Float32Array {
  if (!(tensor.data instanceof Float32Array)) {
    throw new Error("El modelo devolvió datos inesperados.");
  }
  return tensor.data;
}

export function findHighestLogit(logits: Float32Array): number {
  if (logits.length === 0) return -1;

  let result = 0;
  for (let index = 1; index < logits.length; index += 1) {
    if (logits[index] > logits[result]) result = index;
  }
  return result;
}

export function getDecoderPosition(stepIndex: number): number {
  if (!Number.isInteger(stepIndex) || stepIndex < 1) {
    throw new Error("El paso del decodificador no es válido.");
  }

  // This ONNX conversion initializes CLS and the first predicted token
  // together, so its incremental position is one ahead of the loop index.
  return stepIndex + 1;
}

export function copyDecoderState(
  source: Float32Array,
  target: Float32Array,
  position: number,
): void {
  const stateWidth = DECODER_LAYERS * ATTENTION_HEADS * HEAD_SIZE;
  if (
    source.length !== stateWidth ||
    target.length !== stateWidth * MAX_SEQUENCE_LENGTH ||
    position < 0 ||
    position >= MAX_SEQUENCE_LENGTH
  ) {
    throw new Error("El estado del decodificador no es válido.");
  }

  for (let layer = 0; layer < DECODER_LAYERS; layer += 1) {
    for (let head = 0; head < ATTENTION_HEADS; head += 1) {
      const sourceStart = (layer * ATTENTION_HEADS + head) * HEAD_SIZE;
      const targetStart =
        ((layer * ATTENTION_HEADS + head) * MAX_SEQUENCE_LENGTH + position) *
        HEAD_SIZE;
      target.set(
        source.subarray(sourceStart, sourceStart + HEAD_SIZE),
        targetStart,
      );
    }
  }
}

export function decodeMangaTokens(
  tokenIds: readonly number[],
  vocabulary: readonly string[],
): string {
  return tokenIds
    .filter((tokenId) => tokenId > SEP_TOKEN_ID)
    .map((tokenId) => vocabulary[tokenId] ?? "")
    .filter((token) => token.length > 0 && !token.startsWith("<unused"))
    .join("")
    .replace(/\s+/g, "");
}

async function runInference(
  blob: Blob,
  runtime: MangaOcrRuntime,
  options: MangaOcrOptions,
): Promise<string> {
  const ort = await import("onnxruntime-web");
  throwIfAborted(options.signal);
  const input = await preprocessImage(blob);
  throwIfAborted(options.signal);

  const encoderOutput = await runtime.encoder.run({
    "serving_default_args_0:0": new ort.Tensor(
      "float32",
      input,
      [1, 3, IMAGE_SIZE, IMAGE_SIZE],
    ),
  });
  const encoderState = encoderOutput["StatefulPartitionedCall:0"];
  if (!encoderState) throw new Error("El codificador no devolvió datos.");

  const initialOutput = await runtime.decoderInit.run({
    encoder_hidden_states: encoderState,
    input_ids: new ort.Tensor(
      "int64",
      new BigInt64Array([BigInt(CLS_TOKEN_ID)]),
      [1, 1],
    ),
  });

  const selfKey = new Float32Array(
    DECODER_LAYERS *
      ATTENTION_HEADS *
      MAX_SEQUENCE_LENGTH *
      HEAD_SIZE,
  );
  const selfValue = new Float32Array(selfKey.length);
  const initialKey = initialOutput.self_k;
  const initialValue = initialOutput.self_v;
  const crossKey = initialOutput.cross_k;
  const crossValue = initialOutput.cross_v;
  const initialLogits = initialOutput.logits;

  if (
    !initialKey ||
    !initialValue ||
    !crossKey ||
    !crossValue ||
    !initialLogits
  ) {
    throw new Error("El decodificador no devolvió todos sus estados.");
  }

  copyDecoderState(requireFloatData(initialKey), selfKey, 0);
  copyDecoderState(requireFloatData(initialValue), selfValue, 0);
  const tokenIds: number[] = [];
  let nextToken = findHighestLogit(requireFloatData(initialLogits));

  for (
    let position = 1;
    position < MAX_SEQUENCE_LENGTH && nextToken !== SEP_TOKEN_ID;
    position += 1
  ) {
    throwIfAborted(options.signal);
    tokenIds.push(nextToken);
    options.onProgress?.({
      progress: position / MAX_SEQUENCE_LENGTH,
      stage: "recognizing",
    });

    const stepOutput = await runtime.decoderStep.run({
      encoder_hidden_states: encoderState,
      input_ids: new ort.Tensor(
        "int64",
        new BigInt64Array([BigInt(nextToken)]),
        [1, 1],
      ),
      position_ids: new ort.Tensor(
        "int64",
        new BigInt64Array([BigInt(getDecoderPosition(position))]),
        [1, 1],
      ),
      self_k_cache: new ort.Tensor(
        "float32",
        selfKey,
        [DECODER_LAYERS, 1, ATTENTION_HEADS, MAX_SEQUENCE_LENGTH, HEAD_SIZE],
      ),
      self_v_cache: new ort.Tensor(
        "float32",
        selfValue,
        [DECODER_LAYERS, 1, ATTENTION_HEADS, MAX_SEQUENCE_LENGTH, HEAD_SIZE],
      ),
      cross_k_cache: crossKey,
      cross_v_cache: crossValue,
    });

    const logits = stepOutput.logits;
    const nextKey = stepOutput.self_k_slice;
    const nextValue = stepOutput.self_v_slice;
    if (!logits || !nextKey || !nextValue) {
      throw new Error("El decodificador devolvió datos incompletos.");
    }

    copyDecoderState(requireFloatData(nextKey), selfKey, position);
    copyDecoderState(requireFloatData(nextValue), selfValue, position);
    nextToken = findHighestLogit(requireFloatData(logits));
  }

  options.onProgress?.({ progress: 1, stage: "recognizing" });
  return decodeMangaTokens(tokenIds, runtime.vocabulary);
}

export async function isMangaOcrModelCached(): Promise<boolean> {
  const cache = await getCache();
  if (!cache) return false;

  const cachedAssets = await Promise.all(
    orderedAssets.map(async (asset) => {
      return (
        (await cache.match(getAssetUrl(asset))) ??
        (await cache.match(getLegacyAssetUrl(asset)))
      );
    }),
  );
  return cachedAssets.every(Boolean);
}

export async function recognizeMangaCrop(
  blob: Blob,
  options: MangaOcrOptions = {},
): Promise<string> {
  disposeRequested = false;
  activeRecognitions += 1;

  try {
    throwIfAborted(options.signal);
    const runtime = await getRuntime(options);
    return await runInference(blob, runtime, options);
  } finally {
    activeRecognitions -= 1;
    if (disposeRequested && activeRecognitions === 0) {
      await disposeMangaOcrRuntime();
    }
  }
}

export async function disposeMangaOcrRuntime(): Promise<void> {
  disposeRequested = true;
  const pendingRuntime = runtimePromise;
  if (!pendingRuntime || activeRecognitions > 0) return;

  try {
    const runtime = await pendingRuntime;
    if (runtimePromise !== pendingRuntime || activeRecognitions > 0) return;

    runtimePromise = null;
    await Promise.all([
      runtime.encoder.release(),
      runtime.decoderInit.release(),
      runtime.decoderStep.release(),
    ]);
  } catch {
    if (runtimePromise === pendingRuntime) runtimePromise = null;
  }
}
