import { API_BASE_URL, checkResponse, handleApiError } from './config'

export const guardarConsentimiento = async (consentimientoData, token) => {
  try {
    if (!consentimientoData.userId) {
      console.error('Error: userId no proporcionado', consentimientoData)
      throw new Error('El userId es requerido')
    }

    console.log('Enviando datos de consentimiento:', consentimientoData)

    const response = await fetch(`${API_BASE_URL}/consentimientos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(consentimientoData)
    })

    return await checkResponse(response)
  } catch (error) {
    return handleApiError(error, 'Error al guardar el consentimiento')
  }
}

export const obtenerTodosConsentimientos = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/consentimientos`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return await checkResponse(response)
  } catch (error) {
    return handleApiError(error, 'Error al obtener los consentimientos')
  }
}

export const obtenerConsentimientoPorUsuario = async (userId, token) => {
  try {
    if (!userId) {
      throw new Error('El userId es requerido para obtener el consentimiento')
    }

    const response = await fetch(
      `${API_BASE_URL}/consentimientos/usuario/${userId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    return await checkResponse(response)
  } catch (error) {
    return handleApiError(
      error,
      'Error al obtener el consentimiento del usuario'
    )
  }
}

export const eliminarConsentimiento = async (id, token) => {
  try {
    if (!id) {
      throw new Error('El ID del consentimiento es requerido para eliminarlo')
    }

    console.log(`Eliminando consentimiento con ID: ${id}`)

    const response = await fetch(`${API_BASE_URL}/consentimientos/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return await checkResponse(response)
  } catch (error) {
    return handleApiError(error, 'Error al eliminar el consentimiento')
  }
}
