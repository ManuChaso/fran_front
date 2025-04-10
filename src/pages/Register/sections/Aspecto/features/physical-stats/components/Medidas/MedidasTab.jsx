import { useState, useEffect } from 'react'
import usePhysicalStats from '../../hooks/usePhysicalStats'
import './MedidasTab.css'

const MedidasTab = ({ onMessage }) => {
  const { stats, loading, saveStats, fetchLatestStats } = usePhysicalStats()

  const [formData, setFormData] = useState({
    altura: '',
    peso: '',
    grasa: '',
    musculo: '',
    pecho: '',
    cintura: '',
    cadera: '',
    biceps: '',
    muslos: ''
  })

  useEffect(() => {
    const loadLatestStats = async () => {
      try {
        await fetchLatestStats()
      } catch (error) {
        console.error('Error al cargar las últimas medidas:', error)
      }
    }

    loadLatestStats()
  }, [fetchLatestStats])

  useEffect(() => {
    if (stats) {
      console.log('Medidas cargadas:', stats)
      setFormData({
        altura: stats.altura || '',
        peso: stats.peso || '',
        grasa: stats.grasa || '',
        musculo: stats.musculo || '',
        pecho: stats.pecho || '',
        cintura: stats.cintura || '',
        cadera: stats.cadera || '',
        biceps: stats.biceps || '',
        muslos: stats.muslos || ''
      })
    }
  }, [stats])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const numericData = Object.entries(formData).reduce((acc, [key, value]) => {
      acc[key] = value === '' ? '' : Number(value)
      return acc
    }, {})

    const result = await saveStats(numericData)

    onMessage({
      text: result.message,
      type: result.success ? 'success' : 'error'
    })
  }

  return (
    <div className='medidas-card'>
      <form onSubmit={handleSubmit} className='medidas-form'>
        <div className='medidas-grid'>
          <div className='form-group'>
            <label htmlFor='altura'>Altura (cm)</label>
            <input
              type='number'
              id='altura'
              name='altura'
              value={formData.altura}
              onChange={handleChange}
              placeholder='175'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='peso'>Peso (kg)</label>
            <input
              type='number'
              id='peso'
              name='peso'
              value={formData.peso}
              onChange={handleChange}
              placeholder='75'
              step='0.1'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='grasa'>% Grasa Corporal</label>
            <input
              type='number'
              id='grasa'
              name='grasa'
              value={formData.grasa}
              onChange={handleChange}
              placeholder='15'
              step='0.1'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='musculo'>% Masa Muscular</label>
            <input
              type='number'
              id='musculo'
              name='musculo'
              value={formData.musculo}
              onChange={handleChange}
              placeholder='40'
              step='0.1'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='pecho'>Pecho (cm)</label>
            <input
              type='number'
              id='pecho'
              name='pecho'
              value={formData.pecho}
              onChange={handleChange}
              placeholder='100'
              step='0.1'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='cintura'>Cintura (cm)</label>
            <input
              type='number'
              id='cintura'
              name='cintura'
              value={formData.cintura}
              onChange={handleChange}
              placeholder='80'
              step='0.1'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='cadera'>Cadera (cm)</label>
            <input
              type='number'
              id='cadera'
              name='cadera'
              value={formData.cadera}
              onChange={handleChange}
              placeholder='95'
              step='0.1'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='biceps'>Bíceps (cm)</label>
            <input
              type='number'
              id='biceps'
              name='biceps'
              value={formData.biceps}
              onChange={handleChange}
              placeholder='35'
              step='0.1'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='muslos'>Muslos (cm)</label>
            <input
              type='number'
              id='muslos'
              name='muslos'
              value={formData.muslos}
              onChange={handleChange}
              placeholder='55'
              step='0.1'
            />
          </div>
        </div>

        <button type='submit' className='save-btn' disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar Medidas'}
        </button>
      </form>
    </div>
  )
}

export default MedidasTab
