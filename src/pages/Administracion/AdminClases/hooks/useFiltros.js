import { useState, useMemo } from 'react'
import { format, parseISO, isValid } from 'date-fns'
import { es } from 'date-fns/locale'

export const useFiltros = (clases) => {
  const [diaSeleccionado, setDiaSeleccionado] = useState('todos')

  const diasSemana = [
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado',
    'domingo'
  ]

  const fechasUnicas = useMemo(() => {
    const fechas = clases
      .filter((clase) => clase.esFechaEspecifica && clase.fecha)
      .map((clase) => {
        try {
          const fecha = parseISO(clase.fecha)
          if (isValid(fecha)) {
            return {
              valor: format(fecha, 'yyyy-MM-dd'),
              texto: format(fecha, "d 'de' MMMM", { locale: es })
            }
          }
        } catch (error) {
          console.error('Error al procesar fecha:', error)
        }
        return null
      })
      .filter(Boolean)

    return [...new Map(fechas.map((item) => [item.valor, item])).values()]
  }, [clases])

  const clasesFiltradas = useMemo(() => {
    if (diaSeleccionado === 'todos') {
      return clases
    }

    if (diaSeleccionado.startsWith('fecha_')) {
      const fechaBuscada = diaSeleccionado.replace('fecha_', '')
      return clases.filter((clase) => {
        if (!clase.fecha) return false
        try {
          return (
            clase.esFechaEspecifica &&
            format(parseISO(clase.fecha), 'yyyy-MM-dd') === fechaBuscada
          )
        } catch (error) {
          console.error('Error al filtrar por fecha:', error)
          return false
        }
      })
    }

    return clases.filter(
      (clase) => !clase.esFechaEspecifica && clase.diaSemana === diaSeleccionado
    )
  }, [clases, diaSeleccionado])

  return {
    diaSeleccionado,
    setDiaSeleccionado,
    diasSemana,
    fechasUnicas,
    clasesFiltradas
  }
}
