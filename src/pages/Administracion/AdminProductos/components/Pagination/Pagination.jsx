import { ChevronLeft, ChevronRight } from 'lucide-react'
import Button from '../../../../../components/Button/Button'
import './Pagination.css'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className='pagination'>
      <Button
        className='pagination-button'
        variant='outline'
        size='icon'
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        leftIcon={<ChevronLeft size={20} />}
      />

      <span>
        Página {currentPage} de {totalPages}
      </span>
      <Button
        className='pagination-button'
        variant='outline'
        size='icon'
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        rightIcon={<ChevronRight size={20} />}
      />
    </div>
  )
}

export default Pagination
