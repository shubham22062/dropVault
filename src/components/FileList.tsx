import type { UploadItem } from "../types/upload";
import FileItem from "./FileItem";

interface FileListProps {
  files: UploadItem[];
  onRetry: (id: string) => void;
  onCancel: (id: string) => void;
}

function FileList({ files, onRetry, onCancel }: FileListProps) {
  return (
    <div className="file-list">
      {files.length === 0 ? (
        <div className="empty-state">
          <p>No files added yet.</p>
          <span>Drop one or more files to start the transfer.</span>
        </div>
      ) : (
        files.map((item) => (
          <FileItem
            key={item.id}
            item={item}
            onRetry={onRetry}
            onCancel={onCancel}
          />
        ))
      )}
    </div>
  );
}

export default FileList;