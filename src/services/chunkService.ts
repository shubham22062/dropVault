const CHUNK_SIZE = 1024 * 1024;

export function getTotalChunks(
  file: File
): number {
  return Math.ceil(
    file.size / CHUNK_SIZE
  );
}

export function getChunkSize(
  file: File,
  chunkIndex: number
): number {
  const start =
    chunkIndex * CHUNK_SIZE;

  const end = Math.min(
    start + CHUNK_SIZE,
    file.size
  );

  return end - start;
}

export function delay(
  ms: number,
  signal?: AbortSignal
): Promise<void> {
  return new Promise(
    (resolve, reject) => {
      const timer = setTimeout(
        resolve,
        ms
      );

      signal?.addEventListener(
        "abort",
        () => {
          clearTimeout(timer);

          reject(
            new Error("Upload cancelled")
          );
        },
        { once: true }
      );
    }
  );
}

export async function uploadChunk(
  file: File,
  chunkIndex: number,
  signal?: AbortSignal
): Promise<void> {
  if (signal?.aborted) {
    throw new Error(
      "Upload cancelled"
    );
  }

  const size = getChunkSize(
    file,
    chunkIndex
  );

  console.log(
    `Uploading chunk ${
      chunkIndex + 1
    } (${size} bytes)`
  );

  await delay(500, signal);
}