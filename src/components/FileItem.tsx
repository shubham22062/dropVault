import type { UploadItem } from "../types/upload";
import { formatFileSize } from "../utlis/fileUtils";
import ProgressBar from "./ProgressBar";

interface FileItemProps {
  item: UploadItem;
  onRetry: (id: string) => void;
  onCancel: (id: string) => void;
}

function FileItem({ item, onRetry, onCancel }: FileItemProps) {
  return (
    <div className="file-item">
      <div className="file-header">
        <div className="file-meta">
          <strong>{item.name}</strong>
          <span>{formatFileSize(item.size)}</span>
        </div>

        <div className="file-state-wrap">
          <span className={`status-badge status-${item.status}`}>{item.status}</span>
        </div>
      </div>

      <div className="progress-meta">
        <span>{item.uploadedChunks}/{item.totalChunks || 1} chunks</span>
        <span>{item.progress}%</span>
      </div>

      <ProgressBar progress={item.progress} />

      <div className="file-actions">
        {item.status === "failed" && (
          <button type="button" className="secondary-btn" onClick={() => onRetry(item.id)}>
            Retry
          </button>
        )}

        {(item.status === "pending" || item.status === "uploading") && (
          <button type="button" className="ghost-btn" onClick={() => onCancel(item.id)}>
            Cancel
          </button>
        )}

        {item.error && item.status !== "failed" && <small>{item.error}</small>}
      </div>
    </div>
  );
}

export default FileItem;