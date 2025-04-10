import { getImageUrl } from '../utils/imageUtils'

const MonitorInfo = ({ monitor }) => {
  if (!monitor) return null

  const avatarUrl = getImageUrl(monitor)

  return (
    <div className='monitor-info'>
      <div className='monitor-avatar'>
        <img
          src={avatarUrl || '/placeholder.svg'}
          alt={monitor.nombre}
          onError={(e) => {
            if (e.target.src !== '/default-avatar.png') {
              e.target.src = '/default-avatar.png'
            }
          }}
        />
      </div>
      <div className='monitor-details'>
        <span className='monitor-label'>Monitor:</span>
        <span className='monitor-name'>{monitor.nombre}</span>
      </div>
    </div>
  )
}

export default MonitorInfo
