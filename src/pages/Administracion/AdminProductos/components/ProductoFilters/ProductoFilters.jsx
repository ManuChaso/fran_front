import { Search, Filter } from 'lucide-react'
import './ProductoFilters.css'

const CATEGORIAS = [
  'suplementos',
  'ropa',
  'equipamiento',
  'accesorios',
  'otros'
]

const ProductoFilters = ({
  searchTerm,
  categoriaFiltro,
  onSearchChange,
  onCategoriaChange,
  onSearch
}) => {
  return (
    <div className='filters'>
      <div className='search-box'>
        <input
          className='inputproductos'
          type='text'
          placeholder='Buscar productos...'
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSearch()}
        />
        <Search size={20} className='search-icon' onClick={onSearch} />
      </div>

      <div className='category-filter'>
        <Filter size={20} />
        <select
          value={categoriaFiltro}
          onChange={(e) => onCategoriaChange(e.target.value)}
        >
          <option value=''>Todas las categorías</option>
          {CATEGORIAS.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ProductoFilters
