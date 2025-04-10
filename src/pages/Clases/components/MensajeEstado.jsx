const MensajeEstado = ({ tipo, mensaje }) => {
  const getIcono = () => {
    switch (tipo) {
      case 'exito':
        return '✓'
      case 'error':
        return '⚠️'
      case 'info':
        return 'ℹ️'
      default:
        return ''
    }
  }

  const getClase = () => {
    switch (tipo) {
      case 'exito':
        return 'mensaje-exito'
      case 'error':
        return 'error-message'
      case 'info':
        return 'mensaje-info'
      default:
        return ''
    }
  }

  return (
    <div className={getClase()}>
      <span>{getIcono()}</span> {mensaje}
    </div>
  )
}

export default MensajeEstado
