import { useState, useEffect, useCallback } from 'react'
import { API_BASE_URL } from '../../../../services/Api/config'
import { obtenerUsuarioPorId } from '../../../../services/Api/index'

export const useUsuarioClases = (userId, selectedDate) => {
  const [userInfo, setUserInfo] = useState(null)
  const [claseSeleccionada, setClaseSeleccionada] = useState(null)
  const [inscripcionExitosa, setInscripcionExitosa] = useState(null)
  const [cancelacionExitosa, setCancelacionExitosa] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadingClases, setLoadingClases] = useState(true)
  const [error, setError] = useState('')
  const [clases, setClases] = useState([])
  const [clasesOrdenadas, setClasesOrdenadas] = useState([])

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('token')
        if (!token) throw new Error('No hay token de autenticación')

        const userData = await obtenerUsuarioPorId(userId, token)
        setUserInfo(userData.data)
      } catch (error) {
        console.error('Error al obtener información del usuario:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchUserInfo()
    }
  }, [userId])

  useEffect(() => {
    const fetchClases = async () => {
      if (!selectedDate) return

      try {
        setLoadingClases(true)
        const token = localStorage.getItem('token')
        if (!token) throw new Error('No hay token de autenticación')

        const response = await fetch(`${API_BASE_URL}/classes`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          credentials: 'include'
        })

        if (!response.ok) {
          throw new Error(`Error al cargar clases: ${response.status}`)
        }

        const responseData = await response.json()
        const data = responseData.data || []

        const fechaSeleccionada = selectedDate.toISOString().split('T')[0]
        const clasesDelDia = data.filter((clase) => {
          if (clase.esFechaEspecifica) {
            return (
              clase.fecha && clase.fecha.split('T')[0] === fechaSeleccionada
            )
          } else {
            const diaSemana = selectedDate
              .toLocaleDateString('es-ES', { weekday: 'long' })
              .toLowerCase()
            return clase.diaSemana === diaSemana
          }
        })

        setClases(clasesDelDia)

        const ordenadas = [...clasesDelDia].sort((a, b) => {
          return (
            new Date(`2000-01-01T${a.horario}`) -
            new Date(`2000-01-01T${b.horario}`)
          )
        })

        setClasesOrdenadas(ordenadas)
      } catch (error) {
        console.error('Error al cargar clases:', error)
        setError(
          'No se pudieron cargar las clases. Por favor, intenta de nuevo más tarde.'
        )
      } finally {
        setLoadingClases(false)
      }
    }

    fetchClases()
  }, [selectedDate])

  const handleInscribir = useCallback(
    async (claseId) => {
      try {
        setClaseSeleccionada(claseId)
        const token = localStorage.getItem('token')
        if (!token) throw new Error('No hay token de autenticación')

        const response = await fetch(
          `${API_BASE_URL}/classes/${claseId}/inscribir-usuario`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ userId }),
            credentials: 'include'
          }
        )

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Error al inscribir al usuario')
        }

        const responseData = await response.json()

        if (!responseData.success) {
          throw new Error(
            responseData.message || 'Error al inscribir al usuario'
          )
        }

        const claseActualizada = responseData.data

        setClases((prevClases) =>
          prevClases.map((clase) =>
            clase._id === claseId ? claseActualizada : clase
          )
        )

        setClasesOrdenadas((prevClases) => {
          const updated = prevClases.map((clase) =>
            clase._id === claseId ? claseActualizada : clase
          )
          return [...updated].sort((a, b) => {
            return (
              new Date(`2000-01-01T${a.horario}`) -
              new Date(`2000-01-01T${b.horario}`)
            )
          })
        })

        setInscripcionExitosa(
          `${userInfo.nombre} ha sido inscrito correctamente en la clase`
        )

        setTimeout(() => {
          setInscripcionExitosa(null)
        }, 3000)
      } catch (error) {
        console.error('Error al inscribir al usuario:', error)
        setError(error.message)
      } finally {
        setClaseSeleccionada(null)
      }
    },
    [userId, userInfo]
  )

  const handleCancelar = useCallback(
    async (claseId) => {
      try {
        setClaseSeleccionada(claseId)
        const token = localStorage.getItem('token')
        if (!token) throw new Error('No hay token de autenticación')

        const response = await fetch(
          `${API_BASE_URL}/classes/${claseId}/cancelar-usuario`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ userId }),
            credentials: 'include'
          }
        )

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(
            errorData.message || 'Error al cancelar la inscripción'
          )
        }

        const responseData = await response.json()

        if (!responseData.success) {
          throw new Error(
            responseData.message || 'Error al cancelar la inscripción'
          )
        }

        const claseActualizada = responseData.data

        setClases((prevClases) =>
          prevClases.map((clase) =>
            clase._id === claseId ? claseActualizada : clase
          )
        )

        setClasesOrdenadas((prevClases) => {
          const updated = prevClases.map((clase) =>
            clase._id === claseId ? claseActualizada : clase
          )
          return [...updated].sort((a, b) => {
            return (
              new Date(`2000-01-01T${a.horario}`) -
              new Date(`2000-01-01T${b.horario}`)
            )
          })
        })

        setCancelacionExitosa(
          `La inscripción de ${userInfo.nombre} ha sido cancelada correctamente`
        )

        setTimeout(() => {
          setCancelacionExitosa(null)
        }, 3000)
      } catch (error) {
        console.error('Error al cancelar la inscripción:', error)
        setError(error.message)
      } finally {
        setClaseSeleccionada(null)
      }
    },
    [userId, userInfo]
  )

  const estaInscrito = useCallback(
    (clase) => {
      if (!clase || !clase.inscritos || !userId) return false

      return clase.inscritos.some((inscrito) => {
        if (typeof inscrito === 'object' && inscrito !== null) {
          return inscrito._id === userId || inscrito._id.toString() === userId
        }

        return inscrito === userId || inscrito.toString() === userId
      })
    },
    [userId]
  )

  return {
    userInfo,
    clases,
    clasesOrdenadas,
    loading,
    loadingClases,
    error,
    claseSeleccionada,
    inscripcionExitosa,
    cancelacionExitosa,
    setClaseSeleccionada,
    setInscripcionExitosa,
    setCancelacionExitosa,
    handleInscribir,
    handleCancelar,
    estaInscrito
  }
}
