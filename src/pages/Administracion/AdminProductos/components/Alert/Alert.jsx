import { AlertCircle, CheckCircle } from 'lucide-react'
import './Alert.css'

const Alert = ({ type, message }) => {
  if (!message) return null

  return (
    <div className={`alert ${type}`}>
      {type === 'error' ? <AlertCircle size={20} /> : <CheckCircle size={20} />}
      {message}
    </div>
  )
}

export default Alert
