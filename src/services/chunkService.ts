
const CHUNK_SIZE = 1024 * 1024; // 1 MB

export function getTotalChunks(file: File): number {
  return Math.ceil(file.size / CHUNK_SIZE);
}

export function getChunkSize(
  file: File,
  chunkIndex: number
): number {
  const start = chunkIndex * CHUNK_SIZE;
  const end = Math.min(
    start + CHUNK_SIZE,
    file.size
  );

  return end - start;
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function uploadChunk(
  file: File,
  chunkIndex: number
): Promise<void> {
  const size = getChunkSize(file, chunkIndex);

  console.log(
    `Uploading chunk ${chunkIndex + 1} (${size} bytes)`
  );

  // Simulate network request
  await delay(300);
}