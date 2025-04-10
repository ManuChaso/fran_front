import { X } from 'lucide-react'
import Button from '../../../../../components/Button/Button'
import './ProductoForm.css'

const CATEGORIAS = [
  'suplementos',
  'ropa',
  'equipamiento',
  'accesorios',
  'otros'
]

const ProductoForm = ({
  form,
  formErrors,
  previewImage,
  loading,
  editando,
  onSubmit,
  onClose,
  onUpdateForm,
  onImageChange
}) => {
  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <div className='modal-header'>
          <h2>{editando ? 'Editar Producto' : 'Nuevo Producto'}</h2>
          <Button
            className='btn-icon'
            variant='outline'
            size='icon'
            onClick={onClose}
            rightIcon={<X size={20} />}
          />
        </div>

        <form onSubmit={onSubmit}>
          <div className='form-grid'>
            <div className='form-group'>
              <label htmlFor='nombre'>Nombre</label>
              <input
                type='text'
                id='nombre'
                name='nombre'
                value={form.nombre}
                onChange={(e) => onUpdateForm('nombre', e.target.value)}
                className={formErrors.nombre ? 'error' : ''}
              />
              {formErrors.nombre && (
                <span className='error-message'>{formErrors.nombre}</span>
              )}
            </div>

            <div className='form-group'>
              <label htmlFor='marca'>Marca</label>
              <input
                type='text'
                id='marca'
                name='marca'
                value={form.marca}
                onChange={(e) => onUpdateForm('marca', e.target.value)}
                className={formErrors.marca ? 'error' : ''}
              />
              {formErrors.marca && (
                <span className='error-message'>{formErrors.marca}</span>
              )}
            </div>

            <div className='form-group'>
              <label htmlFor='precio'>Precio</label>
              <input
                type='number'
                id='precio'
                name='precio'
                value={form.precio}
                onChange={(e) => onUpdateForm('precio', e.target.value)}
                min='0'
                step='0.01'
                className={formErrors.precio ? 'error' : ''}
              />
              {formErrors.precio && (
                <span className='error-message'>{formErrors.precio}</span>
              )}
            </div>

            <div className='form-group'>
              <label htmlFor='stock'>Stock</label>
              <input
                type='number'
                id='stock'
                name='stock'
                value={form.stock}
                onChange={(e) => onUpdateForm('stock', e.target.value)}
                min='0'
                className={formErrors.stock ? 'error' : ''}
              />
              {formErrors.stock && (
                <span className='error-message'>{formErrors.stock}</span>
              )}
            </div>

            <div className='form-group'>
              <label htmlFor='categoria'>Categoría</label>
              <select
                id='categoria'
                name='categoria'
                value={form.categoria}
                onChange={(e) => onUpdateForm('categoria', e.target.value)}
                className={formErrors.categoria ? 'error' : ''}
              >
                <option value=''>Selecciona una categoría</option>
                {CATEGORIAS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
              {formErrors.categoria && (
                <span className='error-message'>{formErrors.categoria}</span>
              )}
            </div>

            <div className='form-group'>
              <label htmlFor='estado'>Estado</label>
              <select
                id='estado'
                name='estado'
                value={form.estado}
                onChange={(e) => onUpdateForm('estado', e.target.value)}
              >
                <option value='activo'>Activo</option>
                <option value='inactivo'>Inactivo</option>
              </select>
            </div>
          </div>

          <div className='form-group'>
            <label htmlFor='descripcion'>Descripción</label>
            <textarea
              id='descripcion'
              name='descripcion'
              value={form.descripcion}
              onChange={(e) => onUpdateForm('descripcion', e.target.value)}
              className={formErrors.descripcion ? 'error' : ''}
            ></textarea>
            {formErrors.descripcion && (
              <span className='error-message'>{formErrors.descripcion}</span>
            )}
          </div>

          <div className='form-group checkbox'>
            <label>
              <input
                type='checkbox'
                name='destacado'
                checked={form.destacado}
                onChange={(e) => onUpdateForm('destacado', e.target.checked)}
              />
              Producto destacado
            </label>
          </div>

          <div className='form-group'>
            <label htmlFor='imagen'>
              Imagen
              {editando &&
                !form.imagen &&
                ' (Dejar vacío para mantener la imagen actual)'}
            </label>
            <input
              type='file'
              id='imagen'
              name='imagen'
              accept='image/*'
              onChange={onImageChange}
              className='file-input'
            />
            {previewImage && (
              <div className='image-preview'>
                <img
                  src={previewImage || '/placeholder.svg'}
                  alt='Vista previa'
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = '/placeholder.svg'
                  }}
                />
              </div>
            )}
          </div>

          <div className='modal-footer'>
            <Button
              className='btn-secondary'
              variant='secondary'
              size='md'
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </Button>

            <button type='submit' className='btn-primary' disabled={loading}>
              {loading ? (
                <>
                  <div className='spinner-small'></div>
                  {editando ? 'Actualizando...' : 'Creando...'}
                </>
              ) : editando ? (
                'Actualizar'
              ) : (
                'Crear'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductoForm
