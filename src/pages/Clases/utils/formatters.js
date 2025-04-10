import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'

export const formatFecha = (fecha) => {
  if (!fecha) return ''
  try {
    const fechaObj = parseISO(fecha)
    return format(fechaObj, "d 'de' MMMM 'de' yyyy", { locale: es })
  } catch (error) {
    console.error('Error al formatear fecha:', error)
    return fecha
  }
}

export const getNivelBadgeClass = (nivel) => {
  switch (nivel) {
    case 'principiante':
      return 'nivel-badge principiante'
    case 'intermedio':
      return 'nivel-badge intermedio'
    case 'avanzado':
      return 'nivel-badge avanzado'
    default:
      return 'nivel-badge'
  }
}
