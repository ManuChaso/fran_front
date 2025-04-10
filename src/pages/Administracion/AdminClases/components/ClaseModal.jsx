import { useState } from 'react'
import { X, PlusCircle, Trash } from 'lucide-react'
import { useFormData } from '../hooks/useFormData'
import { useEntrenadores } from '../hooks/useEntrenadores'
import { guardarClase } from '../services/clasesService'
//import { handleClaseSubmit } from '../utils/HandleSubmit'

const ClaseModal = ({
  onClose,
  onSuccess,
  editingId,
  initialData,
  setError,
  setSuccess
}) => {
  const [loading, setLoading] = useState(false)
  const { entrenadores } = useEntrenadores()

  const {
    formData,
    setFormData,
    previewUrl,
    setPreviewUrl,
    modoCreacion,
    setModoCreacion,
    handleImageChange,
    addHorario,
    removeHorario,
    updateHorario
  } = useFormData(initialData)

  const categorias = [
    'yoga',
    'pilates',
    'cardio',
    'fuerza',
    'crossfit',
    'hiit',
    'baile',
    'otro'
  ]

  const niveles = ['principiante', 'intermedio', 'avanzado']

  const diasSemana = [
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado',
    'domingo'
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const result = await guardarClase(formData, editingId, modoCreacion)

      if (result.success) {
        setSuccess(
          `${result.clasesCreadas} horarios de clase ${
            editingId ? 'actualizados' : 'creados'
          } con éxito`
        )
        setTimeout(() => setSuccess(null), 3000)
        onSuccess()
      }

      if (result.clasesConError > 0) {
        setError(
          `Hubo errores al crear ${result.clasesConError} horarios. Por favor, inténtalo de nuevo.`
        )
      }
    } catch (error) {
      console.error('Error al guardar la clase:', error)
      setError(error.message || 'Error al guardar la clase')
    } finally {
      setLoading(false)
    }
  }
  /*const handleSubmit = async (e) => {
    return handleClaseSubmit({
      e,
      formData,
      editingId,
      modoCreacion,
      onSuccess,
      setLoading,
      setError,
      setSuccess
    })
  }*/

  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <div className='modal-header'>
          <h2>{editingId ? 'Editar Clase' : 'Nueva Clase'}</h2>
          <button onClick={onClose} className='btn-icon'>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='nombre'>Nombre</label>
            <input
              type='text'
              id='nombre'
              value={formData.nombre}
              onChange={(e) =>
                setFormData({ ...formData, nombre: e.target.value })
              }
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor='descripcion'>Descripción</label>
            <textarea
              id='descripcion'
              value={formData.descripcion}
              onChange={(e) =>
                setFormData({ ...formData, descripcion: e.target.value })
              }
              required
            />
          </div>

          <div className='form-row'>
            <div className='form-group'>
              <label htmlFor='categoria'>Categoría</label>
              <select
                id='categoria'
                value={formData.categoria}
                onChange={(e) =>
                  setFormData({ ...formData, categoria: e.target.value })
                }
                required
              >
                <option value=''>Seleccionar categoría</option>
                {categorias.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className='form-group'>
              <label htmlFor='nivel'>Nivel</label>
              <select
                id='nivel'
                value={formData.nivel}
                onChange={(e) =>
                  setFormData({ ...formData, nivel: e.target.value })
                }
                required
              >
                <option value=''>Seleccionar nivel</option>
                {niveles.map((niv) => (
                  <option key={niv} value={niv}>
                    {niv.charAt(0).toUpperCase() + niv.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className='form-group modo-creacion'>
            <label>Modo de creación</label>
            <div className='radio-group'>
              <label>
                <input
                  type='radio'
                  name='modoCreacion'
                  value='semanal'
                  checked={modoCreacion === 'semanal'}
                  onChange={() => setModoCreacion('semanal')}
                />
                <p>Día de la semana (recurrente)</p>
              </label>
              <label>
                <input
                  type='radio'
                  name='modoCreacion'
                  value='fecha'
                  checked={modoCreacion === 'fecha'}
                  onChange={() => setModoCreacion('fecha')}
                />
                <p>Fecha específica</p>
              </label>
            </div>
          </div>

          {modoCreacion === 'semanal' ? (
            <div className='form-group'>
              <label htmlFor='diaSemana'>Día de la semana</label>
              <select
                id='diaSemana'
                value={formData.diaSemana}
                onChange={(e) =>
                  setFormData({ ...formData, diaSemana: e.target.value })
                }
                required={modoCreacion === 'semanal'}
              >
                <option value=''>Seleccionar día</option>
                {diasSemana.map((dia) => (
                  <option key={dia} value={dia}>
                    {dia.charAt(0).toUpperCase() + dia.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className='form-group'>
              <label htmlFor='fecha'>Fecha específica</label>
              <input
                type='date'
                id='fecha'
                value={formData.fecha}
                onChange={(e) =>
                  setFormData({ ...formData, fecha: e.target.value })
                }
                required={modoCreacion === 'fecha'}
              />
            </div>
          )}

          <div className='form-group'>
            <div className='horarios-header'>
              <label>Horarios</label>
              <button
                type='button'
                className='btn-add-horario'
                onClick={addHorario}
                disabled={editingId}
              >
                <PlusCircle size={16} />
                <span>Añadir horario</span>
              </button>
            </div>

            <div className='horarios-container'>
              {formData.horarios.map((horario, index) => (
                <div key={index} className='horario-item'>
                  <div className='horario-inputs'>
                    <div className='horario-input'>
                      <label htmlFor={`horario-${index}`}>Hora</label>
                      <input
                        type='time'
                        id={`horario-${index}`}
                        value={horario.hora}
                        onChange={(e) =>
                          updateHorario(index, 'hora', e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className='horario-input'>
                      <label htmlFor={`duracion-${index}`}>
                        Duración (min)
                      </label>
                      <input
                        type='number'
                        id={`duracion-${index}`}
                        min='15'
                        max='180'
                        value={horario.duracion}
                        onChange={(e) =>
                          updateHorario(index, 'duracion', e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  {formData.horarios.length > 1 && !editingId && (
                    <button
                      type='button'
                      className='btn-remove-horario'
                      onClick={() => removeHorario(index)}
                    >
                      <Trash size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className='form-row'>
            <div className='form-group'>
              <label htmlFor='capacidadMaxima'>Capacidad Máxima</label>
              <input
                type='number'
                id='capacidadMaxima'
                min='1'
                max='50'
                value={formData.capacidadMaxima}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    capacidadMaxima: e.target.value
                  })
                }
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='ubicacion'>Ubicación</label>
              <input
                type='text'
                id='ubicacion'
                value={formData.ubicacion}
                onChange={(e) =>
                  setFormData({ ...formData, ubicacion: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className='form-group'>
            <label htmlFor='entrenador'>Entrenador (opcional)</label>
            <select
              id='entrenador'
              value={formData.entrenador}
              onChange={(e) =>
                setFormData({ ...formData, entrenador: e.target.value })
              }
            >
              <option value=''>Seleccionar entrenador</option>
              {entrenadores.map((entrenador) => (
                <option key={entrenador._id} value={entrenador._id}>
                  {entrenador.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className='form-group'>
            <label htmlFor='imagen'>Imagen</label>
            {previewUrl && (
              <div className='imagen-preview'>
                <img
                  src={previewUrl || '/placeholder.svg'}
                  alt='Vista previa'
                />
              </div>
            )}
            <input
              type='file'
              id='imagen'
              accept='image/*'
              onChange={handleImageChange}
            />
          </div>

          <div className='modal-footer'>
            <button type='button' className='btn-secondary' onClick={onClose}>
              Cancelar
            </button>
            <button type='submit' className='btn-primary' disabled={loading}>
              {loading ? 'Guardando...' : editingId ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ClaseModal
