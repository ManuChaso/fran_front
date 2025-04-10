import { useParams, useNavigate } from 'react-router-dom'
import Header from '../../../../components/Header/Header'
import Button from '../../../../components/Button/Button'
import CalendarioDias from '../../../Clases/components/CalendarioDias'
import ClasesTimeline from '../../../Clases/components/ClasesTimeline'
import MensajeEstado from '../../../Clases/components/MensajeEstado'
import { useCalendario } from '../../../Clases/hooks/useCalendario'
import { useUsuarioClases } from '../hooks/useUsuarioClases'
import './AdminUsuarioClases.css'

const AdminUsuarioClases = () => {
  const { userId } = useParams()
  const navigate = useNavigate()
  const {
    selectedDate,
    visibleDates,
    calendarRef,
    handlePrevWeek,
    handleNextWeek,
    setSelectedDate
  } = useCalendario()

  const {
    userInfo,
    clasesOrdenadas,
    loading,
    loadingClases,
    error,
    claseSeleccionada,
    inscripcionExitosa,
    cancelacionExitosa,
    handleInscribir,
    handleCancelar,
    estaInscrito
  } = useUsuarioClases(userId, selectedDate)

  const handleVolver = () => {
    navigate('/administracion/usuarios')
  }

  if (loading && !userInfo) {
    return (
      <div className='admin-usuario-container'>
        <Header />
        <div className='loading-container'>
          <div className='loading-spinner'></div>
          <p>Cargando información del usuario...</p>
        </div>
      </div>
    )
  }

  if (error && !userInfo) {
    return (
      <div className='admin-usuario-container'>
        <Header />
        <div className='error-message'>Error: {error}</div>
      </div>
    )
  }

  return (
    <div className='admin-usuario-container'>
      <Header />

      <div className='admin-usuario-header'>
        <Button
          variant='secondary'
          size='sm'
          className='back-button'
          onClick={handleVolver}
        >
          ← Volver a usuarios
        </Button>

        <div className='usuario-info'>
          <img
            src={userInfo?.avatar || '/default-avatar.png'}
            alt={userInfo?.nombre}
            className='usuario-avatar-small'
          />
          <h1>Gestionar clases de {userInfo?.nombre}</h1>
        </div>
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

      {loadingClases && !claseSeleccionada && (
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
          loading={loadingClases}
          claseSeleccionada={claseSeleccionada}
        />
      )}
    </div>
  )
}

export default AdminUsuarioClases
