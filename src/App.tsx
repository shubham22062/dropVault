import "./App.css";

import DropZone from "./components/DropZone";
import FileList from "./components/FileList";
import { useUploadQueue } from "./hooks/useUploadQueue";

function App() {
  const { files, addFiles, retryUpload, cancelUpload, processQueue } = useUploadQueue();

  const completedCount = files.filter((file) => file.status === "completed").length;
  const activeCount = files.filter((file) => file.status === "uploading").length;
  const totalSize = files.reduce((sum, file) => sum + file.size, 0);

  const handleFilesSelected = (selectedFiles: File[]) => {
    addFiles(selectedFiles);
    setTimeout(() => {
      processQueue();
    }, 0);
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">D</div>
          <div>
            <p className="eyebrow">Secure transfer</p>
            <h1>DropVault</h1>
          </div>
        </div>

        <div className="status-pill">{files.length} files in queue</div>
      </header>

      <main className="app-panel">
        <section className="hero">
          <div>
            <p className="eyebrow accent">Smart upload hub</p>
            <h2>Send large files without the friction.</h2>
          </div>

          <div className="hero-summary">
            <span>{completedCount} complete</span>
            <span>{activeCount} active</span>
            <span>{formatTotalSize(totalSize)}</span>
          </div>
        </section>

        <DropZone onFilesSelected={handleFilesSelected} />

        <div className="stats-grid">
          <div className="stat-card">
            <label>Queued</label>
            <strong>{files.length}</strong>
          </div>
          <div className="stat-card">
            <label>Uploading</label>
            <strong>{activeCount}</strong>
          </div>
          <div className="stat-card">
            <label>Completed</label>
            <strong>{completedCount}</strong>
          </div>
        </div>

        <FileList files={files} onRetry={retryUpload} onCancel={cancelUpload} />
      </main>
    </div>
  );
}

function formatTotalSize(bytes: number) {
  if (bytes === 0) return "0 MB";

  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);

  return `${(bytes / 1024 ** index).toFixed(1)} ${units[index]}`;
}

export default App;