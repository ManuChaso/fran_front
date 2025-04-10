import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Administracion.css'
import Header from '../../../components/Header/Header'
import { obtenerTodosUsuarios } from '../../../services/Api/index'

const Administracion = () => {
  const navigate = useNavigate()
  const [usuarios, setUsuarios] = useState([])
  const [error, setError] = useState(null)
  const [userRole, setUserRole] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('rol')?.toLowerCase().trim()

    if (
      !token ||
      !(role === 'administrador' || role === 'admin' || role === 'creador')
    ) {
      console.error('Acceso denegado: no tienes permisos.')
      navigate('/')
      return
    }

    setUserRole(role)

    const fetchUsuarios = async () => {
      try {
        const data = await obtenerTodosUsuarios(token)
        setUsuarios(data || [])
      } catch (error) {
        console.error('Error al obtener usuarios:', error)
        setError(error.message || 'Error en la conexión con el servidor.')
        setUsuarios([])
      }
    }

    fetchUsuarios()
  }, [navigate])

  return (
    <div className='admin-container'>
      <Header />
      <h1>Panel de Administración</h1>
      <div className='admin-sections'>
        <div
          className='section-card'
          onClick={() => navigate('/administracion/clases')}
        >
          <h2>📅 Crear Clases</h2>
          <p>Agrega nuevas clases para los usuarios.</p>
        </div>

        <div
          className='section-card'
          onClick={() => navigate('/administracion/productos')}
        >
          <h2>🛒 Crear Productos</h2>
          <p>Agrega nuevos productos a la tienda.</p>
        </div>

        <div
          className='section-card'
          onClick={() => navigate('/administracion/usuarios')}
        >
          <h2>👥 Ver Usuarios</h2>
          <p>Lista de todos los usuarios registrados.</p>
        </div>

        <div
          className='section-card'
          onClick={() => navigate('/admin/medical-info')}
        >
          <h2>❤️ Información Médica</h2>
          <p>Revisa y gestiona los datos médicos de todos los usuarios.</p>
        </div>

        <div
          className='section-card'
          onClick={() => navigate('/administracion/consentimientos')}
        >
          <h2>📝 Consentimientos</h2>
          <p>
            Revisa los consentimientos y autorizaciones de imagen de los
            usuarios.
          </p>
        </div>
      </div>

      <h2>Usuarios Registrados</h2>
      {error ? (
        <p className='error-message'>{error}</p>
      ) : (
        <p className='pAdministracion'>Total de usuarios: {usuarios.length}</p>
      )}
    </div>
  )
}

export default Administracion
