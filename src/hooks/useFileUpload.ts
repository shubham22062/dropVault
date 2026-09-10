import { useRef } from "react";

import type { UploadItem } from "../types/upload";

import { getTotalChunks } from "../services/chunkService";
import { uploadFile } from "../services/uploadService";

interface UseFileUploadProps {
  updateFile: (id: string, updates: Partial<UploadItem>) => void;
}

export function useFileUpload({ updateFile }: UseFileUploadProps) {
  const cancelControllers = useRef<Map<string, AbortController>>(new Map());

  const startUpload = async (item: UploadItem) => {
    const controller = new AbortController();

    cancelControllers.current.set(item.id, controller);

    const totalChunks = getTotalChunks(item.file);

    updateFile(item.id, {
      status: "uploading",
      totalChunks,
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
        uploadedChunks: totalChunks,
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
      cancelControllers.current.delete(item.id);
    }
  };

  const cancelUpload = (id: string) => {
    const controller = cancelControllers.current.get(id);

    if (controller) {
      controller.abort();
      cancelControllers.current.delete(id);
    }

    updateFile(id, {
      status: "cancelled",
      error: null,
    });
  };

  return { startUpload, cancelUpload };
}