import { useState } from "react";

import DropZone from "./components/DropZone";
import FileList from "./components/FileList";

import type { UploadItem } from "./types/upload";

function App() {
  const [files, setFiles] = useState<UploadItem[]>([]);

  const handleFiles = (selectedFiles: File[]) => {
    const newFiles: UploadItem[] = selectedFiles.map(
      (file) => ({
        id: crypto.randomUUID(),

        file,

        name: file.name,

        size: file.size,

        progress: 0,

        status: "pending",

        uploadedChunks: 0,

        totalChunks: 0,

        error: null,
      })
    );

    setFiles((previousFiles) => [
      ...previousFiles,
      ...newFiles,
    ]);
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1>DropVault</h1>

      <p style={{ marginBottom: "30px" }}>
        Smart File Upload Manager
      </p>

      <DropZone
        onFilesSelected={handleFiles}
      />

      <FileList files={files} />
    </div>
  );
}

export default App;