import { API_BASE_URL, handleApiError } from './config'

export const verificarCodigoAutorizacion = async (codigo) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/verificar-codigo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ codigo: codigo.trim() })
    })

    return await response.json()
  } catch (error) {
    handleApiError(error, 'Error al verificar código:')
  }
}

export const registrarUsuario = async (userData, avatar) => {
  try {
    const formDataToSend = new FormData()

    Object.keys(userData).forEach((key) => {
      formDataToSend.append(key, userData[key])
    })

    if (avatar) {
      formDataToSend.append('avatar', avatar)
    }

    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      body: formDataToSend
    })

    return {
      ok: response.ok,
      data: await response.json()
    }
  } catch (error) {
    handleApiError(error, 'Error en el registro:')
  }
}

export const iniciarSesion = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    return {
      ok: response.ok,
      data: await response.json()
    }
  } catch (error) {
    handleApiError(error, 'Error en el inicio de sesión:')
  }
}

export const obtenerUsuarioActual = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return await response.json()
  } catch (error) {
    handleApiError(error, 'Error al obtener usuario:')
  }
}

export const obtenerUsuarioActualConInfo = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      credentials: 'include'
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    handleApiError(error, 'Error al obtener información del usuario:')
  }
}
