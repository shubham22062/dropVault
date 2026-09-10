interface ProgressBarProps {
  progress: number;
}

function ProgressBar({ progress }: ProgressBarProps) {
  const safeProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="progress-track" aria-label="Upload progress">
      <div className="progress-fill" style={{ width: `${safeProgress}%` }} />
    </div>
  );
}

export default ProgressBar;