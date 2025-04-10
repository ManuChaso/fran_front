import { useState, useEffect, useCallback } from 'react'
import { fetchEntrenadoresAPI } from '../services/entrenadoresService'

export const useEntrenadores = () => {
  const [entrenadores, setEntrenadores] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchEntrenadores = useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetchEntrenadoresAPI()
      if (data.success) {
        setEntrenadores(data.data)
      }
    } catch (error) {
      console.error('Error al obtener entrenadores:', error)
      setError('Error al cargar los entrenadores')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchEntrenadores()
  }, [fetchEntrenadores])

  return {
    entrenadores,
    loading,
    error
  }
}
