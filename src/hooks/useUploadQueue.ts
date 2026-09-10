import { useCallback, useRef, useState } from "react";

import type { UploadItem } from "../types/upload";
import { getTotalChunks } from "../services/chunkService";
import { uploadFile } from "../services/uploadService";

const MAX_CONCURRENT_UPLOADS = 3;

export function useUploadQueue() {
  const [files, setFiles] = useState<UploadItem[]>([]);
  const activeUploads = useRef(0);
  const controllers = useRef<Map<string, AbortController>>(new Map());
  const processQueueRef = useRef<() => void>(() => {});

  const updateFile = useCallback((id: string, updates: Partial<UploadItem>) => {
    setFiles((currentFiles) =>
      currentFiles.map((file) =>
        file.id === id
          ? {
              ...file,
              ...updates,
            }
          : file
      )
    );
  }, []);

  const addFiles = useCallback((selectedFiles: File[]) => {
    const newFiles = selectedFiles.map((file): UploadItem => ({
      id: crypto.randomUUID(),
      file,
      name: file.name,
      size: file.size,
      progress: 0,
      status: "pending",
      uploadedChunks: 0,
      totalChunks: getTotalChunks(file),
      error: null,
    }));

    setFiles((currentFiles) => [...currentFiles, ...newFiles]);
  }, []);

  const processUpload = useCallback(async (item: UploadItem) => {
    if (activeUploads.current >= MAX_CONCURRENT_UPLOADS) {
      return;
    }

    activeUploads.current += 1;

    const controller = new AbortController();
    controllers.current.set(item.id, controller);

    updateFile(item.id, {
      status: "uploading",
      error: null,
    });

    try {
      await uploadFile(item.file, item.uploadedChunks, {
        onProgress: (progress) => {
          if (controller.signal.aborted) {
            return;
          }

          updateFile(item.id, { progress });
        },
        onChunkUploaded: (uploadedChunks) => {
          if (controller.signal.aborted) {
            return;
          }

          updateFile(item.id, { uploadedChunks });
        },
      }, controller.signal);

      if (controller.signal.aborted) {
        return;
      }

      updateFile(item.id, {
        progress: 100,
        status: "completed",
        uploadedChunks: item.totalChunks,
      });
    } catch {
      if (controller.signal.aborted) {
        return;
      }

      updateFile(item.id, {
        status: "failed",
        error: "Upload failed",
      });
    } finally {
      activeUploads.current -= 1;
      controllers.current.delete(item.id);
      setTimeout(() => {
        processQueueRef.current();
      }, 0);
    }
  }, [updateFile]);

  const processQueue = useCallback(() => {
    setFiles((currentFiles) => {
      const pendingFiles = currentFiles.filter((file) => file.status === "pending");
      const availableSlots = MAX_CONCURRENT_UPLOADS - activeUploads.current;
      const filesToUpload = pendingFiles.slice(0, availableSlots);

      filesToUpload.forEach((file) => {
        void processUpload(file);
      });

      return currentFiles;
    });
  }, [processUpload]);

  processQueueRef.current = processQueue;

  const retryUpload = useCallback((id: string) => {
    setFiles((currentFiles) =>
      currentFiles.map((file) =>
        file.id === id
          ? {
              ...file,
              status: "pending",
              progress: 0,
              uploadedChunks: 0,
              error: null,
            }
          : file
      )
    );

    setTimeout(() => {
      processQueueRef.current();
    }, 0);
  }, []);

  const cancelUpload = useCallback((id: string) => {
    const controller = controllers.current.get(id);

    if (controller) {
      controller.abort();
      controllers.current.delete(id);
    }

    updateFile(id, {
      status: "cancelled",
      error: null,
    });
  }, [updateFile]);

  return {
    files,
    addFiles,
    updateFile,
    retryUpload,
    cancelUpload,
    processQueue,
  };
}