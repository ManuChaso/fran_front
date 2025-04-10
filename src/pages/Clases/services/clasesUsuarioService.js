import {
  fetchClasesUsuario as fetchClasesUsuarioApi,
  inscribirClase as inscribirClaseApi,
  cancelarClase as cancelarClaseApi
} from '../../../services/Api/index'

export const fetchClasesUsuario = async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('No hay token disponible')
  }

  return await fetchClasesUsuarioApi(token)
}

export const inscribirClase = async (claseId) => {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('No hay token disponible')
  }

  return await inscribirClaseApi(token, claseId)
}

export const cancelarClase = async (claseId) => {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('No hay token disponible')
  }

  return await cancelarClaseApi(token, claseId)
}
