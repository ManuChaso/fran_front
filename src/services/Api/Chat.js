import { API_BASE_URL, handleApiError, checkResponse } from './config'
import { io } from 'socket.io-client'

const SOCKET_CONFIG = {
  reconnectionAttempts: 5,
  transports: ['websocket'],
  withCredentials: true
}

export const createSocketConnection = () => {
  return io(API_BASE_URL.replace('/api', ''), SOCKET_CONFIG)
}

export const loadChatMessages = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/chat/messages`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : ''
      }
    })

    if (response.status === 401) {
      console.warn('Token inválido. Redirigiendo al login...')
      localStorage.removeItem('token')
      window.location.href = '/login'
      return []
    }

    if (response.status === 429) {
      console.warn('Demasiadas solicitudes. Esperando...')

      return new Promise((resolve) => {
        setTimeout(async () => {
          resolve(await loadChatMessages(token))
        }, 5000)
      })
    }

    return await checkResponse(response)
  } catch (error) {
    handleApiError(error, 'Error al cargar mensajes del chat:')
    return []
  }
}

export const updateChatMessage = async (messageId, text, token) => {
  try {
    const response = await fetch(`/api/chat/messages/${messageId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ text })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Error al actualizar el mensaje')
    }

    return data
  } catch (error) {
    console.error('Error en updateChatMessage:', error)
    throw error
  }
}

export const deleteChatMessage = async (messageId, token) => {
  try {
    const response = await fetch(`/api/chat/messages/${messageId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Error al eliminar el mensaje')
    }

    return data
  } catch (error) {
    console.error('Error en deleteChatMessage:', error)
    throw error
  }
}

export const deleteAllChatMessages = async (token) => {
  try {
    const response = await fetch(`/api/chat/messages`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Error al eliminar todos los mensajes')
    }

    return data
  } catch (error) {
    console.error('Error en deleteAllChatMessages:', error)
    throw error
  }
}
