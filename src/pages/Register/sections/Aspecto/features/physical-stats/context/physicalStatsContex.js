import { createContext } from 'react'

const PhysicalStatsContext = createContext({
  stats: null,
  historialMedidas: [],
  objetivos: [],
  loading: false,
  error: null,
  saveStats: () => {},
  fetchLatestStats: () => {},
  fetchStatsHistory: () => {},
  fetchObjetivos: () => {},
  createObjetivo: () => {},
  deleteObjetivo: () => {}
})

export default PhysicalStatsContext
