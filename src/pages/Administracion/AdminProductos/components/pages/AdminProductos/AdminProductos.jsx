import { Plus } from 'lucide-react'
import { useProductOperations } from '../../../hooks/use-product-operations'
import Header from '../../../../../../components/Header/Header'
import ProductoCard from '../../ProductCard/ProductCard'
import ProductoForm from '../../ProductoForm/ProductoForm'
import ProductoFilters from '../../ProductoFilters/ProductoFilters'
import Pagination from '../../Pagination/Pagination'
import Alert from '../../Alert/Alert'
import Button from '../../../../../../components/Button/Button'
import { useNavigate } from 'react-router-dom'
import './AdminProductos.css'

const AdminProductos = () => {
  const navigate = useNavigate()
  const {
    state,
    handleBuscarProductos,
    handleImageChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    toggleEstado,
    openModal,
    closeModal,
    setSearchTerm,
    setCategoriaFiltro,
    setCurrentPage,
    updateForm
  } = useProductOperations()

  return (
    <div className='admin-productos'>
      <Header />

      <Alert type='success' message={state.successMessage} />
      <Alert type='error' message={state.error} />

      <div className='headerproductos'>
        <Button
          variant='secondary'
          onClick={() => navigate('/administracion')}
          leftIcon={<span>←</span>}
        >
          Volver a Administracion
        </Button>

        <h1>Administración de Productos</h1>
        <Button
          className='btn-primary'
          variant='primary'
          size='md'
          onClick={openModal}
          leftIcon={<Plus size={20} />}
        >
          Nuevo Producto
        </Button>
      </div>

      <ProductoFilters
        searchTerm={state.searchTerm}
        categoriaFiltro={state.categoriaFiltro}
        onSearchChange={setSearchTerm}
        onCategoriaChange={setCategoriaFiltro}
        onSearch={handleBuscarProductos}
      />

      {state.loading ? (
        <div className='loading'>
          <div className='spinner'></div>
          <p>Cargando...</p>
        </div>
      ) : (
        <>
          <div className='productos-grid'>
            {state.productos.length === 0 ? (
              <div className='no-products'>
                <p>No se encontraron productos</p>
              </div>
            ) : (
              state.productos.map((producto) => (
                <ProductoCard
                  key={producto._id}
                  producto={producto}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onToggleEstado={toggleEstado}
                />
              ))
            )}
          </div>

          <Pagination
            currentPage={state.currentPage}
            totalPages={state.totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      {state.modalOpen && (
        <ProductoForm
          form={state.form}
          formErrors={state.formErrors}
          previewImage={state.previewImage}
          loading={state.loading}
          editando={state.editando}
          onSubmit={handleSubmit}
          onClose={closeModal}
          onUpdateForm={updateForm}
          onImageChange={handleImageChange}
        />
      )}
    </div>
  )
}

export default AdminProductos
