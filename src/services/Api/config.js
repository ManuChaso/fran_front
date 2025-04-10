export const API_BASE_URL = import.meta.env.PROD 
  ? 'https://fran-back.onrender.com/api'
  : 'http://localhost:5000/api'

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
