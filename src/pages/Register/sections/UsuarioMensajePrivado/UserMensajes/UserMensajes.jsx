import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../../../components/Header/Header'
import Button from '../../../../components/Button/Button'
import {
  obtenerMensajesPrivados,
  obtenerMensajesConversacion,
  enviarMensajePrivado,
  marcarMensajesComoLeidos
} from '../../../../services/Api/mensajesPrivados'
import { getImageUrl } from '../../../../Clases/utils/imageUtils'
import './UserMensajes.css'

const UserMensajes = () => {
  const navigate = useNavigate()
  const [adminInfo, setAdminInfo] = useState(null)
  const [conversacionId, setConversacionId] = useState(null)
  const [mensajes, setMensajes] = useState([])
  const [nuevoMensaje, setNuevoMensaje] = useState('')
  const [loading, setLoading] = useState(true)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')
  const mensajesRef = useRef(null)
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId')
    if (storedUserId) {
      setUserId(storedUserId)
    }
  }, [])

  useEffect(() => {
    const fetchConversaciones = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('token')

        if (!token) {
          navigate('/iniciar-sesion')
          return
        }

        const data = await obtenerMensajesPrivados(token)

        if (data.success && data.data.length > 0) {
          const conversacion = data.data[0]
          setAdminInfo(conversacion.admin)
          setConversacionId(conversacion._id)

          if (conversacion._id) {
            await cargarMensajesConversacion(token, conversacion._id)
          }
        } else {
          setMensajes([])
          setLoading(false)
        }
      } catch (error) {
        console.error('Error al cargar conversaciones:', error)
        setError(
          'No se pudo cargar la conversación. Por favor, intenta de nuevo más tarde.'
        )
        setLoading(false)
      }
    }

    fetchConversaciones()
  }, [navigate])

  const cargarMensajesConversacion = async (token, convId) => {
    try {
      if (!convId) return

      console.log('Cargando mensajes para conversación ID:', convId)

      const data = await obtenerMensajesConversacion(token, convId)

      if (data.success) {
        setMensajes(data.data || [])

        await marcarMensajesComoLeidos(token, convId)
      } else {
        console.error('Error en la respuesta al obtener mensajes:', data)
        setError('No se pudieron cargar los mensajes.')
      }
    } catch (error) {
      console.error('Error al cargar mensajes:', error)
      setError('Error al cargar los mensajes.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (mensajesRef.current) {
      mensajesRef.current.scrollTop = mensajesRef.current.scrollHeight
    }
  }, [mensajes])

  const handleVolver = () => {
    navigate('/dashboard')
  }

  const handleEnviarMensaje = async (e) => {
    e.preventDefault()
    if (!nuevoMensaje.trim() || !adminInfo) return

    try {
      setEnviando(true)
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/iniciar-sesion')
        return
      }

      const destinatarioId = adminInfo._id

      const resultado = await enviarMensajePrivado(
        token,
        destinatarioId,
        nuevoMensaje
      )

      if (resultado.success) {
        setMensajes([...mensajes, resultado.data])
        setNuevoMensaje('')

        if (conversacionId) {
          await cargarMensajesConversacion(token, conversacionId)
        }
      } else {
        setError('No se pudo enviar el mensaje')
      }
    } catch (error) {
      console.error('Error al enviar mensaje:', error)
      setError('Error al enviar el mensaje. Por favor, intenta de nuevo.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className='user-mensajes-container'>
      <Header />

      <div className='user-mensajes-header'>
        <Button
          variant='secondary'
          size='sm'
          className='back-button'
          onClick={handleVolver}
        >
          ← Volver al dashboard
        </Button>
        <h1>Mensajes con Administración</h1>
      </div>

      {error && <div className='error-message'>{error}</div>}

      <div className='mensajes-simple-layout'>
        {adminInfo && (
          <div className='mensajes-header'>
            <img
              src={getImageUrl(adminInfo) || '/default-avatar.png'}
              alt={adminInfo.nombre}
              className='conversacion-avatar'
            />
            <h2>Conversación con {adminInfo.nombre}</h2>
          </div>
        )}

        <div className='mensajes-container' ref={mensajesRef}>
          {loading ? (
            <div className='loading-container-small'>
              <div className='loading-spinner-small'></div>
              <p>Cargando mensajes...</p>
            </div>
          ) : mensajes.length === 0 ? (
            <div className='no-mensajes'>
              <p>No hay mensajes previos.</p>
              <p>
                Envía un mensaje para comenzar una conversación con el
                administrador.
              </p>
            </div>
          ) : (
            mensajes.map((mensaje) => {
              const esUsuarioActual = mensaje.remitente._id === userId

              return (
                <div
                  key={mensaje._id}
                  className={`mensaje ${
                    esUsuarioActual ? 'enviado' : 'recibido'
                  }`}
                >
                  <div className='mensaje-contenido'>
                    <p>{mensaje.mensaje}</p>
                    <span className='mensaje-fecha'>
                      {new Date(mensaje.fecha).toLocaleString()}
                    </span>
                  </div>
                </div>
              )
            })
          )}
        </div>

        <form className='mensaje-form' onSubmit={handleEnviarMensaje}>
          <textarea
            value={nuevoMensaje}
            onChange={(e) => setNuevoMensaje(e.target.value)}
            placeholder='Escribe un mensaje...'
            disabled={enviando || !adminInfo}
          />
          <Button
            type='submit'
            variant='primary'
            size='md'
            isLoading={enviando}
            disabled={enviando || !nuevoMensaje.trim() || !adminInfo}
          >
            Enviar
          </Button>
        </form>
      </div>
    </div>
  )
}

export default UserMensajes
