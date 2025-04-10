import './ProgressBar.css'

const ProgressBar = ({
  progress,
  showLabel = false,
  height = '8px',
  color = '#3498db',
  backgroundColor = '#ecf0f1'
}) => {
  const safeProgress = Math.min(100, Math.max(0, progress))

  return (
    <div className='progress-bar-container' style={{ height, backgroundColor }}>
      <div
        className='progress-bar-fill'
        style={{
          width: `${safeProgress}%`,
          backgroundColor: color
        }}
      />
      {showLabel && (
        <span className='progress-bar-label'>{Math.round(safeProgress)}%</span>
      )}
    </div>
  )
}

export default ProgressBar
