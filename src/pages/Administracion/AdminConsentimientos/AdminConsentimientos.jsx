import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Adminconsentimientos.css'
import Header from '../../../components/Header/Header'
import {
  obtenerTodosConsentimientos,
  eliminarConsentimiento,
  obtenerTodosUsuarios
} from '../../../services/Api'

const AdminConsentimientos = () => {
  const navigate = useNavigate()
  const [consentimientos, setConsentimientos] = useState([])
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredConsentimientos, setFilteredConsentimientos] = useState([])
  const [deleteLoading, setDeleteLoading] = useState(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [consentimientoToDelete, setConsentimientoToDelete] = useState(null)

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

    const fetchData = async () => {
      try {
        setLoading(true)

        const [consentimientosData, usuariosData] = await Promise.all([
          obtenerTodosConsentimientos(token),
          obtenerTodosUsuarios(token)
        ])

        console.log('Consentimientos obtenidos:', consentimientosData)
        console.log('Usuarios obtenidos:', usuariosData)

        const consentimientosArray =
          consentimientosData.data || consentimientosData
        const usuariosArray = usuariosData.data || usuariosData

        setConsentimientos(consentimientosArray || [])
        setUsuarios(usuariosArray || [])
        setLoading(false)
      } catch (error) {
        console.error('Error al obtener datos:', error)
        setError(error.message || 'Error en la conexión con el servidor.')
        setLoading(false)
      }
    }

    fetchData()
  }, [navigate])

  useEffect(() => {
    const consentimientosConUsuarios = consentimientos.map((consentimiento) => {
      const usuario = usuarios.find((u) => u._id === consentimiento.userId)
      return {
        ...consentimiento,
        nombreUsuario: usuario
          ? `${usuario.nombre || ''} ${usuario.apellidos || ''}`.trim()
          : 'Usuario desconocido',
        email: usuario ? usuario.email : 'Email no disponible'
      }
    })

    const filtered =
      searchTerm.trim() === ''
        ? consentimientosConUsuarios
        : consentimientosConUsuarios.filter(
            (item) =>
              (item.nombreUsuario &&
                item.nombreUsuario
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())) ||
              (item.email &&
                item.email.toLowerCase().includes(searchTerm.toLowerCase()))
          )

    setFilteredConsentimientos(filtered)
  }, [consentimientos, usuarios, searchTerm])

  const formatDate = (dateString) => {
    if (!dateString) return 'Fecha no disponible'

    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch (error) {
      console.error('Error al formatear fecha:', error)
      return 'Fecha inválida'
    }
  }

  const handleDeleteClick = (consentimiento) => {
    setConsentimientoToDelete(consentimiento)
    setShowConfirmDialog(true)
  }

  const handleCancelDelete = () => {
    setShowConfirmDialog(false)
    setConsentimientoToDelete(null)
  }

  const handleConfirmDelete = async () => {
    if (!consentimientoToDelete || !consentimientoToDelete._id) return

    setDeleteLoading(consentimientoToDelete._id)

    try {
      const token = localStorage.getItem('token')
      await eliminarConsentimiento(consentimientoToDelete._id, token)

      setConsentimientos((prevConsentimientos) =>
        prevConsentimientos.filter((c) => c._id !== consentimientoToDelete._id)
      )

      setShowConfirmDialog(false)
      setConsentimientoToDelete(null)
    } catch (error) {
      console.error('Error al eliminar consentimiento:', error)
      alert(
        'Error al eliminar el consentimiento: ' +
          (error.message || 'Error desconocido')
      )
    } finally {
      setDeleteLoading(null)
    }
  }

  return (
    <div className='admin-consentimientos-container'>
      <Header />
      <div className='admin-consentimientos-content'>
        <h1>Gestión de Consentimientos</h1>

        <div className='search-container'>
          <input
            type='text'
            placeholder='Buscar por nombre o email...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='search-input'
          />
        </div>

        {loading ? (
          <div className='loading'>Cargando consentimientos...</div>
        ) : error ? (
          <div className='error-message'>{error}</div>
        ) : (
          <>
            <div className='consentimientos-stats'>
              <p>Total de consentimientos: {filteredConsentimientos.length}</p>
              <p>
                Autorizan imagen:{' '}
                {filteredConsentimientos.filter((c) => c.autorizaImagen).length}
              </p>
              <p>
                No autorizan imagen:{' '}
                {
                  filteredConsentimientos.filter(
                    (c) => c.autorizaImagen === false
                  ).length
                }
              </p>
            </div>

            <div className='consentimientos-table-container'>
              <table className='consentimientos-table'>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Autoriza Imagen</th>
                    <th>Fecha de Aceptación</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredConsentimientos.length > 0 ? (
                    filteredConsentimientos.map((item) => (
                      <tr key={item._id}>
                        <td>{item.nombreUsuario}</td>
                        <td>{item.email}</td>
                        <td
                          className={
                            item.autorizaImagen ? 'autoriza' : 'no-autoriza'
                          }
                        >
                          {item.autorizaImagen ? 'SÍ' : 'NO'}
                        </td>
                        <td>{formatDate(item.fechaAceptacion)}</td>
                        <td>
                          <button
                            className='delete-button'
                            onClick={() => handleDeleteClick(item)}
                            disabled={deleteLoading === item._id}
                          >
                            {deleteLoading === item._id
                              ? 'Eliminando...'
                              : 'Eliminar'}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan='5' className='no-results'>
                        No se encontraron consentimientos
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {showConfirmDialog && (
        <div className='confirm-dialog-overlay'>
          <div className='confirm-dialog'>
            <h3>Confirmar eliminación</h3>
            <p>
              ¿Estás seguro de que deseas eliminar el consentimiento de{' '}
              <strong>{consentimientoToDelete?.nombreUsuario}</strong>?
            </p>
            <p>Esta acción no se puede deshacer.</p>

            <div className='confirm-dialog-buttons'>
              <button
                className='cancel-button'
                onClick={handleCancelDelete}
                disabled={deleteLoading}
              >
                Cancelar
              </button>
              <button
                className='confirm-button'
                onClick={handleConfirmDelete}
                disabled={deleteLoading}
              >
                {deleteLoading ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminConsentimientos
