import { useState, useEffect, useRef } from 'react'
import { addWeeks, subWeeks, eachDayOfInterval, format } from 'date-fns'

export const useCalendario = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [visibleDates, setVisibleDates] = useState([])
  const calendarRef = useRef(null)

  useEffect(() => {
    const start = subWeeks(selectedDate, 4)
    const end = addWeeks(selectedDate, 4)
    const dates = eachDayOfInterval({ start, end })
    setVisibleDates(dates)

    if (calendarRef.current) {
      const dayWidth = 100
      const selectedIndex = dates.findIndex(
        (date) =>
          format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
      )
      const scrollPosition =
        selectedIndex * dayWidth -
        calendarRef.current.offsetWidth / 2 +
        dayWidth / 2
      calendarRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      })
    }
  }, [selectedDate])

  const handlePrevWeek = () => {
    setSelectedDate(subWeeks(selectedDate, 1))
  }

  const handleNextWeek = () => {
    setSelectedDate(addWeeks(selectedDate, 1))
  }

  return {
    selectedDate,
    visibleDates,
    calendarRef,
    handlePrevWeek,
    handleNextWeek,
    setSelectedDate
  }
}
