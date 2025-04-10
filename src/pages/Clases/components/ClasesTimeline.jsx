import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import ClaseCard from './ClaseCard'

const ClasesTimeline = ({
  selectedDate,
  clasesOrdenadas,
  handleInscribir,
  handleCancelar,
  estaInscrito,
  loading,
  claseSeleccionada
}) => {
  return (
    <div className='clases-por-dia'>
      <h2 className='dia-seleccionado'>
        {format(selectedDate, "EEEE d 'de' MMMM", { locale: es })}
      </h2>

      {clasesOrdenadas.length > 0 ? (
        <div className='timeline-clases'>
          {clasesOrdenadas.map((clase) => (
            <div key={clase._id} className='clase-timeline-item'>
              <div className='clase-hora'>{clase.horario}</div>
              <ClaseCard
                clase={clase}
                handleInscribir={handleInscribir}
                handleCancelar={handleCancelar}
                estaInscrito={estaInscrito}
                loading={loading}
                claseSeleccionada={claseSeleccionada}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className='no-clases'>
          <p>
            No hay clases disponibles para{' '}
            {format(selectedDate, "EEEE d 'de' MMMM", { locale: es })}.
          </p>
          <p>Por favor, selecciona otro día o vuelve más tarde.</p>
        </div>
      )}
    </div>
  )
}

export default ClasesTimeline
