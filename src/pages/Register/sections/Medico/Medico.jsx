import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  getUserMedicalInfo,
  saveMedicalInfo
} from '../../../../services/Api/index'
import Header from '../../../../components/Header/Header'
import Button from '../../../../components/Button/Button'
import handleSubmitHelper from '../../../../utils/HandleSubmit'
import './Medico.css'

const Medico = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '' })
  const [medicalInfo, setMedicalInfo] = useState({
    bloodType: '',
    allergies: '',
    conditions: '',
    medications: '',
    emergencyContact: '',
    emergencyPhone: '',
    lastCheckup: '',
    doctorName: '',
    doctorPhone: ''
  })

  useEffect(() => {
    const fetchMedicalInfo = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('token')

        const data = await getUserMedicalInfo(token)
        setMedicalInfo(data)
      } catch (error) {
        console.error('Error al obtener información médica:', error)
        setMessage({
          text: 'Error al cargar la información médica',
          type: 'error'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchMedicalInfo()
  }, [])

  /*const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const token = localStorage.getItem('token')

      await saveMedicalInfo(token, medicalInfo)

      setMessage({
        text: 'Información médica guardada correctamente',
        type: 'success'
      })

      setTimeout(() => {
        setMessage({ text: '', type: '' })
      }, 3000)
    } catch (error) {
      console.error('Error al guardar información médica:', error)
      setMessage({
        text: 'Error al guardar la información médica',
        type: 'error'
      })
    } finally {
      setLoading(false)
    }
  }*/
  const handleSubmit = (e) => {
    handleSubmitHelper(e, 'medico', { medicalInfo, setLoading, setMessage })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setMedicalInfo((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className='medico-container'>
      <Header />
      <div className='medico-header'>
        <h1>Información Médica</h1>

        <Button
          variant='secondary'
          onClick={() => navigate('/dashboard')}
          leftIcon={<span>←</span>}
        >
          Volver al Dashboard
        </Button>
      </div>
      {message.text && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      <form onSubmit={handleSubmit} className='medico-form'>
        <div className='form-section'>
          <h2>Información Básica</h2>
          <div className='form-grid'>
            <div className='form-group'>
              <label htmlFor='bloodType'>Tipo de Sangre</label>
              <select
                id='bloodType'
                name='bloodType'
                value={medicalInfo.bloodType}
                onChange={handleChange}
                required
              >
                <option value=''>Seleccionar...</option>
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

            <div className='form-group'>
              <label htmlFor='lastCheckup'>Último Chequeo Médico</label>
              <input
                type='date'
                id='lastCheckup'
                name='lastCheckup'
                value={medicalInfo.lastCheckup}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className='form-section'>
          <h2>Condiciones Médicas</h2>
          <div className='form-grid'>
            <div className='form-group full-width'>
              <label htmlFor='allergies'>Alergias</label>
              <textarea
                id='allergies'
                name='allergies'
                value={medicalInfo.allergies}
                onChange={handleChange}
                placeholder='Lista tus alergias...'
              />
            </div>

            <div className='form-group full-width'>
              <label htmlFor='conditions'>Condiciones Médicas</label>
              <textarea
                id='conditions'
                name='conditions'
                value={medicalInfo.conditions}
                onChange={handleChange}
                placeholder='Lista cualquier condición médica relevante...'
              />
            </div>

            <div className='form-group full-width'>
              <label htmlFor='medications'>Medicamentos</label>
              <textarea
                id='medications'
                name='medications'
                value={medicalInfo.medications}
                onChange={handleChange}
                placeholder='Lista los medicamentos que tomas regularmente...'
              />
            </div>
          </div>
        </div>

        <div className='form-section'>
          <h2>Contactos de Emergencia</h2>
          <div className='form-grid'>
            <div className='form-group'>
              <label htmlFor='emergencyContact'>Nombre del Contacto</label>
              <input
                type='text'
                id='emergencyContact'
                name='emergencyContact'
                value={medicalInfo.emergencyContact}
                onChange={handleChange}
                placeholder='Nombre completo'
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='emergencyPhone'>Teléfono de Emergencia</label>
              <input
                type='tel'
                id='emergencyPhone'
                name='emergencyPhone'
                value={medicalInfo.emergencyPhone}
                onChange={handleChange}
                placeholder='Número de teléfono'
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='doctorName'>Médico de Cabecera</label>
              <input
                type='text'
                id='doctorName'
                name='doctorName'
                value={medicalInfo.doctorName}
                onChange={handleChange}
                placeholder='Nombre del médico'
              />
            </div>

            <div className='form-group'>
              <label htmlFor='doctorPhone'>Teléfono del Médico</label>
              <input
                type='tel'
                id='doctorPhone'
                name='doctorPhone'
                value={medicalInfo.doctorPhone}
                onChange={handleChange}
                placeholder='Número de teléfono'
              />
            </div>
          </div>
        </div>

        <div className='form-actions'>
          <Button
            type='submit'
            variant='secondary'
            size='lg'
            isLoading={loading}
          >
            Guardar Información Médica
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Medico
