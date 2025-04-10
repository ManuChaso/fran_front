import { Pencil, Trash2, Clock, Users2, Calendar } from 'lucide-react'
import { formatFecha } from '../utils/formatters'

const ClaseCard = ({ clase, onEdit, onDelete }) => {
  return (
    <div className='clase-card'>
      <div className='clase-header'>
        <h3>{clase.nombre}</h3>
        <div className='clase-badges'>
          <span className={`nivel-badge ${clase.nivel}`}>
            {clase.nivel.charAt(0).toUpperCase() + clase.nivel.slice(1)}
          </span>
          <span className='categoria-badge'>{clase.categoria}</span>
        </div>
      </div>

      <div className='clase-info'>
        <div className='clase-horario'>
          <Clock size={16} />
          <span>
            {clase.horario} ({clase.duracion} min)
          </span>
        </div>
        <div className='clase-capacidad'>
          <Users2 size={16} />
          <span>
            {clase.inscritos.length}/{clase.capacidadMaxima}
          </span>
        </div>
        {clase.fecha && (
          <div className='clase-fecha'>
            <Calendar size={16} />
            <span>{formatFecha(clase.fecha)}</span>
          </div>
        )}
        {clase.entrenador && (
          <div className='clase-entrenador'>
            <span>Entrenador: {clase.entrenador.nombre || 'No asignado'}</span>
          </div>
        )}
      </div>

      <p className='clase-descripcion'>{clase.descripcion}</p>

      <div className='clase-actions'>
        <button
          onClick={() => onEdit(clase)}
          className='btn-icon edit'
          title='Editar'
        >
          <Pencil size={16} />
          <span>Editar</span>
        </button>
        <button
          onClick={() => onDelete(clase._id)}
          className='btn-icon delete'
          title='Eliminar'
        >
          <Trash2 size={16} />
          <span>Eliminar</span>
        </button>
      </div>
    </div>
  )
}

export default ClaseCard
