/*import { saveMedicalInfo } from '../services/Api'
import { registrarUsuario } from '../services/Api'
import {
  obtenerPerfilUsuario,
  actualizarPerfilUsuario,
  iniciarSesion
} from '../services/Api/index'

const handlers = {
  clase: async ({
    formData,
    editingId,
    modoCreacion,
    onSuccess,
    setLoading,
    setError,
    setSuccess
  }) => {
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
      setError(error.message || 'Error al guardar la clase')
    } finally {
      setLoading(false)
    }
  },

  producto: async ({
    state,
    token,
    validateForm,
    dispatch,
    cargarProductos
  }) => {
    if (!validateForm()) return
    dispatch({ type: ACTIONS.SET_LOADING, payload: true })
    dispatch({ type: ACTIONS.SET_ERROR, payload: '' })

    try {
      const response = state.editando
        ? await actualizarProducto(
            token,
            state.editando,
            state.form,
            state.form.imagen
          )
        : await crearProducto(token, state.form, state.form.imagen)

      if (response.success) {
        dispatch({
          type: ACTIONS.SET_SUCCESS_MESSAGE,
          payload: state.editando
            ? 'Producto actualizado correctamente'
            : 'Producto creado correctamente'
        })
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

  contacto: ({ setMensajeEnviado }) => {
    setMensajeEnviado(true)
  },

  editarUsuario: async ({
    user,
    avatarFile,
    isSubmitting,
    setIsSubmitting,
    navigate
  }) => {
    if (isSubmitting) return

    setIsSubmitting(true)

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/iniciar-sesion')
        return
      }

      const response = await actualizarPerfilUsuario(token, user, avatarFile)
      if (response.success) {
        localStorage.setItem('nombre', user.nombre)
        alert('Perfil actualizado con éxito')
        navigate('/dashboard')
      } else {
        alert(
          'Error al actualizar el perfil: ' +
            (response.message || 'Error desconocido')
        )
      }
    } catch (error) {
      console.error('Error completo:', error)
      alert('Error al actualizar el perfil: ' + error.message)
    } finally {
      setIsSubmitting(false)
    }
  },

  login: async ({ formData, setIsLoading, navigate }) => {
    setIsLoading(true)
    try {
      const response = await iniciarSesion(formData.email, formData.password)

      if (response && response.ok) {
        const { data } = response.data
        localStorage.setItem('token', data.token)
        localStorage.setItem('nombre', data.nombre)
        localStorage.setItem('rol', data.rol)
        setTimeout(() => navigate('/dashboard'), 500)
      } else {
        alert(response.data?.message || 'Error en el inicio de sesión')
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error)
      alert('Error en la conexión con el servidor')
    } finally {
      setIsLoading(false)
    }
  },

  registro: async ({
    formData,
    selectedImage,
    setIsLoading,
    setRegistroExitoso
  }) => {
    setIsLoading(true)
    try {
      const response = await registrarUsuario(formData, selectedImage)

      console.log('Respuesta completa del servidor:', response)

      if (!response) {
        throw new Error('Respuesta inválida del servidor')
      }

      if (response.ok && response.data) {
        console.log('Contenido del objeto data:', response.data)

        if (response.data.data) {
          console.log('Contenido del objeto data.data:', response.data.data)

          const userData = response.data.data

          if (userData.token) {
            localStorage.setItem('token', userData.token)
            localStorage.setItem('nombre', userData.nombre || formData.nombre)
            localStorage.setItem('rol', userData.rol || 'user')
            if (userData.avatar) {
              localStorage.setItem('avatar', userData.avatar)
            }

            console.log('Token guardado correctamente:', userData.token)
            setRegistroExitoso(true)
            return
          }
        }

        console.warn(
          'No se encontró un token en la respuesta, pero el registro fue exitoso'
        )
        setRegistroExitoso(true)
      } else {
        throw new Error(response.message || 'Error en el registro')
      }
    } catch (error) {
      console.error('Error en el registro:', error)
      alert(error.message || 'Error desconocido en el registro')
    } finally {
      setIsLoading(false)
    }
  },

  aspecto: async (params) => {
    console.log('Handling aspecto submission with params:', params)
  },

  marcas: async (params) => {
    console.log('Handling marcas submission with params:', params)
  },

  medico: async ({ medicalInfo, setLoading, setMessage }) => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No hay token de autenticación')
      }
      await saveMedicalInfo(token, medicalInfo)
      setMessage({
        text: 'Información médica guardada correctamente',
        type: 'success'
      })
      setTimeout(() => setMessage({ text: '', type: '' }), 3000)
    } catch (error) {
      setMessage({
        text: error.message || 'Error al guardar la información médica',
        type: 'error'
      })
    } finally {
      setLoading(false)
    }
  }
}

const handleSubmitHelper = async (e, type, params) => {
  e.preventDefault()

  if (handlers[type]) {
    return handlers[type](params)
  } else {
    console.error(`handleSubmitHelper: Tipo desconocido "${type}"`)
  }
}

export default handleSubmitHelper*/
import { saveMedicalInfo } from '../services/Api'
import { registrarUsuario } from '../services/Api'
import { actualizarPerfilUsuario, iniciarSesion } from '../services/Api/index'

