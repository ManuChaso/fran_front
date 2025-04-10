import { useState } from 'react'
import { Plus } from 'lucide-react'
import Header from '../../../components/Header/Header'
import ClaseCard from './components/ClaseCard'
import ClaseModal from './components/ClaseModal'
import { useClases } from './hooks/useClases'
import { useFiltros } from './hooks/useFiltros'
import { organizarClasesPorDia } from './utils/organizarClases'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import Button from '../../../components/Button/Button'
import { useNavigate } from 'react-router-dom'
import './AdminClases.css'

const AdminClases = () => {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState(null)

  const {
    clases,
    loading,
    error,
    success,
    setError,
    setSuccess,
    fetchClases,
    handleDelete
  } = useClases()

  const {
    diaSeleccionado,
    setDiaSeleccionado,
    diasSemana,
    fechasUnicas,
    clasesFiltradas
  } = useFiltros(clases)

  const clasesPorDia = organizarClasesPorDia(clasesFiltradas)

  const handleEdit = (clase) => {
    const modoEdicion = clase.esFechaEspecifica ? 'fecha' : 'semanal'

    setFormData({
      nombre: clase.nombre || '',
      descripcion: clase.descripcion || '',
      horarios: [
        {
          hora: clase.horario || '',
          duracion: clase.duracion?.toString() || '60'
        }
      ],
      capacidadMaxima: clase.capacidadMaxima || '',
      categoria: clase.categoria || '',
      nivel: clase.nivel || '',
      ubicacion: clase.ubicacion || '',
      diaSemana: clase.diaSemana || '',
      fecha: clase.fecha ? clase.fecha.split('T')[0] : '',
      imagen: null,
      entrenador: clase.entrenador?._id || '',
      modoCreacion: modoEdicion,
      previewUrl: clase.imagen || null
    })

    setEditingId(clase._id)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setFormData(null)
    setEditingId(null)
    setError(null)
  }

  const renderClasesPorDia = () => {
    return Object.entries(clasesPorDia).map(([clave, clases]) => {
      let titulo = clave

      if (clave.startsWith('fecha_')) {
        const fechaStr = clave.replace('fecha_', '')
        try {
          const fechaObj = new Date(fechaStr)
          titulo = format(fechaObj, "d 'de' MMMM 'de' yyyy", { locale: es })
        } catch (error) {
          console.error('Error al formatear fecha:', error)
        }
      } else if (diasSemana.includes(clave)) {
        titulo = clave.charAt(0).toUpperCase() + clave.slice(1)
      }

      return (
        <div key={clave} className='dia-clases'>
          <h2 className='dia-titulo'>{titulo}</h2>
          <div className='clases-grid'>
            {clases.map((clase) => (
              <ClaseCard
                key={clase._id}
                clase={clase}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )
    })
  }

  return (
    <div className='admin-clases'>
      <Header />
      <div className='headerclases'>
        <Button
          variant='secondary'
          onClick={() => navigate('/administracion')}
          leftIcon={<span>←</span>}
        >
          Volver a Administracion
        </Button>
        <h1>Administración de Clases</h1>
        <Button
          className='btn-primary'
          variant='primary'
          size='md'
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus size={20} />}
        >
          Nueva Clase
        </Button>
      </div>

      {error && (
        <div className='error-message'>
          <span>⚠️</span> {error}
        </div>
      )}

      {success && (
        <div className='success-message'>
          <span>✓</span> {success}
        </div>
      )}

      <div className='filtro-dias'>
        <span>Filtrar por:</span>
        <select
          value={diaSeleccionado}
          onChange={(e) => setDiaSeleccionado(e.target.value)}
          className='filtro-select'
        >
          <option value='todos'>Todos</option>
          <optgroup label='Días de la semana'>
            {diasSemana.map((dia) => (
              <option key={dia} value={dia}>
                {dia.charAt(0).toUpperCase() + dia.slice(1)}
              </option>
            ))}
          </optgroup>
          {fechasUnicas.length > 0 && (
            <optgroup label='Fechas específicas'>
              {fechasUnicas.map((fecha) => (
                <option key={fecha.valor} value={`fecha_${fecha.valor}`}>
                  {fecha.texto}
                </option>
              ))}
            </optgroup>
          )}
        </select>
      </div>

      {loading && !isModalOpen && (
        <div className='loading-container'>
          <div className='loading-spinner'></div>
          <p>Cargando...</p>
        </div>
      )}

      {Object.keys(clasesPorDia).length > 0 ? (
        renderClasesPorDia()
      ) : (
        <div className='no-clases'>
          <p>
            No hay clases{' '}
            {diaSeleccionado !== 'todos'
              ? `para ${
                  diaSeleccionado.startsWith('fecha_')
                    ? 'esta fecha'
                    : diaSeleccionado
                }`
              : 'creadas'}
            .
          </p>
          <p>Haz clic en "Nueva Clase" para crear la primera.</p>
        </div>
      )}

      {isModalOpen && (
        <ClaseModal
          onClose={handleCloseModal}
          onSuccess={() => {
            fetchClases()
            handleCloseModal()
          }}
          editingId={editingId}
          initialData={formData}
          setError={setError}
          setSuccess={setSuccess}
        />
      )}
    </div>
  )
}

export default AdminClases
