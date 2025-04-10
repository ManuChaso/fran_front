import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'
import Header from '../../../../components/Header/Header'
import { obtenerPerfilUsuario } from '../../../../services/Api/index'
import { obtenerMensajesNoLeidos } from '../../../../services/Api/mensajesPrivados'

const UserDashboard = () => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('Usuario')
  const [userId, setUserId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [unreadMessages, setUnreadMessages] = useState(0)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)

        const token = localStorage.getItem('token')
        const storedUserId = localStorage.getItem('userId')

        if (!token) {
          navigate('/')
          return
        }

        if (storedUserId) {
          setUserId(storedUserId)
        }

        const storedName = localStorage.getItem('nombre')
        if (storedName) {
          setUserName(storedName)
        }

        const response = await obtenerPerfilUsuario(token)

        if (response.success && response.data) {
          const userData = response.data

          setUserName(userData.nombre || 'Usuario')

          localStorage.setItem('nombre', userData.nombre)

          if (userData._id) {
            setUserId(userData._id)
            localStorage.setItem('userId', userData._id)
          }
        }

        await checkUnreadMessages()
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error)

        const nombre = localStorage.getItem('nombre')
        if (nombre) {
          setUserName(nombre)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()

    const intervalId = setInterval(checkUnreadMessages, 60000)

    return () => clearInterval(intervalId)
  }, [navigate])

  const checkUnreadMessages = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const response = await obtenerMensajesNoLeidos(token)

      if (response.success) {
        setUnreadMessages(response.cantidad)
      } else {
        console.error('Error al obtener mensajes no leídos:', response.message)
        setUnreadMessages(0)
      }
    } catch (error) {
      console.error('Error al verificar mensajes no leídos:', error)
      setUnreadMessages(0)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('nombre')
    localStorage.removeItem('userId')
    localStorage.removeItem('rol')
    navigate('/')
  }

  const sectionData = [
    {
      icon: '🏥',
      title: 'Información Médica',
      description: 'Gestiona tu información médica y de salud',
      path: '/dashboard/medico'
    },
    {
      icon: '📏',
      title: 'Aspecto Físico',
      description: 'Registra tus medidas y progreso físico',
      path: '/dashboard/aspecto'
    },
    {
      icon: '💬',
      title: 'Chat en Vivo',
      description: 'Conversa con otros miembros del box',
      path: '/dashboard/chat'
    },
    {
      icon: '✉️',
      title: 'Mensajes Privados',
      description: 'Comunicación directa con administración',
      path: '/dashboard/mensajes',
      badge: unreadMessages > 0 ? unreadMessages : null
    },
    {
      icon: '🏋️‍♂️',
      title: 'Marcas Personales',
      description: 'Registra tus récords y logros',
      path: '/dashboard/marcas'
    },
    {
      icon: '⚙️',
      title: 'Editar Perfil',
      description: 'Modifica tu información personal',
      path: `/dashboard/editar-perfil/${userId}`
    }
  ]

  return (
    <div className='dashboard-container'>
      <Header />
      <div className='dashboard-header'>
        <h1>Bienvenido a AderCrossFit, {userName}</h1>
        <button className='logout-btn' onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>

      {loading ? (
        <div className='loading-indicator'>Cargando tu información</div>
      ) : (
        <div className='dashboard-sections'>
          {sectionData.map((section, index) => (
            <div
              key={index}
              className='section-card'
              onClick={() => navigate(section.path)}
            >
              <span className='section-icon'>{section.icon}</span>
              {section.badge && (
                <span className='notification-badge'>{section.badge}</span>
              )}
              <h2>{section.title}</h2>
              <p>{section.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserDashboard
