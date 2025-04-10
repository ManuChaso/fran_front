import { useState, useEffect } from 'react'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import {
  fetchClasesUsuario,
  inscribirClase,
  cancelarClase
} from '../services/clasesUsuarioService'

export const useClasesUsuario = ({
  userId,
  selectedDate,
  setInscripcionExitosa,
  setCancelacionExitosa,
  claseSeleccionada,
  setClaseSeleccionada
}) => {
  const [clases, setClases] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const cargarClases = async () => {
      setLoading(true)
      try {
        const data = await fetchClasesUsuario()
        setClases(data)
        setError(null)
      } catch (err) {
        console.error('Error al cargar clases:', err)
        setError('No se pudieron cargar las clases')
      } finally {
        setLoading(false)
      }
    }

    cargarClases()
  }, [])

  const handleInscribir = async (claseId) => {
    if (!userId) {
      alert('Debes iniciar sesión para inscribirte en una clase')
      return
    }

    setLoading(true)
    setClaseSeleccionada(claseId)

    try {
      const claseActualizada = await inscribirClase(claseId)

      setClases((prevClases) =>
        prevClases.map((clase) => {
          if (clase._id === claseId) {
            return claseActualizada
          }
          return clase
        })
      )

      setInscripcionExitosa('¡Te has inscrito correctamente a la clase!')
      setTimeout(() => setInscripcionExitosa(null), 3000)
    } catch (err) {
      console.error('Error al inscribirse:', err)
      alert(err.message || 'Error al inscribirse en la clase')
    } finally {
      setLoading(false)
      setClaseSeleccionada(null)
    }
  }

  const handleCancelar = async (claseId) => {
    if (!userId) {
      alert('Debes iniciar sesión para cancelar tu inscripción')
      return
    }

    setLoading(true)
    setClaseSeleccionada(claseId)

    try {
      const claseActualizada = await cancelarClase(claseId)

      setClases((prevClases) =>
        prevClases.map((clase) => {
          if (clase._id === claseId) {
            return claseActualizada
          }
          return clase
        })
      )

      setCancelacionExitosa('Has cancelado tu inscripción correctamente')
      setTimeout(() => setCancelacionExitosa(null), 3000)
    } catch (err) {
      console.error('Error al cancelar inscripción:', err)
      alert(err.message || 'Error al cancelar la inscripción')
    } finally {
      setLoading(false)
      setClaseSeleccionada(null)
    }
  }

  const estaInscrito = (clase) => {
    if (!userId || !clase || !clase.inscritos) return false

    return clase.inscritos.some((inscrito) => {
      if (typeof inscrito === 'string') {
        return inscrito === userId
      }
      return inscrito._id.toString() === userId.toString()
    })
  }

  const getClasesPorDia = () => {
    const diaSeleccionado = format(selectedDate, 'EEEE', {
      locale: es
    }).toLowerCase()

    const fechaSeleccionadaStr = format(selectedDate, 'yyyy-MM-dd')

    return clases.filter((clase) => {
      if (clase.esFechaEspecifica && clase.fecha) {
        try {
          const fechaClase = format(parseISO(clase.fecha), 'yyyy-MM-dd')
          return fechaClase === fechaSeleccionadaStr
        } catch (error) {
          console.error('Error al comparar fechas:', error)
          return false
        }
      }

      return !clase.esFechaEspecifica && clase.diaSemana === diaSeleccionado
    })
  }

  const clasesOrdenadas = getClasesPorDia().sort((a, b) => {
    const getMinutos = (horario) => {
      const [horas, minutos] = horario.split(':').map(Number)
      return horas * 60 + minutos
    }

    return getMinutos(a.horario) - getMinutos(b.horario)
  })

  return {
    clases,
    clasesOrdenadas,
    loading,
    error,
    handleInscribir,
    handleCancelar,
    estaInscrito
  }
}
