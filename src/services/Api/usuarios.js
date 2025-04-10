import { API_BASE_URL, handleApiError, checkResponse } from './config'

export const obtenerPerfilUsuario = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return await checkResponse(response)
  } catch (error) {
    handleApiError(error, 'Error al obtener perfil de usuario:')
  }
}

export const actualizarPerfilUsuario = async (token, userData, avatarFile) => {
  try {
    const formData = new FormData()

    formData.append('nombre', userData.nombre || '')
    formData.append('email', userData.email || '')
    formData.append('telefono', userData.telefono || '')

    formData.append(
      'direccion',
      JSON.stringify({
        calle: userData.direccion?.calle || '',
        ciudad: userData.direccion?.ciudad || '',
        codigoPostal: userData.direccion?.codigoPostal || '',
        pais: userData.direccion?.pais || ''
      })
    )

    if (avatarFile) {
      formData.append('avatar', avatarFile)
    }

    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    })

    return await checkResponse(response)
  } catch (error) {
    handleApiError(error, 'Error al actualizar perfil de usuario:')
  }
}

export const obtenerTodosUsuarios = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    const data = await checkResponse(response)
    return Array.isArray(data) ? data : data.data
  } catch (error) {
    handleApiError(error, 'Error al obtener todos los usuarios:')
  }
}
export const obtenerUsuarioPorId = async (userId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    return await checkResponse(response)
  } catch (error) {
    handleApiError(error, `Error al obtener usuario con ID ${userId}:`)
  }
}

export const fetchEntrenadores = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/entrenadores`)
    return await checkResponse(response)
  } catch (error) {
    handleApiError(error, 'Error al obtener entrenadores:')
  }
}
