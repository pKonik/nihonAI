import {
  disposeMangaOcrRuntime,
  recognizeMangaCrop,
  type MangaOcrProgress,
} from "./mangaOcr";

type MangaOcrWorkerRequest = {
  blob: Blob;
  type: "recognize";
};

type MangaOcrWorkerResponse =
  | { progress: MangaOcrProgress; type: "progress" }
  | { result: string; type: "result" }
  | { message: string; type: "error" };

const workerScope = self as unknown as {
  onmessage: ((event: MessageEvent<MangaOcrWorkerRequest>) => void) | null;
  postMessage(message: MangaOcrWorkerResponse): void;
};

workerScope.onmessage = async (event) => {
  if (event.data.type !== "recognize") return;

  try {
    const result = await recognizeMangaCrop(event.data.blob, {
      onProgress(progress) {
        workerScope.postMessage({ progress, type: "progress" });
      },
    });
    await disposeMangaOcrRuntime();
    workerScope.postMessage({ result, type: "result" });
  } catch (error) {
    await disposeMangaOcrRuntime();
    workerScope.postMessage({
      message:
        error instanceof Error
          ? error.message
          : "No se pudo ejecutar el OCR preciso.",
      type: "error",
    });
  }
};