export const handleProductSubmit = async ({
  e,
  state,
  token,
  validateForm,
  dispatch,
  cargarProductos,
  ACTIONS,
  actualizarProducto,
  crearProducto
}) => {
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
      const response = await crearProducto(token, state.form, state.form.imagen)
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
}

const handlers = {
  clase: async ({
    formData,
    editingId,
    modoCreacion,
    onSuccess,
    setLoading,
    setError,
    setSuccess
  }) => {
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
      setError(error.message || 'Error al guardar la clase')
    } finally {
      setLoading(false)
    }
  },

  producto: async ({
    state,
    token,
    validateForm,
    dispatch,
    cargarProductos,
    ACTIONS,
    actualizarProducto,
    crearProducto
  }) => {
    if (!validateForm()) return
    dispatch({ type: ACTIONS.SET_LOADING, payload: true })
    dispatch({ type: ACTIONS.SET_ERROR, payload: '' })

    try {
      const response = state.editando
        ? await actualizarProducto(
            token,
            state.editando,
            state.form,
            state.form.imagen
          )
        : await crearProducto(token, state.form, state.form.imagen)

      if (response.success) {
        dispatch({
          type: ACTIONS.SET_SUCCESS_MESSAGE,
          payload: state.editando
            ? 'Producto actualizado correctamente'
            : 'Producto creado correctamente'
        })
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

  contacto: ({ setMensajeEnviado }) => {
    setMensajeEnviado(true)
  },

  editarUsuario: async ({
    user,
    avatarFile,
    isSubmitting,
    setIsSubmitting,
    navigate
  }) => {
    if (isSubmitting) return

    setIsSubmitting(true)

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/iniciar-sesion')
        return
      }

      const response = await actualizarPerfilUsuario(token, user, avatarFile)
      if (response.success) {
        localStorage.setItem('nombre', user.nombre)
        alert('Perfil actualizado con éxito')
        navigate('/dashboard')
      } else {
        alert(
          'Error al actualizar el perfil: ' +
            (response.message || 'Error desconocido')
        )
      }
    } catch (error) {
      console.error('Error completo:', error)
      alert('Error al actualizar el perfil: ' + error.message)
    } finally {
      setIsSubmitting(false)
    }
  },

  login: async ({ formData, setIsLoading, navigate }) => {
    setIsLoading(true)
    try {
      const response = await iniciarSesion(formData.email, formData.password)

      if (response && response.ok) {
        const { data } = response.data
        localStorage.setItem('token', data.token)
        localStorage.setItem('nombre', data.nombre)
        localStorage.setItem('rol', data.rol)
        setTimeout(() => navigate('/dashboard'), 500)
      } else {
        alert(response.data?.message || 'Error en el inicio de sesión')
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error)
      alert('Error en la conexión con el servidor')
    } finally {
      setIsLoading(false)
    }
  },

  registro: async ({
    formData,
    selectedImage,
    setIsLoading,
    setRegistroExitoso
  }) => {
    console.log('Iniciando registro con formData:', formData)
    console.log('Imagen seleccionada:', selectedImage ? 'Sí' : 'No')

    setIsLoading(true)
    try {
      const response = await registrarUsuario(formData, selectedImage)

      console.log('Respuesta completa del servidor:', response)

      if (!response) {
        throw new Error('Respuesta inválida del servidor')
      }

      if (response.ok && response.data) {
        console.log('Contenido del objeto data:', response.data)

        const userData = response.data.data || response.data
        console.log('Contenido de userData:', userData)

        if (userData._id) {
          localStorage.setItem('user', JSON.stringify({ _id: userData._id }))

          localStorage.setItem('userId', userData._id)

          localStorage.setItem('token', userData.token)
          localStorage.setItem('nombre', userData.nombre || formData.nombre)
          localStorage.setItem('rol', userData.rol || 'user')

          if (userData.avatar) {
            localStorage.setItem('avatar', userData.avatar)
          }

          console.log('Token y userId guardados correctamente')
          setRegistroExitoso(true)
          return
        }

        console.warn(
          'No se encontró un _id en la respuesta, pero el registro fue exitoso'
        )
        setRegistroExitoso(true)
      } else {
        throw new Error(response.message || 'Error en el registro')
      }
    } catch (error) {
      console.error('Error en el registro:', error)
      alert(error.message || 'Error desconocido en el registro')
    } finally {
      setIsLoading(false)
    }
  },

  aspecto: async (params) => {
    console.log('Handling aspecto submission with params:', params)
  },

  marcas: async (params) => {
    console.log('Handling marcas submission with params:', params)
  },

  medico: async ({ medicalInfo, setLoading, setMessage }) => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No hay token de autenticación')
      }
      await saveMedicalInfo(token, medicalInfo)
      setMessage({
        text: 'Información médica guardada correctamente',
        type: 'success'
      })
      setTimeout(() => setMessage({ text: '', type: '' }), 3000)
    } catch (error) {
      setMessage({
        text: error.message || 'Error al guardar la información médica',
        type: 'error'
      })
    } finally {
      setLoading(false)
    }
  }
}

const handleSubmitHelper = async (e, type, params) => {
  e.preventDefault()

  if (handlers[type]) {
    return handlers[type](params)
  } else {
    console.error(`handleSubmitHelper: Tipo desconocido "${type}"`)
  }
}

export default handleSubmitHelper
