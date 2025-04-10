export const API_BASE_URL = /*'https://proyecto13backend.onrender.com/api'*/ 'http://localhost:5000/api'
export const BASE_URL = 'http://localhost:5000'

export const handleApiError = (error, customMessage) => {
  console.error(customMessage || 'Error en la API:', error)
  throw error
}

export const checkResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(
      errorData.message || `Error ${response.status}: ${response.statusText}`
    )
  }
  return await response.json()
}
/*export const API_BASE_URLS = [
  'https://proyecto13backend.onrender.com/api',
  'http://localhost:5000/api'
]

export const API_BASE_URL = API_BASE_URLS[1]

export const BASE_URL = 'http://localhost:5000'

export const handleApiError = (error, customMessage) => {
  console.error(customMessage || 'Error en la API:', error)
  throw error
}

export const checkResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(
      errorData.message || `Error ${response.status}: ${response.statusText}`
    )
  }
  return await response.json()
}*/
