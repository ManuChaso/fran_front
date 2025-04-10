import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../../../../components/Header/Header'
import Button from '../../../../../components/Button/Button'
import PersonalRecordForm from '../components/PersonalRecords/PersonalRecordForm/PersonalRecordForm'
import PersonalRecordsList from '../components/PersonalRecords/PersonalRecordList/PersonalRecordList'
import PersonalRecordsChart from '../components/PersonalRecords/PersonalRecordChart/PersonalRecordChart'
import { toast } from 'react-toastify'
import './Marcas.css'

const PersonalRecordsPage = () => {
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)
  const [records, setRecords] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('all')
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [uniqueExercises, setUniqueExercises] = useState([])

  const fetchRecords = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/personal-records', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (!response.ok) {
        throw new Error('Error al cargar las marcas personales')
      }

      const data = await response.json()
      setRecords(data.data)
    } catch (err) {
      setError(err.message)
      toast.error('Error al cargar las marcas personales')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchUniqueExercises = async () => {
    try {
      const response = await fetch('/api/personal-records/exercises', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (!response.ok) {
        throw new Error('Error al cargar los ejercicios')
      }

      const data = await response.json()
      setUniqueExercises(data.data)
    } catch (err) {
      console.error('Error al cargar ejercicios:', err)
    }
  }

  useEffect(() => {
    fetchRecords()
    fetchUniqueExercises()
  }, [])

  const handleAddRecord = async (record) => {
    try {
      const response = await fetch('/api/personal-records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(record)
      })

      if (!response.ok) {
        throw new Error('Error al guardar la marca personal')
      }

      const data = await response.json()
      setRecords([data.data, ...records])
      setShowForm(false)
      toast.success('¡Marca personal guardada con éxito!')

      if (!uniqueExercises.includes(record.ejercicio)) {
        setUniqueExercises([...uniqueExercises, record.ejercicio])
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  const handleDeleteRecord = async (id) => {
    try {
      const response = await fetch(`/api/personal-records/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (!response.ok) {
        throw new Error('Error al eliminar la marca personal')
      }

      setRecords(records.filter((record) => record._id !== id))
      toast.success('Marca personal eliminada')
    } catch (err) {
      toast.error(err.message)
    }
  }

  const handleEditRecord = async (id, updatedRecord) => {
    try {
      const response = await fetch(`/api/personal-records/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updatedRecord)
      })

      if (!response.ok) {
        throw new Error('Error al actualizar la marca personal')
      }

      const data = await response.json()

      setRecords((prevRecords) =>
        prevRecords.map((record) => (record._id === id ? data.data : record))
      )

      setSelectedRecord(null)
      toast.success('Marca personal actualizada')

      if (
        updatedRecord.ejercicio !== records.find((r) => r._id === id)?.ejercicio
      ) {
        fetchUniqueExercises()
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  const recordsByCategory = records.reduce((acc, record) => {
    const category = record.categoria || 'Sin categoría'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(record)
    return acc
  }, {})

  return (
    <div className='personal-records-container'>
      <Header />

      <div className='personal-records-header'>
        <Button
          variant='secondary'
          onClick={() => navigate('/dashboard')}
          leftIcon={<span>←</span>}
        >
          Volver al Dashboard
        </Button>
        <h2>Marcas Personales</h2>
        <button className='add-record-btn' onClick={() => setShowForm(true)}>
          + Nueva Marca
        </button>
      </div>

      <div className='records-tabs'>
        <button
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          Todas
        </button>

        {Object.keys(recordsByCategory).map((category) => (
          <button
            key={category}
            className={`tab-btn ${activeTab === category ? 'active' : ''}`}
            onClick={() => setActiveTab(category)}
          >
            {category}
          </button>
        ))}

        <button
          className={`tab-btn ${activeTab === 'chart' ? 'active' : ''}`}
          onClick={() => setActiveTab('chart')}
        >
          Gráficos
        </button>
      </div>

      <div className='records-content'>
        {isLoading ? (
          <div className='loading-container'>
            <div className='loading-text'>Cargando marcas personales...</div>
          </div>
        ) : error ? (
          <div className='error-container'>
            <p>Error: {error}</p>
            <Button onClick={fetchRecords}>Reintentar</Button>
          </div>
        ) : (
          <>
            {activeTab === 'chart' ? (
              <PersonalRecordsChart
                records={records}
                uniqueExercises={uniqueExercises}
              />
            ) : (
              <PersonalRecordsList
                records={
                  activeTab === 'all'
                    ? records
                    : recordsByCategory[activeTab] || []
                }
                onDelete={handleDeleteRecord}
                onEdit={(record) => setSelectedRecord(record)}
              />
            )}
          </>
        )}
      </div>

      {showForm && (
        <PersonalRecordForm
          onSubmit={handleAddRecord}
          onCancel={() => setShowForm(false)}
        />
      )}

      {selectedRecord && (
        <PersonalRecordForm
          record={selectedRecord}
          onSubmit={(updatedRecord) =>
            handleEditRecord(selectedRecord._id, updatedRecord)
          }
          onCancel={() => setSelectedRecord(null)}
          isEditing={true}
        />
      )}
    </div>
  )
}

export default PersonalRecordsPage
