interface DropZoneProps {
  onFilesSelected: (files: File[]) => void;
}

function DropZone({ onFilesSelected }: DropZoneProps) {
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;

    const files = Array.from(event.target.files);

    onFilesSelected(files);
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();

    const files = Array.from(event.dataTransfer.files);

    onFilesSelected(files);
  };

  const handleDragOver = (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        border: "2px dashed #888",
        padding: "50px",
        textAlign: "center",
        borderRadius: "10px",
        marginBottom: "30px",
      }}
    >
      <h2>Drag & Drop Files Here</h2>

      <p>or</p>

      <label>
        <input
          type="file"
          multiple
          hidden
          onChange={handleFileChange}
        />

        <button type="button">
          Select Files
        </button>
      </label>
    </div>
  );
}

export default DropZone;