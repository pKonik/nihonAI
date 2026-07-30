import type {
  MangaOcrOptions,
  MangaOcrProgress,
} from "./mangaOcr";

type MangaOcrWorkerResponse =
  | { progress: MangaOcrProgress; type: "progress" }
  | { result: string; type: "result" }
  | { message: string; type: "error" };

const activeWorkers = new Map<Worker, () => void>();

function throwIfAborted(signal?: AbortSignal): void {
  if (signal?.aborted) {
    throw new DOMException("OCR cancelado.", "AbortError");
  }
}

export async function isMangaOcrModelCached(): Promise<boolean> {
  const mangaOcr = await import("./mangaOcr");
  return mangaOcr.isMangaOcrModelCached();
}

export async function recognizeMangaCrop(
  blob: Blob,
  options: MangaOcrOptions = {},
): Promise<string> {
  throwIfAborted(options.signal);
  const worker = new Worker(
    new URL("./mangaOcr.worker.ts", import.meta.url),
    { type: "module" },
  );

  return new Promise((resolve, reject) => {
    let settled = false;

    function cleanup() {
      options.signal?.removeEventListener("abort", handleAbort);
      activeWorkers.delete(worker);
      worker.terminate();
    }

    function finish(callback: () => void) {
      if (settled) return;
      settled = true;
      cleanup();
      callback();
    }

    function handleAbort() {
      finish(() =>
        reject(new DOMException("OCR cancelado.", "AbortError")),
      );
    }

    activeWorkers.set(worker, handleAbort);
    worker.onmessage = (event: MessageEvent<MangaOcrWorkerResponse>) => {
      const message = event.data;
      if (message.type === "progress") {
        options.onProgress?.(message.progress);
      } else if (message.type === "result") {
        finish(() => resolve(message.result));
      } else {
        finish(() => reject(new Error(message.message)));
      }
    };
    worker.onerror = () => {
      finish(() => reject(new Error("El trabajador de OCR falló.")));
    };
    options.signal?.addEventListener("abort", handleAbort, { once: true });
    worker.postMessage({ blob, type: "recognize" });
  });
}

export async function disposeMangaOcrRuntime(): Promise<void> {
  for (const cancel of [...activeWorkers.values()]) {
    cancel();
  }
}
