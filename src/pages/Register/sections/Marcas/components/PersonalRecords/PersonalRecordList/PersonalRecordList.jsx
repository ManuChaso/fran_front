import { useState } from 'react'
import PropTypes from 'prop-types'
import './PersonalRecordList.css'

const PersonalRecordsList = ({ records, onDelete, onEdit }) => {
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [viewDetails, setViewDetails] = useState(null)

  const getCategoryClass = (category) => {
    const classes = {
      'Levantamiento Olímpico': 'category-olympic',
      'Levantamiento de Potencia': 'category-power',
      Gimnástico: 'category-gymnastic',
      Cardio: 'category-cardio',
      Otro: 'category-other'
    }
    return classes[category] || 'category-other'
  }

  const handleDelete = (id) => {
    setConfirmDelete(null)
    onDelete(id)
  }

  if (records.length === 0) {
    return (
      <div className='no-records'>
        <div className='no-records-icon'>🏋️‍♂️</div>
        <h3>No hay marcas personales registradas aún</h3>
        <p>
          Comienza a registrar tus logros para hacer seguimiento de tu progreso.
        </p>
      </div>
    )
  }

  return (
    <>
      <div className='records-list'>
        {records.map((record) => (
          <div key={record._id} className='record-card'>
            <div className='record-info'>
              <div className='record-header'>
                <h3>{record.ejercicio}</h3>
                <span
                  className={`record-category ${getCategoryClass(
                    record.categoria
                  )}`}
                >
                  {record.categoria}
                </span>
              </div>
              <p className='record-details'>
                <span className='record-weight'>{record.peso}kg</span>
                {record.repeticiones && record.repeticiones !== '1' && (
                  <span className='record-reps'>
                    x {record.repeticiones} rep
                  </span>
                )}
                <span className='record-date'>
                  {new Date(record.fecha).toLocaleDateString()}
                </span>
              </p>
            </div>
            <div className='record-actions'>
              <button
                className='view-btn'
                onClick={() => setViewDetails(record)}
                title='Ver detalles'
              >
                👁️
              </button>
              <button
                className='edit-btn'
                onClick={() => onEdit(record)}
                title='Editar'
              >
                ✏️
              </button>
              <button
                className='delete-btn'
                onClick={() => setConfirmDelete(record._id)}
                title='Eliminar'
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>

      {confirmDelete && (
        <div className='confirm-modal-overlay'>
          <div className='confirm-modal'>
            <h4>Confirmar eliminación</h4>
            <p>
              ¿Estás seguro de que quieres eliminar esta marca personal? Esta
              acción no se puede deshacer.
            </p>
            <div className='confirm-actions'>
              <button
                className='cancel-btn'
                onClick={() => setConfirmDelete(null)}
              >
                Cancelar
              </button>
              <button
                className='delete-confirm-btn'
                onClick={() => handleDelete(confirmDelete)}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {viewDetails && (
        <div className='details-modal-overlay'>
          <div className='details-modal'>
            <h4>Detalles de la Marca Personal</h4>

            <div className='details-content'>
              <div className='details-row'>
                <div className='details-label'>Ejercicio:</div>
                <div className='details-value'>{viewDetails.ejercicio}</div>
              </div>

              <div className='details-row'>
                <div className='details-label'>Categoría:</div>
                <div className='details-value'>
                  <span
                    className={`record-category ${getCategoryClass(
                      viewDetails.categoria
                    )}`}
                  >
                    {viewDetails.categoria}
                  </span>
                </div>
              </div>

              <div className='details-row'>
                <div className='details-label'>Peso:</div>
                <div className='details-value'>{viewDetails.peso} kg</div>
              </div>

              <div className='details-row'>
                <div className='details-label'>Repeticiones:</div>
                <div className='details-value'>
                  {viewDetails.repeticiones || '1'}
                </div>
              </div>

              <div className='details-row'>
                <div className='details-label'>Fecha:</div>
                <div className='details-value'>
                  {new Date(viewDetails.fecha).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className='details-actions'>
              <button
                className='edit-btn-large'
                onClick={() => {
                  onEdit(viewDetails)
                  setViewDetails(null)
                }}
              >
                Editar
              </button>
              <button
                className='close-btn'
                onClick={() => setViewDetails(null)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

PersonalRecordsList.propTypes = {
  records: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
}

export default PersonalRecordsList
