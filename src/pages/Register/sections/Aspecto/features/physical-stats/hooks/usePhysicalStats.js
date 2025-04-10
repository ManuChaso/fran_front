import { useContext } from 'react'
import PhysicalStatsContext from '../context/physicalStatsContex'

const usePhysicalStats = () => {
  const context = useContext(PhysicalStatsContext)

  if (context === undefined) {
    throw new Error(
      'usePhysicalStats debe ser usado dentro de un PhysicalStatsProvider'
    )
  }

  return context
}

export default usePhysicalStats
