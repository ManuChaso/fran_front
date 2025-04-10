/*import { useReducer, useEffect, useCallback } from 'react'
import {
  obtenerProductosAdmin,
  buscarProductosAdmin,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  cambiarEstadoProducto
} from '../../../../services/Api/index'
import {
  productReducer,
  initialState,
  ACTIONS
} from '../components/reducers/productReducer'

const ITEMS_PER_PAGE = 8

export function useProductOperations() {
  const [state, dispatch] = useReducer(productReducer, initialState)
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (state.successMessage || state.error) {
      const timer = setTimeout(() => {
        dispatch({ type: ACTIONS.RESET_MESSAGES })
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [state.successMessage, state.error])

  useEffect(() => {
    if (token) {
      cargarProductos()
    }
  }, [state.currentPage, state.categoriaFiltro, token])

  const cargarProductos = useCallback(async () => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true })
    try {
      const response = await obtenerProductosAdmin(
        token,
        state.currentPage,
        ITEMS_PER_PAGE,
        state.categoriaFiltro
      )
      dispatch({ type: ACTIONS.SET_PRODUCTOS, payload: response.data })
      dispatch({
        type: ACTIONS.SET_TOTAL_PAGES,
        payload: response.pagination.pages
      })
    } catch (error) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: 'Error al obtener productos: ' + error.message
      })
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false })
    }
  }, [token, state.currentPage, state.categoriaFiltro])

  const handleBuscarProductos = useCallback(async () => {
    if (!state.searchTerm) {
      cargarProductos()
      return
    }

    dispatch({ type: ACTIONS.SET_LOADING, payload: true })
    try {
      const response = await buscarProductosAdmin(token, state.searchTerm)
      dispatch({ type: ACTIONS.SET_PRODUCTOS, payload: response.data })
      dispatch({ type: ACTIONS.SET_TOTAL_PAGES, payload: 1 })
    } catch (error) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: 'Error en la búsqueda: ' + error.message
      })
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false })
    }
  }, [token, state.searchTerm, cargarProductos])

  const validateForm = useCallback(() => {
    const errors = {}
    if (!state.form.nombre) errors.nombre = 'El nombre es requerido'
    if (!state.form.descripcion)
      errors.descripcion = 'La descripción es requerida'
    if (!state.form.precio || state.form.precio <= 0)
      errors.precio = 'El precio debe ser mayor a 0'
    if (!state.form.categoria) errors.categoria = 'La categoría es requerida'
    if (!state.form.stock || state.form.stock < 0)
      errors.stock = 'El stock debe ser mayor o igual a 0'
    if (!state.form.marca) errors.marca = 'La marca es requerida'

    dispatch({ type: ACTIONS.SET_FORM_ERRORS, payload: errors })
    return Object.keys(errors).length === 0
  }, [state.form])

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        dispatch({
          type: ACTIONS.SET_ERROR,
          payload: 'La imagen no debe superar los 5MB'
        })
        return
      }

      if (!file.type.startsWith('image/')) {
        dispatch({
          type: ACTIONS.SET_ERROR,
          payload: 'El archivo debe ser una imagen'
        })
        return
      }

      dispatch({ type: ACTIONS.UPDATE_FORM, payload: { imagen: file } })
      const reader = new FileReader()
      reader.onloadend = () => {
        dispatch({ type: ACTIONS.SET_PREVIEW_IMAGE, payload: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      if (!validateForm()) return

      dispatch({ type: ACTIONS.SET_LOADING, payload: true })
      dispatch({ type: ACTIONS.SET_ERROR, payload: '' })

      try {
        if (state.editando) {
          const response = await actualizarProducto(
            token,
            state.editando,
            state.form,
            state.form.imagen
          )
          if (response.success) {
            dispatch({
              type: ACTIONS.SET_SUCCESS_MESSAGE,
              payload: 'Producto actualizado correctamente'
            })
          }
        } else {
          const response = await crearProducto(
            token,
            state.form,
            state.form.imagen
          )
          if (response.success) {
            dispatch({
              type: ACTIONS.SET_SUCCESS_MESSAGE,
              payload: 'Producto creado correctamente'
            })
          }
        }

        dispatch({ type: ACTIONS.RESET_FORM })
        cargarProductos()
        dispatch({ type: ACTIONS.SET_MODAL_OPEN, payload: false })
      } catch (error) {
        dispatch({
          type: ACTIONS.SET_ERROR,
          payload: error.message || 'Error al guardar el producto'
        })
      } finally {
        dispatch({ type: ACTIONS.SET_LOADING, payload: false })
      }
    },
    [token, state.editando, state.form, validateForm, cargarProductos]
  )

  const handleEdit = useCallback((producto) => {
    dispatch({
      type: ACTIONS.SET_FORM,
      payload: {
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        categoria: producto.categoria,
        stock: producto.stock,
        marca: producto.marca,
        estado: producto.estado,
        destacado: producto.destacado,
        imagen: null
      }
    })
    dispatch({ type: ACTIONS.SET_PREVIEW_IMAGE, payload: producto.imagen })
    dispatch({ type: ACTIONS.SET_EDITANDO, payload: producto._id })
    dispatch({ type: ACTIONS.SET_MODAL_OPEN, payload: true })
    dispatch({ type: ACTIONS.SET_FORM_ERRORS, payload: {} })
  }, [])

  const handleDelete = useCallback(
    async (id) => {
      if (!window.confirm('¿Estás seguro de eliminar este producto?')) return

      dispatch({ type: ACTIONS.SET_LOADING, payload: true })
      try {
        const response = await eliminarProducto(token, id)
        if (response.success) {
          dispatch({
            type: ACTIONS.SET_SUCCESS_MESSAGE,
            payload: 'Producto eliminado correctamente'
          })
          cargarProductos()
        }
      } catch (error) {
        dispatch({
          type: ACTIONS.SET_ERROR,
          payload: 'Error al eliminar el producto: ' + error.message
        })
      } finally {
        dispatch({ type: ACTIONS.SET_LOADING, payload: false })
      }
    },
    [token, cargarProductos]
  )

  const toggleEstado = useCallback(
    async (id) => {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true })
      try {
        const response = await cambiarEstadoProducto(token, id)
        if (response.success) {
          dispatch({
            type: ACTIONS.SET_SUCCESS_MESSAGE,
            payload: `Estado del producto ${
              response.data.estado === 'activo' ? 'activado' : 'desactivado'
            }`
          })
          cargarProductos()
        }
      } catch (error) {
        dispatch({
          type: ACTIONS.SET_ERROR,
          payload: 'Error al cambiar estado: ' + error.message
        })
      } finally {
        dispatch({ type: ACTIONS.SET_LOADING, payload: false })
      }
    },
    [token, cargarProductos]
  )

  const resetForm = useCallback(() => {
    dispatch({ type: ACTIONS.RESET_FORM })
  }, [])

  const openModal = useCallback(() => {
    resetForm()
    dispatch({ type: ACTIONS.SET_MODAL_OPEN, payload: true })
  }, [resetForm])

  const closeModal = useCallback(() => {
    resetForm()
    dispatch({ type: ACTIONS.SET_MODAL_OPEN, payload: false })
  }, [resetForm])

  const setSearchTerm = useCallback((value) => {
    dispatch({ type: ACTIONS.SET_SEARCH_TERM, payload: value })
  }, [])

  const setCategoriaFiltro = useCallback((value) => {
    dispatch({ type: ACTIONS.SET_CATEGORIA_FILTRO, payload: value })
  }, [])

  const setCurrentPage = useCallback((value) => {
    dispatch({ type: ACTIONS.SET_CURRENT_PAGE, payload: value })
  }, [])

  const updateForm = useCallback((field, value) => {
    dispatch({ type: ACTIONS.UPDATE_FORM, payload: { [field]: value } })
  }, [])

  return {
    state,
    cargarProductos,
    handleBuscarProductos,
    handleImageChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    toggleEstado,
    resetForm,
    openModal,
    closeModal,
    setSearchTerm,
    setCategoriaFiltro,
    setCurrentPage,
    updateForm
  }
}*/

