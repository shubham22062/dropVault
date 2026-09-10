import type { UploadItem } from "../types/upload";
import FileItem from "./FileItem";

interface FileListProps {
  files: UploadItem[];
}

function FileList({ files }: FileListProps) {
  return (
    <div>
      {files.map((item) => (
        <FileItem
          key={item.id}
          item={item}
        />
      ))}
    </div>
  );
}

export default FileList;