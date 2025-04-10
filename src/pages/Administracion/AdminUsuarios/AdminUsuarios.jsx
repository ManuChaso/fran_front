import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../../components/Header/Header'
import { obtenerTodosUsuarios } from '../../../services/Api/usuarios'
import Button from '../../../components/Button/Button'
import './AdminUsuarios.css'

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([])
  const [filteredUsuarios, setFilteredUsuarios] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) throw new Error('No hay token de autenticación')

        const data = await obtenerTodosUsuarios(token)
        setUsuarios(data)
        setFilteredUsuarios(data)
      } catch (error) {
        console.error('Error al obtener usuarios:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUsuarios()
  }, [])

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredUsuarios(usuarios)
    } else {
      const filtered = usuarios.filter(
        (usuario) =>
          usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          usuario.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredUsuarios(filtered)
    }
  }, [searchTerm, usuarios])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleGestionarUsuario = (userId) => {
    navigate(`/admin/usuario/${userId}/clases`)
  }

  const handleMensajePrivado = (userId) => {
    navigate(`/admin/usuario/${userId}/mensajes`)
  }

  if (loading)
    return (
      <div className='admin-container'>
        <Header />
        <div className='loading-container'>
          <div className='loading-spinner'></div>
          <p>Cargando usuarios...</p>
        </div>
      </div>
    )

  if (error)
    return (
      <div className='admin-container'>
        <Header />
        <div className='error-message'>Error: {error}</div>
      </div>
    )

  return (
    <div className='admin-container'>
      <Header />
      <Button
        variant='secondary'
        onClick={() => navigate('/administracion')}
        leftIcon={<span>←</span>}
      >
        Volver a Administracion
      </Button>
      <h1>Administración de Usuarios</h1>

      <div className='search-container'>
        <input
          type='text'
          placeholder='Buscar por nombre o email...'
          value={searchTerm}
          onChange={handleSearchChange}
          className='search-input'
        />
      </div>

      <div className='usuarios-grid'>
        {filteredUsuarios.length > 0 ? (
          filteredUsuarios.map((usuario) => (
            <div key={usuario._id} className='usuario-card'>
              <img
                src={usuario.avatar || '/default-avatar.jpg'}
                alt={usuario.nombre}
                className='usuario-avatar'
              />
              <h3>{usuario.nombre}</h3>
              <p>
                <strong>Email:</strong> {usuario.email}
              </p>
              <p>
                <strong>Rol:</strong> {usuario.rol}
              </p>
              <p>
                <strong>Estado:</strong> {usuario.estado || 'Activo'}
              </p>
              <div className='usuario-buttons'>
                <Button
                  onClick={() => handleGestionarUsuario(usuario._id)}
                  variant='secondary'
                  size='sm'
                >
                  Gestionar Clases
                </Button>
                <Button
                  onClick={() => handleMensajePrivado(usuario._id)}
                  variant='secondary'
                  size='sm'
                >
                  Mensaje Privado
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className='no-results'>
            No se encontraron usuarios con ese criterio de búsqueda
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminUsuarios
