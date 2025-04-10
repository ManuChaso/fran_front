import { useState } from 'react'
import Header from '../../components/Header/Header'
import CalendarioDias from './components/CalendarioDias'
import ClasesTimeline from './components/ClasesTimeline'
import MensajeEstado from './components/MensajeEstado'
import { useUsuario } from './hooks/useUsuario'
import { useClasesUsuario } from './hooks/useClasesUsuario'
import { useCalendario } from './hooks/useCalendario'

import './Clases.css'

const Clases = () => {
  const [claseSeleccionada, setClaseSeleccionada] = useState(null)
  const [inscripcionExitosa, setInscripcionExitosa] = useState(null)
  const [cancelacionExitosa, setCancelacionExitosa] = useState(null)

  const { userId, userInfo } = useUsuario()

  const {
    selectedDate,
    visibleDates,
    calendarRef,
    handlePrevWeek,
    handleNextWeek,
    setSelectedDate
  } = useCalendario()

  const {
    clases,
    clasesOrdenadas,
    loading,
    error,
    handleInscribir,
    handleCancelar,
    estaInscrito
  } = useClasesUsuario({
    userId,
    selectedDate,
    setInscripcionExitosa,
    setCancelacionExitosa,
    claseSeleccionada,
    setClaseSeleccionada
  })

  return (
    <div className='clases-container'>
      <Header />

      <div className='clases-header'>
        <h1>Reserva tu Clase</h1>
        <p className='clases-subtitle'>
          Selecciona el día y la hora que prefieras
        </p>
      </div>

      {inscripcionExitosa && (
        <MensajeEstado tipo='exito' mensaje={inscripcionExitosa} />
      )}

      {cancelacionExitosa && (
        <MensajeEstado tipo='info' mensaje={cancelacionExitosa} />
      )}

      <CalendarioDias
        selectedDate={selectedDate}
        visibleDates={visibleDates}
        calendarRef={calendarRef}
        handlePrevWeek={handlePrevWeek}
        handleNextWeek={handleNextWeek}
        setSelectedDate={setSelectedDate}
      />

      {loading && !claseSeleccionada && (
        <div className='loading-container'>
          <div className='loading-spinner'></div>
          <p>Cargando clases...</p>
        </div>
      )}

      {error ? (
        <MensajeEstado tipo='error' mensaje={error} />
      ) : (
        <ClasesTimeline
          selectedDate={selectedDate}
          clasesOrdenadas={clasesOrdenadas}
          handleInscribir={handleInscribir}
          handleCancelar={handleCancelar}
          estaInscrito={estaInscrito}
          loading={loading}
          claseSeleccionada={claseSeleccionada}
        />
      )}
    </div>
  )
}

export default Clases
