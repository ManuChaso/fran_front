import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'

export const organizarClasesPorDia = (clases) => {
  const clasesOrdenadas = [...clases].sort((a, b) => {
    if (a.fecha && b.fecha) {
      return new Date(a.fecha) - new Date(b.fecha)
    } else if (a.fecha) {
      return -1
    } else if (b.fecha) {
      return 1
    }

    const diasOrden = {
      lunes: 1,
      martes: 2,
      miércoles: 3,
      jueves: 4,
      viernes: 5,
      sábado: 6,
      domingo: 7
    }

    if (a.diaSemana !== b.diaSemana) {
      return diasOrden[a.diaSemana] - diasOrden[b.diaSemana]
    }

    const [aHora, aMin] = a.horario.split(':').map(Number)
    const [bHora, bMin] = b.horario.split(':').map(Number)

    if (aHora !== bHora) {
      return aHora - bHora
    }

    return aMin - bMin
  })

  return clasesOrdenadas.reduce((grupos, clase) => {
    if (clase.esFechaEspecifica && clase.fecha) {
      try {
        const fechaObj = parseISO(clase.fecha)
        const fechaFormato = format(fechaObj, 'yyyy-MM-dd')
        const fechaLegible = format(fechaObj, "d 'de' MMMM 'de' yyyy", {
          locale: es
        })

        const clave = `fecha_${fechaFormato}`

        if (!grupos[clave]) {
          grupos[clave] = []
        }
        grupos[clave].push(clase)
      } catch (error) {
        if (!grupos['sin_clasificar']) {
          grupos['sin_clasificar'] = []
        }
        grupos['sin_clasificar'].push(clase)
      }
    } else {
      if (clase.diaSemana) {
        if (!grupos[clase.diaSemana]) {
          grupos[clase.diaSemana] = []
        }
        grupos[clase.diaSemana].push(clase)
      } else {
        if (!grupos['sin_clasificar']) {
          grupos['sin_clasificar'] = []
        }
        grupos['sin_clasificar'].push(clase)
      }
    }
    return grupos
  }, {})
}
