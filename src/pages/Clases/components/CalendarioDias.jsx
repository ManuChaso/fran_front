import { useEffect, useRef } from 'react'
import { isToday } from 'date-fns'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Button from '../../../components/Button/Button'

const CalendarioDias = ({
  selectedDate,
  visibleDates,
  calendarRef,
  handlePrevWeek,
  handleNextWeek,
  setSelectedDate
}) => {
  const todayRef = useRef(null)

  useEffect(() => {
    if (todayRef.current && calendarRef.current) {
      calendarRef.current.scrollTo({
        left: todayRef.current.offsetLeft - calendarRef.current.offsetLeft,
        behavior: 'smooth'
      })
    }
  }, [visibleDates])

  return (
    <div className='calendario-container'>
      <Button
        className='scroll-button left'
        onClick={handlePrevWeek}
        variant='secondary'
        size='icon'
        leftIcon={<ChevronLeft size={20} />}
      />

      <Button
        className='scroll-button right'
        onClick={handleNextWeek}
        variant='secondary'
        size='icon'
        rightIcon={<ChevronRight size={20} />}
      />

      <div
        className='calendario-dias'
        ref={calendarRef}
        style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}
      >
        {visibleDates.map((date) => {
          const dayName = format(date, 'EEEE', { locale: es })
          const dayNumber = format(date, 'd')
          const month = format(date, 'MMM', { locale: es })
          const isSelected =
            format(selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
          const isPast = date < new Date(new Date().setHours(0, 0, 0, 0))

          return (
            <button
              key={date.toString()}
              ref={isToday(date) ? todayRef : null}
              className={`dia-btn ${isSelected ? 'activo' : ''} ${
                isToday(date) ? 'hoy' : ''
              } ${isPast ? 'pasado' : ''}`}
              onClick={() => setSelectedDate(date)}
              disabled={isPast}
            >
              <span className='dia-nombre'>{dayName.slice(0, 3)}</span>
              <span className='dia-numero'>{dayNumber}</span>
              <span className='dia-mes'>{month}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default CalendarioDias