import { useReducer, useEffect, useCallback } from 'react'
import {
  obtenerProductosAdmin,
  buscarProductosAdmin,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  cambiarEstadoProducto
} from '../../../../services/Api/index'
import {
  productReducer,
  initialState,
  ACTIONS
} from '../components/reducers/productReducer'
import { handleProductSubmit } from '../../../../utils/HandleSubmit'

const ITEMS_PER_PAGE = 8

export function useProductOperations() {
  const [state, dispatch] = useReducer(productReducer, initialState)
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (state.successMessage || state.error) {
      const timer = setTimeout(() => {
        dispatch({ type: ACTIONS.RESET_MESSAGES })
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [state.successMessage, state.error])

  useEffect(() => {
    if (token) {
      cargarProductos()
    }
  }, [state.currentPage, state.categoriaFiltro, token])

  const cargarProductos = useCallback(async () => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true })
    try {
      const response = await obtenerProductosAdmin(
        token,
        state.currentPage,
        ITEMS_PER_PAGE,
        state.categoriaFiltro
      )
      dispatch({ type: ACTIONS.SET_PRODUCTOS, payload: response.data })
      dispatch({
        type: ACTIONS.SET_TOTAL_PAGES,
        payload: response.pagination.pages
      })
    } catch (error) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: 'Error al obtener productos: ' + error.message
      })
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false })
    }
  }, [token, state.currentPage, state.categoriaFiltro])

  const handleBuscarProductos = useCallback(async () => {
    if (!state.searchTerm) {
      cargarProductos()
      return
    }

    dispatch({ type: ACTIONS.SET_LOADING, payload: true })
    try {
      const response = await buscarProductosAdmin(token, state.searchTerm)
      dispatch({ type: ACTIONS.SET_PRODUCTOS, payload: response.data })
      dispatch({ type: ACTIONS.SET_TOTAL_PAGES, payload: 1 })
    } catch (error) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: 'Error en la búsqueda: ' + error.message
      })
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false })
    }
  }, [token, state.searchTerm, cargarProductos])

  const validateForm = useCallback(() => {
    const errors = {}
    if (!state.form.nombre) errors.nombre = 'El nombre es requerido'
    if (!state.form.descripcion)
      errors.descripcion = 'La descripción es requerida'
    if (!state.form.precio || state.form.precio <= 0)
      errors.precio = 'El precio debe ser mayor a 0'
    if (!state.form.categoria) errors.categoria = 'La categoría es requerida'
    if (!state.form.stock || state.form.stock < 0)
      errors.stock = 'El stock debe ser mayor o igual a 0'
    if (!state.form.marca) errors.marca = 'La marca es requerida'

    dispatch({ type: ACTIONS.SET_FORM_ERRORS, payload: errors })
    return Object.keys(errors).length === 0
  }, [state.form])

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        dispatch({
          type: ACTIONS.SET_ERROR,
          payload: 'La imagen no debe superar los 5MB'
        })
        return
      }

      if (!file.type.startsWith('image/')) {
        dispatch({
          type: ACTIONS.SET_ERROR,
          payload: 'El archivo debe ser una imagen'
        })
        return
      }

      dispatch({ type: ACTIONS.UPDATE_FORM, payload: { imagen: file } })
      const reader = new FileReader()
      reader.onloadend = () => {
        dispatch({ type: ACTIONS.SET_PREVIEW_IMAGE, payload: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const handleSubmit = useCallback(
    async (e) => {
      return handleProductSubmit({
        e,
        state,
        token,
        validateForm,
        dispatch,
        cargarProductos,
        ACTIONS,
        actualizarProducto,
        crearProducto
      })
    },
    [token, state, validateForm, cargarProductos]
  )

  const handleEdit = useCallback((producto) => {
    dispatch({
      type: ACTIONS.SET_FORM,
      payload: {
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        categoria: producto.categoria,
        stock: producto.stock,
        marca: producto.marca,
        estado: producto.estado,
        destacado: producto.destacado,
        imagen: null
      }
    })
    dispatch({ type: ACTIONS.SET_PREVIEW_IMAGE, payload: producto.imagen })
    dispatch({ type: ACTIONS.SET_EDITANDO, payload: producto._id })
    dispatch({ type: ACTIONS.SET_MODAL_OPEN, payload: true })
    dispatch({ type: ACTIONS.SET_FORM_ERRORS, payload: {} })
  }, [])

  const handleDelete = useCallback(
    async (id) => {
      if (!window.confirm('¿Estás seguro de eliminar este producto?')) return

      dispatch({ type: ACTIONS.SET_LOADING, payload: true })
      try {
        const response = await eliminarProducto(token, id)
        if (response.success) {
          dispatch({
            type: ACTIONS.SET_SUCCESS_MESSAGE,
            payload: 'Producto eliminado correctamente'
          })
          cargarProductos()
        }
      } catch (error) {
        dispatch({
          type: ACTIONS.SET_ERROR,
          payload: 'Error al eliminar el producto: ' + error.message
        })
      } finally {
        dispatch({ type: ACTIONS.SET_LOADING, payload: false })
      }
    },
    [token, cargarProductos]
  )

  const toggleEstado = useCallback(
    async (id) => {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true })
      try {
        const response = await cambiarEstadoProducto(token, id)
        if (response.success) {
          dispatch({
            type: ACTIONS.SET_SUCCESS_MESSAGE,
            payload: `Estado del producto ${
              response.data.estado === 'activo' ? 'activado' : 'desactivado'
            }`
          })
          cargarProductos()
        }
      } catch (error) {
        dispatch({
          type: ACTIONS.SET_ERROR,
          payload: 'Error al cambiar estado: ' + error.message
        })
      } finally {
        dispatch({ type: ACTIONS.SET_LOADING, payload: false })
      }
    },
    [token, cargarProductos]
  )

  const resetForm = useCallback(() => {
    dispatch({ type: ACTIONS.RESET_FORM })
  }, [])

  const openModal = useCallback(() => {
    resetForm()
    dispatch({ type: ACTIONS.SET_MODAL_OPEN, payload: true })
  }, [resetForm])

  const closeModal = useCallback(() => {
    resetForm()
    dispatch({ type: ACTIONS.SET_MODAL_OPEN, payload: false })
  }, [resetForm])

  const setSearchTerm = useCallback((value) => {
    dispatch({ type: ACTIONS.SET_SEARCH_TERM, payload: value })
  }, [])

  const setCategoriaFiltro = useCallback((value) => {
    dispatch({ type: ACTIONS.SET_CATEGORIA_FILTRO, payload: value })
  }, [])

  const setCurrentPage = useCallback((value) => {
    dispatch({ type: ACTIONS.SET_CURRENT_PAGE, payload: value })
  }, [])

  const updateForm = useCallback((field, value) => {
    dispatch({ type: ACTIONS.UPDATE_FORM, payload: { [field]: value } })
  }, [])

  return {
    state,
    cargarProductos,
    handleBuscarProductos,
    handleImageChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    toggleEstado,
    resetForm,
    openModal,
    closeModal,
    setSearchTerm,
    setCategoriaFiltro,
    setCurrentPage,
    updateForm
  }
}
