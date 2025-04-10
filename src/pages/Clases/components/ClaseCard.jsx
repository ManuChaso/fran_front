import MonitorInfo from './Monitorinfo'
import { getNivelBadgeClass } from '../utils/formatters'
import { getImageUrl } from '../utils/imageUtils'
import Button from '../../../components/Button/Button'

const ClaseCard = ({
  clase,
  handleInscribir,
  handleCancelar,
  estaInscrito,
  loading,
  claseSeleccionada
}) => {
  const inscrito = estaInscrito(clase)
  const completa = clase.inscritos.length >= clase.capacidadMaxima

  return (
    <div className='clase-card'>
      <div className='clase-info'>
        <h3 className='clase-nombre'>{clase.nombre}</h3>
        <div className='clase-detalles'>
          <span className={getNivelBadgeClass(clase.nivel)}>
            {clase.nivel.charAt(0).toUpperCase() + clase.nivel.slice(1)}
          </span>
          <span className='clase-duracion'>{clase.duracion} min</span>
          {clase.esFechaEspecifica && (
            <span className='clase-unica'>Clase única</span>
          )}
        </div>
      </div>

      <div className='clase-ocupacion'>
        <div className='ocupacion-header'>
          <span className='ocupacion-label'>Ocupación:</span>
          <span className='ocupacion-contador'>
            {clase.inscritos.length}/{clase.capacidadMaxima}
          </span>
        </div>

        <OcupacionVisual clase={clase} estaInscrito={estaInscrito} />
      </div>

      <MonitorInfo monitor={clase.entrenador} />

      <div className='clase-actions'>
        {inscrito ? (
          <Button
            className='btn-cancelar'
            variant='secondary'
            size='md'
            isLoading={claseSeleccionada === clase._id}
            onClick={() => handleCancelar(clase._id)}
            disabled={loading || claseSeleccionada === clase._id}
          >
            Cancelar reserva
          </Button>
        ) : completa ? (
          <button className='btn-completo' disabled>
            Clase completa
          </button>
        ) : (
          <Button
            className='btn-inscribir'
            variant='primary'
            size='md'
            isLoading={claseSeleccionada === clase._id}
            onClick={() => handleInscribir(clase._id)}
            disabled={loading || claseSeleccionada === clase._id}
          >
            Reservar plaza
          </Button>
        )}
      </div>
    </div>
  )
}

const OcupacionVisual = ({ clase, estaInscrito }) => {
  return (
    <div className='huecos-container'>
      <div className='huecos'>
        {Array.from({ length: clase.capacidadMaxima }).map((_, index) => {
          const inscrito =
            index < clase.inscritos.length ? clase.inscritos[index] : null
          const isCurrentUser =
            inscrito && estaInscrito({ inscritos: [inscrito] })

          return (
            <div
              key={index}
              className={`hueco ${inscrito ? 'ocupado' : ''} ${
                isCurrentUser ? 'usuario-actual' : ''
              }`}
            >
              {inscrito ? (
                <div className='avatar-container'>
                  <img
                    src={getImageUrl(inscrito) || '/default-avatar.jpg'}
                    alt={inscrito.nombre || 'Usuario inscrito'}
                    onError={(e) => {
                      e.target.src = '/default-avatar.jpg'
                    }}
                  />
                  {isCurrentUser && <div className='usuario-indicador'>Tú</div>}
                </div>
              ) : (
                <div className='hueco-vacio'></div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ClaseCard
