import { API_BASE_URL, handleApiError, checkResponse } from './config'

export const getAllMedicalInfo = async (token) => {
  try {
    console.log(
      'Obteniendo información médica con token:',
      token ? 'Token presente' : 'Token ausente'
    )
    console.log('Rol del usuario:', localStorage.getItem('rol'))

    const response = await fetch(`${API_BASE_URL}/medical-info/admin/all`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    const data = await checkResponse(response)

    if (data && data.data) {
      const firstUser = data.data[0]?.user
      if (firstUser) {
        console.log('Primer usuario:', firstUser)
        console.log('Campos del primer usuario:', Object.keys(firstUser))
        console.log('Nombre del primer usuario:', firstUser.nombre)
      }

      const validData = data.data.filter(
        (item) => item && item.user && item.user._id
      )

      if (validData.length !== data.data.length) {
        console.warn(
          `Se filtraron ${
            data.data.length - validData.length
          } registros inválidos`
        )
      }

      return validData || []
    } else {
      console.error('Formato de respuesta inesperado:', data)
      throw new Error('Error en el formato de datos recibidos del servidor')
    }
  } catch (error) {
    handleApiError(error, 'Error al obtener información médica:')
    return []
  }
}

export const getUserMedicalInfo = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/medical-info`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    const data = await checkResponse(response)

    if (data.data && data.data.lastCheckup) {
      data.data.lastCheckup = new Date(data.data.lastCheckup)
        .toISOString()
        .split('T')[0]
    }

    return (
      data.data || {
        bloodType: '',
        allergies: '',
        conditions: '',
        medications: '',
        emergencyContact: '',
        emergencyPhone: '',
        lastCheckup: '',
        doctorName: '',
        doctorPhone: ''
      }
    )
  } catch (error) {
    handleApiError(error, 'Error al obtener información médica del usuario:')
    return {
      bloodType: '',
      allergies: '',
      conditions: '',
      medications: '',
      emergencyContact: '',
      emergencyPhone: '',
      lastCheckup: '',
      doctorName: '',
      doctorPhone: ''
    }
  }
}

export const getUserMedicalInfoById = async (token, userId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/medical-info/user/${userId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return await checkResponse(response)
  } catch (error) {
    handleApiError(error, 'Error al obtener información médica del usuario:')
    return null
  }
}

export const saveMedicalInfo = async (token, medicalData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/medical-info`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(medicalData)
    })

    return await checkResponse(response)
  } catch (error) {
    handleApiError(error, 'Error al guardar información médica:')
    throw error
  }
}

export const updateMedicalInfo = async (token, medicalData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/medical-info`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(medicalData)
    })

    return await checkResponse(response)
  } catch (error) {
    handleApiError(error, 'Error al actualizar información médica:')
    throw error
  }
}
