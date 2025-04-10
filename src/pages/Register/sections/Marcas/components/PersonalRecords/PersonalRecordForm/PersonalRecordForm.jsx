import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './PersonalRecordForm.css'

const CATEGORIAS = [
  'Levantamiento Olímpico',
  'Levantamiento de Potencia',
  'Gimnástico',
  'Cardio',
  'Otro'
]

const EJERCICIOS_COMUNES = [
  'Sentadilla (Back Squat)',
  'Press de Banca',
  'Peso Muerto',
  'Clean & Jerk',
  'Snatch',
  'Overhead Squat',
  'Front Squat',
  'Thruster',
  'Pull-up',
  'Muscle-up'
]

const PersonalRecordForm = ({
  record,
  onSubmit,
  onCancel,
  isEditing = false
}) => {
  const [formData, setFormData] = useState({
    ejercicio: '',
    peso: '',
    repeticiones: '1',
    fecha: new Date().toISOString().split('T')[0],
    categoria: 'Levantamiento de Potencia'
  })
  const [errors, setErrors] = useState({})
  const [customExercise, setCustomExercise] = useState(false)

  useEffect(() => {
    if (record) {
      setFormData({
        ejercicio: record.ejercicio || '',
        peso: record.peso || '',
        repeticiones: record.repeticiones || '1',
        fecha: record.fecha || new Date().toISOString().split('T')[0],
        categoria: record.categoria || 'Levantamiento de Potencia'
      })

      setCustomExercise(!EJERCICIOS_COMUNES.includes(record.ejercicio))
    }
  }, [record])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      })
    }
  }

  const handleExerciseChange = (e) => {
    const value = e.target.value

    if (value === 'custom') {
      setCustomExercise(true)
      setFormData({
        ...formData,
        ejercicio: ''
      })
    } else {
      setCustomExercise(false)
      setFormData({
        ...formData,
        ejercicio: value
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.ejercicio.trim()) {
      newErrors.ejercicio = 'El ejercicio es obligatorio'
    }

    if (!formData.peso.trim()) {
      newErrors.peso = 'El peso es obligatorio'
    } else if (isNaN(formData.peso) || Number.parseFloat(formData.peso) <= 0) {
      newErrors.peso = 'El peso debe ser un número positivo'
    }

    if (
      formData.repeticiones &&
      (isNaN(formData.repeticiones) ||
        Number.parseInt(formData.repeticiones) <= 0)
    ) {
      newErrors.repeticiones = 'Las repeticiones deben ser un número positivo'
    }

    if (!formData.fecha) {
      newErrors.fecha = 'La fecha es obligatoria'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <div className='record-form-overlay'>
      <div className='record-form-container'>
        <form onSubmit={handleSubmit} className='record-form'>
          <h3>
            {isEditing ? 'Editar Marca Personal' : 'Nueva Marca Personal'}
          </h3>

          <div className='form-group'>
            <label htmlFor='ejercicio-select'>Ejercicio</label>
            {!customExercise ? (
              <select
                id='ejercicio-select'
                value={formData.ejercicio}
                onChange={handleExerciseChange}
                className={errors.ejercicio ? 'error' : ''}
              >
                <option value=''>Selecciona un ejercicio</option>
                {EJERCICIOS_COMUNES.map((ejercicio) => (
                  <option key={ejercicio} value={ejercicio}>
                    {ejercicio}
                  </option>
                ))}
                <option value='custom'>Otro (personalizado)</option>
              </select>
            ) : (
              <input
                type='text'
                id='ejercicio'
                name='ejercicio'
                value={formData.ejercicio}
                onChange={handleChange}
                placeholder='Escribe el nombre del ejercicio'
                className={errors.ejercicio ? 'error' : ''}
              />
            )}
            {customExercise && (
              <button
                type='button'
                className='select-from-list-btn'
                onClick={() => setCustomExercise(false)}
              >
                Seleccionar de la lista
              </button>
            )}
            {errors.ejercicio && (
              <span className='error-message'>{errors.ejercicio}</span>
            )}
          </div>

          <div className='form-row'>
            <div className='form-group'>
              <label htmlFor='peso'>Peso (kg)</label>
              <input
                type='number'
                id='peso'
                name='peso'
                value={formData.peso}
                onChange={handleChange}
                min='0'
                step='0.5'
                className={errors.peso ? 'error' : ''}
              />
              {errors.peso && (
                <span className='error-message'>{errors.peso}</span>
              )}
            </div>

            <div className='form-group'>
              <label htmlFor='repeticiones'>Repeticiones</label>
              <input
                type='number'
                id='repeticiones'
                name='repeticiones'
                value={formData.repeticiones}
                onChange={handleChange}
                min='1'
                className={errors.repeticiones ? 'error' : ''}
              />
              {errors.repeticiones && (
                <span className='error-message'>{errors.repeticiones}</span>
              )}
            </div>
          </div>

          <div className='form-group'>
            <label htmlFor='categoria'>Categoría</label>
            <select
              id='categoria'
              name='categoria'
              value={formData.categoria}
              onChange={handleChange}
            >
              {CATEGORIAS.map((categoria) => (
                <option key={categoria} value={categoria}>
                  {categoria}
                </option>
              ))}
            </select>
          </div>

          <div className='form-group'>
            <label htmlFor='fecha'>Fecha</label>
            <input
              type='date'
              id='fecha'
              name='fecha'
              value={formData.fecha}
              onChange={handleChange}
              max={new Date().toISOString().split('T')[0]}
              className={errors.fecha ? 'error' : ''}
            />
            {errors.fecha && (
              <span className='error-message'>{errors.fecha}</span>
            )}
          </div>

          <div className='form-actions'>
            <button type='button' onClick={onCancel} className='cancel-btn'>
              Cancelar
            </button>
            <button type='submit' className='submit-btn'>
              {isEditing ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

PersonalRecordForm.propTypes = {
  record: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isEditing: PropTypes.bool
}

export default PersonalRecordForm
