import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../../../../../../components/Header/Header'
import MedidasTab from '../components/Medidas/MedidasTab'
import ProgresoTab from '../components/Progreso/ProgresoTab'
import ObjetivosTab from '../components/Objetivos/ObjetivosTab'
import Alert from '../components/ui/Alert/Alert'
import Tabs from '../components/ui/Tabs/Tabs'
import usePhysicalStats from '../hooks/usePhysicalStats'
import Button from '../../../../../../../components/Button/Button'
import './Aspecto.css'

const Aspecto = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('medidas')
  const [message, setMessage] = useState({ text: '', type: '' })

  const {
    loading,
    error,
    fetchLatestStats,
    fetchStatsHistory,
    fetchObjetivos,
    clearError
  } = usePhysicalStats()

  useEffect(() => {
    const loadInitialData = async () => {
      await fetchLatestStats()
    }

    loadInitialData()
  }, [fetchLatestStats])

  useEffect(() => {
    const loadTabData = async () => {
      switch (activeTab) {
        case 'medidas':
          await fetchLatestStats()
          break
        case 'progreso':
          await fetchStatsHistory()
          break
        case 'objetivos':
          await fetchObjetivos()
          break
        default:
          break
      }
    }

    loadTabData()
  }, [activeTab, fetchLatestStats, fetchStatsHistory, fetchObjetivos])

  useEffect(() => {
    if (error) {
      setMessage({ text: error, type: 'error' })

      setTimeout(() => {
        clearError()
        setMessage({ text: '', type: '' })
      }, 5000)
    }
  }, [error, clearError])

  const tabs = [
    { id: 'medidas', label: 'Medidas' },
    { id: 'progreso', label: 'Progreso' },
    { id: 'objetivos', label: 'Objetivos' }
  ]

  const handleMessage = (msg) => {
    setMessage(msg)

    setTimeout(() => {
      setMessage({ text: '', type: '' })
    }, 5000)
  }

  const handleTabChange = (tabId) => {
    console.log('Cambiando a pestaña:', tabId)
    setActiveTab(tabId)
  }

  return (
    <div className='stats-container'>
      <Header />
      <div className='stats-header'>
        <Button
          variant='secondary'
          onClick={() => navigate('/dashboard')}
          leftIcon={<span>←</span>}
        >
          Volver al Dashboard
        </Button>
        <h2 className='tituloaspecto'>Estadísticas Físicas</h2>
      </div>

      {message.text && (
        <Alert
          type={message.type}
          onClose={() => setMessage({ text: '', type: '' })}
        >
          {message.text}
        </Alert>
      )}

      <Tabs tabs={tabs} activeTab={activeTab} onChange={handleTabChange} />

      {loading && <div className='loading-spinner'>Cargando...</div>}

      <div className='tab-content'>
        {activeTab === 'medidas' && <MedidasTab onMessage={handleMessage} />}

        {activeTab === 'progreso' && <ProgresoTab />}

        {activeTab === 'objetivos' && (
          <ObjetivosTab onMessage={handleMessage} />
        )}
      </div>
    </div>
  )
}

export default Aspecto
