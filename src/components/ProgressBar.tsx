interface ProgressBarProps {
  progress: number;
}

function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "8px",
        background: "#ddd",
        borderRadius: "10px",
        overflow: "hidden",
        marginTop: "10px",
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: "100%",
          background: "green",
          transition: "width 0.2s ease",
        }}
      />
    </div>
  );
}

export default ProgressBar;