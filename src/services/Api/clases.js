import { API_BASE_URL, handleApiError, checkResponse } from './config'
import { isValid, format } from 'date-fns'
import { es } from 'date-fns/locale'

export const fetchClases = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/classes`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    return await checkResponse(response)
  } catch (error) {
    handleApiError(error, 'Error al obtener clases:')
  }
}

export const deleteClase = async (token, id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/classes/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    return await checkResponse(response)
  } catch (error) {
    handleApiError(error, 'Error al eliminar clase:')
  }
}

export const guardarClaseAPI = async (
  token,
  formData,
  editingId,
  modoCreacion
) => {
  try {
    const horariosInvalidos = formData.horarios.some(
      (h) => !h.hora || !h.duracion
    )

    if (horariosInvalidos) {
      throw new Error('Todos los horarios deben tener hora y duración')
    }

    if (modoCreacion === 'semanal' && !formData.diaSemana) {
      throw new Error('Debes seleccionar un día de la semana')
    }

    if (modoCreacion === 'fecha' && !formData.fecha) {
      throw new Error('Debes seleccionar una fecha específica')
    }

    const clasesCreadas = []
    const clasesConError = []

    for (const horario of formData.horarios) {
      const formDataToSend = new FormData()

      formDataToSend.append('nombre', formData.nombre)
      formDataToSend.append('descripcion', formData.descripcion)
      formDataToSend.append('horario', horario.hora)
      formDataToSend.append('duracion', horario.duracion)
      formDataToSend.append('capacidadMaxima', formData.capacidadMaxima)
      formDataToSend.append('categoria', formData.categoria)
      formDataToSend.append('nivel', formData.nivel)
      formDataToSend.append('ubicacion', formData.ubicacion)

      if (modoCreacion === 'semanal') {
        formDataToSend.append('diaSemana', formData.diaSemana)
        formDataToSend.append('fecha', '')
        formDataToSend.append('esFechaEspecifica', 'false')
      } else {
        formDataToSend.append('fecha', formData.fecha)
        formDataToSend.append('esFechaEspecifica', 'true')

        const fechaSeleccionada = new Date(formData.fecha)
        if (isValid(fechaSeleccionada)) {
          const diaSemanaCalculado = format(fechaSeleccionada, 'EEEE', {
            locale: es
          }).toLowerCase()
          formDataToSend.append('diaSemana', diaSemanaCalculado)
        } else {
          throw new Error('La fecha seleccionada no es válida')
        }
      }

      if (formData.entrenador && formData.entrenador !== '') {
        formDataToSend.append('entrenador', formData.entrenador)
      }

      if (
        formData.imagen &&
        formData.imagen instanceof File &&
        clasesCreadas.length === 0
      ) {
        formDataToSend.append('imagen', formData.imagen)
      }

      const url = editingId
        ? `${API_BASE_URL}/classes/${editingId}`
        : `${API_BASE_URL}/classes`

      const method = editingId ? 'PUT' : 'POST'

      try {
        const response = await fetch(url, {
          method,
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formDataToSend
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(
            data.message || `HTTP error! status: ${response.status}`
          )
        }

        clasesCreadas.push(data.data)
      } catch (error) {
        clasesConError.push({ horario: horario.hora, error: error.message })
      }
    }

    return {
      success: clasesCreadas.length > 0,
      clasesCreadas: clasesCreadas.length,
      clasesConError: clasesConError.length
    }
  } catch (error) {
    handleApiError(error, 'Error al guardar clase:')
  }
}

export const fetchClasesUsuario = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/classes`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      credentials: 'include'
    })

    const data = await checkResponse(response)

    if (data && Array.isArray(data.data)) {
      return data.data
    } else {
      throw new Error('La respuesta del servidor no es válida')
    }
  } catch (error) {
    handleApiError(error, 'Error al obtener clases:')
  }
}

export const inscribirClase = async (token, claseId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/classes/${claseId}/inscribir`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        credentials: 'include'
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al inscribirse')
    }

    const data = await response.json()

    if (data.success) {
      return data.data
    } else {
      throw new Error(data.message || 'Error al inscribirse')
    }
  } catch (error) {
    handleApiError(error, 'Error al inscribirse:')
  }
}

export const cancelarClase = async (token, claseId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/classes/${claseId}/cancelar`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        credentials: 'include'
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al cancelar inscripción')
    }

    const data = await response.json()

    if (data.success) {
      return data.data
    } else {
      throw new Error(data.message || 'Error al cancelar inscripción')
    }
  } catch (error) {
    handleApiError(error, 'Error al cancelar inscripción:')
  }
}
export const inscribirClaseAdmin = async (token, claseId, userId) => {
  try {
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

    const data = await response.json()

    if (data.success) {
      return data.data
    } else {
      throw new Error(data.message || 'Error al inscribir al usuario')
    }
  } catch (error) {
    handleApiError(error, 'Error al inscribir al usuario:')
  }
}

export const cancelarClaseAdmin = async (token, claseId, userId) => {
  try {
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
      throw new Error(errorData.message || 'Error al cancelar inscripción')
    }

    const data = await response.json()

    if (data.success) {
      return data.data
    } else {
      throw new Error(data.message || 'Error al cancelar inscripción')
    }
  } catch (error) {
    handleApiError(error, 'Error al cancelar inscripción:')
  }
}
