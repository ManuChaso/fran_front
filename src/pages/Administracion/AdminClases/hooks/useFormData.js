import { useState, useEffect } from 'react'

export const useFormData = (initialData) => {
  const defaultFormData = {
    nombre: '',
    descripcion: '',
    horarios: [{ hora: '', duracion: '60' }],
    capacidadMaxima: '',
    categoria: '',
    nivel: '',
    ubicacion: '',
    diaSemana: '',
    fecha: '',
    imagen: null,
    entrenador: ''
  }

  const [formData, setFormData] = useState(initialData || defaultFormData)
  const [previewUrl, setPreviewUrl] = useState(initialData?.previewUrl || null)
  const [modoCreacion, setModoCreacion] = useState(
    initialData?.modoCreacion || 'semanal'
  )

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
      setPreviewUrl(initialData.previewUrl)
      setModoCreacion(initialData.modoCreacion)
    }
  }, [initialData])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({ ...formData, imagen: file })
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const addHorario = () => {
    setFormData({
      ...formData,
      horarios: [...formData.horarios, { hora: '', duracion: '60' }]
    })
  }

  const removeHorario = (index) => {
    const newHorarios = [...formData.horarios]
    newHorarios.splice(index, 1)
    setFormData({
      ...formData,
      horarios: newHorarios
    })
  }

  const updateHorario = (index, field, value) => {
    const newHorarios = [...formData.horarios]
    newHorarios[index] = { ...newHorarios[index], [field]: value }
    setFormData({
      ...formData,
      horarios: newHorarios
    })
  }

  return {
    formData,
    setFormData,
    previewUrl,
    setPreviewUrl,
    modoCreacion,
    setModoCreacion,
    handleImageChange,
    addHorario,
    removeHorario,
    updateHorario
  }
}
