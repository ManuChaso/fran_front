import { useState, useEffect, useCallback } from 'react'
import { fetchClasesAPI, deleteClaseAPI } from '../services/clasesService'

export const useClases = () => {
  const [clases, setClases] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const fetchClases = useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetchClasesAPI()
      if (data.success) {
        setClases(data.data)
      }
    } catch (error) {
      console.error('Error al obtener las clases:', error)
      setError('Error al cargar las clases. Por favor, intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta clase?')) {
      setLoading(true)
      try {
        const data = await deleteClaseAPI(id)
        if (data.success) {
          fetchClases()
          setSuccess('Clase eliminada con éxito')
          setTimeout(() => setSuccess(null), 3000)
        }
      } catch (error) {
        console.error('Error al eliminar la clase:', error)
        setError('Error al eliminar la clase')
      } finally {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    fetchClases()
  }, [fetchClases])

  return {
    clases,
    loading,
    error,
    success,
    setError,
    setSuccess,
    fetchClases,
    handleDelete
  }
}
