import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../../../../components/Header/Header'
import Button from '../../../../components/Button/Button'
import { obtenerUsuarioPorId } from '../../../../services/Api/usuarios'
import {
  obtenerConversacion,
  obtenerMensajesConversacion,
  enviarMensajePrivado,
  marcarMensajesComoLeidos
} from '../../../../services/Api/mensajesPrivados'
import { getImageUrl } from '../../../../pages/Clases/utils/imageUtils'
import './AdminUsuarioMensajePrivado.css'

const AdminUsuarioMensajes = () => {
  const { userId } = useParams()
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState(null)
  const [mensajes, setMensajes] = useState([])
  const [conversacionActual, setConversacionActual] = useState(null)
  const [nuevoMensaje, setNuevoMensaje] = useState('')
  const [loading, setLoading] = useState(true)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')
  const mensajesRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('token')
        if (!token) {
          navigate('/iniciar-sesion')
          return
        }

        if (!userId) {
          setError('ID de usuario no válido')
          setLoading(false)
          return
        }

        console.log('Cargando datos para usuario:', userId)

        const userData = await obtenerUsuarioPorId(userId, token)
        if (userData && userData.data) {
          setUserInfo(userData.data)
        } else {
          throw new Error('No se pudo obtener la información del usuario')
        }

        const conversacionData = await obtenerConversacion(token, userId)
        console.log('Respuesta de conversación:', conversacionData)

        if (conversacionData && conversacionData.success) {
          setMensajes(conversacionData.data || [])

          if (
            conversacionData.conversacion ||
            conversacionData.conversacionActual
          ) {
            const conv =
              conversacionData.conversacion ||
              conversacionData.conversacionActual
            setConversacionActual(conv)

            if (conv && conv._id) {
              await cargarMensajesConversacion(token, conv._id)
            }
          }
        }
      } catch (error) {
        console.error('Error al cargar datos:', error)
        setError(error.message || 'Error al cargar datos')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [userId, navigate])

  const cargarMensajesConversacion = async (token, convId) => {
    try {
      if (!convId) return

      console.log('Cargando mensajes para conversación ID:', convId)

      const data = await obtenerMensajesConversacion(token, convId)

      if (data.success) {
        setMensajes(data.data || [])

        await marcarMensajesComoLeidos(token, convId)
        console.log('Mensajes marcados como leídos')
      } else {
        console.error('Error en la respuesta al obtener mensajes:', data)
        setError('No se pudieron cargar los mensajes.')
      }
    } catch (error) {
      console.error('Error al cargar mensajes:', error)
      setError('Error al cargar los mensajes.')
    }
  }

  useEffect(() => {
    if (mensajesRef.current) {
      mensajesRef.current.scrollTop = mensajesRef.current.scrollHeight
    }
  }, [mensajes])

  const handleVolver = () => {
    navigate('/administracion/usuarios')
  }

  const handleEnviarMensaje = async (e) => {
    e.preventDefault()
    if (!nuevoMensaje.trim() || !userId) return

    try {
      setEnviando(true)
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/iniciar-sesion')
        return
      }

      const resultado = await enviarMensajePrivado(token, userId, nuevoMensaje)

      if (resultado && resultado.success) {
        setMensajes([...mensajes, resultado.data])
        setNuevoMensaje('')

        if (conversacionActual && conversacionActual._id) {
          await cargarMensajesConversacion(token, conversacionActual._id)
        }
      } else {
        setError('No se pudo enviar el mensaje')
      }
    } catch (error) {
      console.error('Error al enviar mensaje:', error)
      setError(error.message || 'Error al enviar el mensaje')
    } finally {
      setEnviando(false)
    }
  }

  if (loading && !userInfo) {
    return (
      <div className='admin-mensajes-container'>
        <Header />
        <div className='loading-container'>
          <div className='loading-spinner'></div>
          <p>Cargando conversación...</p>
        </div>
      </div>
    )
  }

  if (error && !userInfo) {
    return (
      <div className='admin-mensajes-container'>
        <Header />
        <div className='error-message'>Error: {error}</div>
        <Button
          variant='secondary'
          size='sm'
          className='back-button mt-4'
          onClick={handleVolver}
        >
          ← Volver a usuarios
        </Button>
      </div>
    )
  }

  return (
    <div className='admin-mensajes-container'>
      <Header />

      <div className='admin-mensajes-header'>
        <Button
          variant='secondary'
          size='sm'
          className='back-button'
          onClick={handleVolver}
        >
          ← Volver a usuarios
        </Button>

        {userInfo && (
          <div className='usuario-info'>
            <img
              src={
                userInfo.avatar ? getImageUrl(userInfo) : '/default-avatar.png'
              }
              alt={userInfo.nombre}
              className='usuario-avatar-small'
            />
            <h1>Mensajes con {userInfo.nombre}</h1>
          </div>
        )}
      </div>

      {error && <div className='error-message'>{error}</div>}

      <div className='mensajes-container' ref={mensajesRef}>
        {mensajes.length === 0 ? (
          <div className='no-mensajes'>
            <p>No hay mensajes previos con este usuario.</p>
            <p>Envía un mensaje para iniciar la conversación.</p>
          </div>
        ) : (
          mensajes.map((mensaje) => {
            const esAdmin = mensaje.remitente._id !== userId

            return (
              <div
                key={mensaje._id}
                className={`mensaje ${esAdmin ? 'enviado' : 'recibido'}`}
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
          disabled={enviando}
        />
        <Button
          type='submit'
          variant='primary'
          size='md'
          isLoading={enviando}
          disabled={enviando || !nuevoMensaje.trim()}
        >
          Enviar
        </Button>
      </form>
    </div>
  )
}

export default AdminUsuarioMensajes
