import type { UploadItem } from "../types/upload";
import { formatFileSize } from "../utlis/fileUtils";
import ProgressBar from "./ProgressBar";

interface FileItemProps {
  item: UploadItem;
}

function FileItem({ item }: FileItemProps) {
  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        marginBottom: "15px",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <strong>{item.name}</strong>

          <p>{formatFileSize(item.size)}</p>
        </div>

        <div>
          <strong>{item.status}</strong>
        </div>
      </div>

      <ProgressBar progress={item.progress} />

      <p style={{ marginTop: "8px" }}>
        {item.progress}%
      </p>
    </div>
  );
}

export default FileItem;