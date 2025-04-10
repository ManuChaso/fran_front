import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllMedicalInfo } from '../../../services/Api/index'
import Header from '../../../components/Header/Header'
import Button from '../../../components/Button/Button'
import './MedicalinfoList.css'

const MedicalInfoList = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [medicalInfoList, setMedicalInfoList] = useState([])
  const [error, setError] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)

  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false)
  const [bloodTypeFilter, setBloodTypeFilter] = useState('')

  useEffect(() => {
    const fetchMedicalInfo = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('token')
        const rol = localStorage.getItem('rol')?.toLowerCase().trim()

        if (rol !== 'admin' && rol !== 'administrador' && rol !== 'creador') {
          setError('No tienes permisos para acceder a esta información')
          setLoading(false)
          return
        }

        const data = await getAllMedicalInfo(token)
        setMedicalInfoList(data)
      } catch (error) {
        console.error('Error al obtener información médica:', error)
        setError(
          'Error al cargar la información médica. Verifica que tengas permisos de administrador.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchMedicalInfo()
  }, [])

  const filteredUsers = useMemo(() => {
    if (!medicalInfoList.length) return []

    return medicalInfoList.filter((info) => {
      if (!info.user) return false

      const userName = info.user.nombre ? info.user.nombre.toLowerCase() : ''
      const userEmail = info.user.email ? info.user.email.toLowerCase() : ''
      const searchLower = searchTerm.toLowerCase()

      const matchesSearch =
        (userName && userName.includes(searchLower)) ||
        (userEmail && userEmail.includes(searchLower))

      if (!searchTerm && !bloodTypeFilter) return true

      const matchesBloodType =
        !bloodTypeFilter || info.bloodType === bloodTypeFilter

      if (filterType === 'name') {
        return userName && userName.includes(searchLower) && matchesBloodType
      } else if (filterType === 'email') {
        return userEmail && userEmail.includes(searchLower) && matchesBloodType
      } else {
        return matchesSearch && matchesBloodType
      }
    })
  }, [medicalInfoList, searchTerm, filterType, bloodTypeFilter])

  const handleUserSelect = (userId) => {
    if (!userId) {
      console.error('ID de usuario no válido')
      return
    }

    const user = medicalInfoList.find(
      (info) => info.user && info.user._id === userId
    )

    if (!user) {
      console.error(
        `No se encontró información médica para el usuario con ID: ${userId}`
      )
      return
    }

    setSelectedUser(user)
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'No registrado'
    return new Date(dateString).toLocaleDateString()
  }

  const clearFilters = () => {
    setSearchTerm('')
    setFilterType('all')
    setBloodTypeFilter('')
  }

  return (
    <div className='medical-info-admin-container'>
      <Header />
      <div className='admin-header'>
        <Button
          variant='secondary'
          onClick={() => navigate('/administracion')}
          leftIcon={<span>←</span>}
        >
          Volver a Administracion
        </Button>

        <h1>Información Médica de Usuarios</h1>
      </div>

      {error && <div className='error-message'>{error}</div>}

      <div className='search-container'>
        <div className='search-box'>
          <input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Buscar por nombre o email...'
            className='search-input'
          />
          <button
            className='search-toggle'
            onClick={() => setIsAdvancedSearch(!isAdvancedSearch)}
          >
            {isAdvancedSearch ? '▲' : '▼'}
          </button>
        </div>

        {isAdvancedSearch && (
          <div className='advanced-search'>
            <div className='filter-group'>
              <label>Buscar en:</label>
              <div className='filter-options'>
                <button
                  className={`filter-btn ${
                    filterType === 'all' ? 'active' : ''
                  }`}
                  onClick={() => setFilterType('all')}
                >
                  Todos
                </button>
                <button
                  className={`filter-btn ${
                    filterType === 'name' ? 'active' : ''
                  }`}
                  onClick={() => setFilterType('name')}
                >
                  Nombre
                </button>
                <button
                  className={`filter-btn ${
                    filterType === 'email' ? 'active' : ''
                  }`}
                  onClick={() => setFilterType('email')}
                >
                  Email
                </button>
              </div>
            </div>

            <div className='filter-group'>
              <label>Tipo de sangre:</label>
              <select
                value={bloodTypeFilter}
                onChange={(e) => setBloodTypeFilter(e.target.value)}
                className='blood-type-select'
              >
                <option value=''>Todos</option>
                <option value='A+'>A+</option>
                <option value='A-'>A-</option>
                <option value='B+'>B+</option>
                <option value='B-'>B-</option>
                <option value='AB+'>AB+</option>
                <option value='AB-'>AB-</option>
                <option value='O+'>O+</option>
                <option value='O-'>O-</option>
              </select>
            </div>

            <button className='clear-filters' onClick={clearFilters}>
              Limpiar filtros
            </button>
          </div>
        )}

        <div className='search-results'>
          <span className='results-count'>
            {filteredUsers.length}{' '}
            {filteredUsers.length === 1
              ? 'usuario encontrado'
              : 'usuarios encontrados'}
          </span>
        </div>
      </div>

      {loading ? (
        <div className='loading'>Cargando información médica...</div>
      ) : (
        <div className='medical-info-grid'>
          <div className='users-list'>
            <h2>Usuarios</h2>
            {filteredUsers.length === 0 ? (
              <p className='no-results'>
                No se encontraron usuarios con esos criterios
              </p>
            ) : (
              <ul>
                {filteredUsers.map((info) => (
                  <li
                    key={info._id}
                    className={
                      selectedUser && selectedUser._id === info._id
                        ? 'selected'
                        : ''
                    }
                    onClick={() =>
                      info.user && info.user._id
                        ? handleUserSelect(info.user._id)
                        : null
                    }
                  >
                    <div className='user-list-item'>
                      {info.user.avatar && (
                        <div
                          className='user-avatar'
                          style={{
                            backgroundImage: `url(${info.user.avatar})`
                          }}
                        ></div>
                      )}
                      <div className='user-info'>
                        <span className='user-name'>
                          {info.user.nombre || 'Sin nombre'}
                        </span>
                        <span className='user-email'>{info.user.email}</span>
                      </div>
                      {info.bloodType && (
                        <span className='blood-type-badge'>
                          {info.bloodType}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className='user-details'>
            {selectedUser ? (
              <div className='medical-card'>
                <div className='user-header'>
                  {selectedUser.user.avatar && (
                    <div
                      className='detail-avatar'
                      style={{
                        backgroundImage: `url(${selectedUser.user.avatar})`
                      }}
                    ></div>
                  )}
                  <h2>
                    Información de{' '}
                    {selectedUser.user.nombre || selectedUser.user.email}
                  </h2>
                </div>

                <div className='info-section'>
                  <h3>Información Básica</h3>
                  <div className='info-grid'>
                    <div className='info-item'>
                      <span className='label'>Tipo de Sangre:</span>
                      <span className='value'>
                        {selectedUser.bloodType || 'No registrado'}
                      </span>
                    </div>
                    <div className='info-item'>
                      <span className='label'>Último Chequeo:</span>
                      <span className='value'>
                        {formatDate(selectedUser.lastCheckup)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className='info-section'>
                  <h3>Condiciones Médicas</h3>
                  <div className='info-grid'>
                    <div className='info-item full-width'>
                      <span className='label'>Alergias:</span>
                      <span className='value'>
                        {selectedUser.allergies || 'Ninguna registrada'}
                      </span>
                    </div>
                    <div className='info-item full-width'>
                      <span className='label'>Condiciones:</span>
                      <span className='value'>
                        {selectedUser.conditions || 'Ninguna registrada'}
                      </span>
                    </div>
                    <div className='info-item full-width'>
                      <span className='label'>Medicamentos:</span>
                      <span className='value'>
                        {selectedUser.medications || 'Ninguno registrado'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className='info-section'>
                  <h3>Contactos de Emergencia</h3>
                  <div className='info-grid'>
                    <div className='info-item'>
                      <span className='label'>Contacto:</span>
                      <span className='value'>
                        {selectedUser.emergencyContact || 'No registrado'}
                      </span>
                    </div>
                    <div className='info-item'>
                      <span className='label'>Teléfono:</span>
                      <span className='value'>
                        {selectedUser.emergencyPhone || 'No registrado'}
                      </span>
                    </div>
                    <div className='info-item'>
                      <span className='label'>Médico:</span>
                      <span className='value'>
                        {selectedUser.doctorName || 'No registrado'}
                      </span>
                    </div>
                    <div className='info-item'>
                      <span className='label'>Teléfono Médico:</span>
                      <span className='value'>
                        {selectedUser.doctorPhone || 'No registrado'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className='select-user-message'>
                Selecciona un usuario para ver su información médica
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default MedicalInfoList
