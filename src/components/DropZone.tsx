interface DropZoneProps {
  onFilesSelected: (files: File[]) => void;
}

function DropZone({ onFilesSelected }: DropZoneProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const files = Array.from(event.target.files);
    onFilesSelected(files);
    event.target.value = "";
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const files = Array.from(event.dataTransfer.files);
    onFilesSelected(files);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="drop-zone" onDrop={handleDrop} onDragOver={handleDragOver}>
      <div className="drop-zone-icon">⇪</div>
      <h3>Drag & drop files here</h3>
      <p>or choose files from your device to begin uploading</p>

      <label className="upload-trigger">
        <input type="file" multiple hidden onChange={handleFileChange} />
        <span>Select Files</span>
      </label>
    </div>
  );
}

export default DropZone;