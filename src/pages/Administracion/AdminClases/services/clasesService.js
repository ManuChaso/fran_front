import {
  fetchClases as fetchClasesApi,
  deleteClase as deleteClaseApi,
  guardarClaseAPI as guardarClaseApiCentral
} from '../../../../services/Api/index'

export const fetchClasesAPI = async () => {
  const token = localStorage.getItem('token')
  return await fetchClasesApi(token)
}

export const deleteClaseAPI = async (id) => {
  const token = localStorage.getItem('token')
  return await deleteClaseApi(token, id)
}

export const guardarClase = async (formData, editingId, modoCreacion) => {
  const token = localStorage.getItem('token')
  return await guardarClaseApiCentral(token, formData, editingId, modoCreacion)
}
