import './Alert.css'

const Alert = ({ children, type = 'info', onClose }) => {
  return (
    <div className={`alert alert-${type}`}>
      <div className='alert-content'>{children}</div>
      {onClose && (
        <button className='alert-close' onClick={onClose}>
          &times;
        </button>
      )}
    </div>
  )
}

export default Alert
