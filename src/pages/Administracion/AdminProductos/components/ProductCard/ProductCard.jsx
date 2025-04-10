import { Edit2, Trash2, ToggleRight, ToggleLeft, ImageIcon } from 'lucide-react'
import './ProductCard.css'

const ProductoCard = ({ producto, onEdit, onDelete, onToggleEstado }) => {
  return (
    <div className='producto-card'>
      <div className='producto-imagen'>
        {producto.imagen ? (
          <img
            src={producto.imagen || '/placeholder.svg'}
            alt={producto.nombre}
            onError={(e) => {
              e.target.onerror = null
              e.target.src = '/placeholder.svg'
            }}
          />
        ) : (
          <div className='no-image'>
            <ImageIcon size={40} />
          </div>
        )}
      </div>
      <div className='producto-info'>
        <h3>{producto.nombre}</h3>
        <p className='marca'>Marca: {producto.marca}</p>
        <p className='precio'>${producto.precio.toFixed(2)}</p>
        <p className='stock'>Stock: {producto.stock}</p>
        <p className={`estado ${producto.estado}`}>{producto.estado}</p>
        {producto.destacado && (
          <span className='destacado-badge'>Destacado</span>
        )}
      </div>
      <div className='producto-actions'>
        <button
          className='btn-icon edit'
          onClick={() => onEdit(producto)}
          title='Editar producto'
        >
          <Edit2 size={16} />
        </button>
        <button
          className='btn-icon delete'
          onClick={() => onDelete(producto._id)}
          title='Eliminar producto'
        >
          <Trash2 size={16} />
        </button>
        <button
          className='btn-icon toggle'
          onClick={() => onToggleEstado(producto._id)}
          title={producto.estado === 'activo' ? 'Desactivar' : 'Activar'}
        >
          {producto.estado === 'activo' ? (
            <ToggleRight size={16} />
          ) : (
            <ToggleLeft size={16} />
          )}
        </button>
      </div>
    </div>
  )
}

export default ProductoCard
