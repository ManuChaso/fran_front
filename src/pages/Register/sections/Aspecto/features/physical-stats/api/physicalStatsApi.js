const API_URL = 'http://localhost:5000/api/physical'

const handleResponse = async (response) => {
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Error en la solicitud')
  }

  return data.data
}

const getAuthToken = () => {
  return localStorage.getItem('token')
}

export const fetchLatestStatsApi = async () => {
  const token = getAuthToken()

  const response = await fetch(`${API_URL}/stats/latest`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return handleResponse(response)
}

export const fetchStatsHistoryApi = async () => {
  const token = getAuthToken()

  const response = await fetch(`${API_URL}/stats/history`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return handleResponse(response)
}

export const fetchTrendsApi = async (medida) => {
  const token = getAuthToken()

  const response = await fetch(`${API_URL}/stats/trends/${medida}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return handleResponse(response)
}

export const saveStatsApi = async (statsData) => {
  const token = getAuthToken()

  const response = await fetch(`${API_URL}/stats`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(statsData)
  })

  return handleResponse(response)
}

export const fetchObjetivosApi = async () => {
  const token = getAuthToken()

  const response = await fetch(`${API_URL}/objetivos`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return handleResponse(response)
}

export const createObjetivoApi = async (objetivoData) => {
  const token = getAuthToken()

  const response = await fetch(`${API_URL}/objetivos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(objetivoData)
  })

  return handleResponse(response)
}

export const deleteObjetivoApi = async (objetivoId) => {
  const token = getAuthToken()

  const response = await fetch(`${API_URL}/objetivos/${objetivoId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Error al eliminar objetivo')
  }

  return {
    success: true,
    message: data.message || 'Objetivo eliminado correctamente'
  }
}
