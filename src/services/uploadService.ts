import {
  delay,
  getTotalChunks,
  uploadChunk,
} from "./chunkService";

export interface UploadCallbacks {
  onProgress: (progress: number) => void;

  onChunkUploaded: (
    uploadedChunks: number
  ) => void;
}

export async function uploadFile(
  file: File,
  startChunk: number,
  callbacks: UploadCallbacks
): Promise<void> {
  const totalChunks = getTotalChunks(file);

  let uploadedChunks = startChunk;

  for (
    let chunkIndex = startChunk;
    chunkIndex < totalChunks;
    chunkIndex++
  ) {
    await uploadChunk(file, chunkIndex);

    uploadedChunks++;

    const progress = Math.round(
      (uploadedChunks / totalChunks) * 100
    );

    callbacks.onProgress(progress);

    callbacks.onChunkUploaded(
      uploadedChunks
    );

    await delay(100);
  }
}