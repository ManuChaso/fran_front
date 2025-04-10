import { useReducer, useCallback } from 'react'
import PhysicalStatsContext from './physicalStatsContex'
import physicalStatsReducer, { ACTIONS } from './physicalStatsReducer'
import {
  fetchLatestStatsApi,
  fetchStatsHistoryApi,
  fetchObjetivosApi,
  saveStatsApi,
  createObjetivoApi,
  deleteObjetivoApi
} from '../api/physicalStatsApi'

const PhysicalStatsProvider = ({ children }) => {
  const initialState = {
    stats: null,
    historialMedidas: [],
    objetivos: [],
    loading: false,
    error: null
  }

  const [state, dispatch] = useReducer(physicalStatsReducer, initialState)

  const setLoading = () => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true })
  }

  const clearError = () => {
    dispatch({ type: ACTIONS.CLEAR_ERROR })
  }

  const fetchLatestStats = useCallback(async () => {
    setLoading()
    try {
      const data = await fetchLatestStatsApi()
      if (data) {
        dispatch({
          type: ACTIONS.SET_STATS,
          payload: data.medidas || {}
        })
      }
    } catch (error) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: error.message || 'Error al obtener estadísticas'
      })
    }
  }, [])

  const fetchStatsHistory = useCallback(async () => {
    setLoading()
    try {
      const data = await fetchStatsHistoryApi()
      dispatch({
        type: ACTIONS.SET_HISTORIAL,
        payload: data || []
      })
    } catch (error) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: error.message || 'Error al obtener historial'
      })
    }
  }, [])

  const fetchObjetivos = useCallback(async () => {
    setLoading()
    try {
      const data = await fetchObjetivosApi()
      dispatch({
        type: ACTIONS.SET_OBJETIVOS,
        payload: data || []
      })
    } catch (error) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: error.message || 'Error al obtener objetivos'
      })
    }
  }, [])

  const saveStats = useCallback(async (statsData) => {
    setLoading()
    try {
      await saveStatsApi(statsData)

      dispatch({
        type: ACTIONS.SET_STATS,
        payload: statsData
      })
      return { success: true, message: 'Estadísticas guardadas correctamente' }
    } catch (error) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: error.message || 'Error al guardar estadísticas'
      })
      return {
        success: false,
        message: error.message || 'Error al guardar estadísticas'
      }
    }
  }, [])

  const createObjetivo = useCallback(
    async (objetivoData) => {
      setLoading()
      try {
        const newObjetivo = await createObjetivoApi(objetivoData)
        dispatch({
          type: ACTIONS.SET_OBJETIVOS,
          payload: [...state.objetivos, newObjetivo]
        })
        return { success: true, message: 'Objetivo creado correctamente' }
      } catch (error) {
        dispatch({
          type: ACTIONS.SET_ERROR,
          payload: error.message || 'Error al crear objetivo'
        })
        return {
          success: false,
          message: error.message || 'Error al crear objetivo'
        }
      }
    },
    [state.objetivos]
  )

  const deleteObjetivo = useCallback(async (objetivoId) => {
    setLoading()
    try {
      const result = await deleteObjetivoApi(objetivoId)

      dispatch({
        type: ACTIONS.REMOVE_OBJETIVO,
        payload: objetivoId
      })

      return {
        success: true,
        message: result.message || 'Objetivo eliminado correctamente'
      }
    } catch (error) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: error.message || 'Error al eliminar objetivo'
      })
      return {
        success: false,
        message: error.message || 'Error al eliminar objetivo'
      }
    }
  }, [])

  return (
    <PhysicalStatsContext.Provider
      value={{
        ...state,
        fetchLatestStats,
        fetchStatsHistory,
        fetchObjetivos,
        saveStats,
        createObjetivo,
        deleteObjetivo,
        clearError
      }}
    >
      {children}
    </PhysicalStatsContext.Provider>
  )
}

export default PhysicalStatsProvider
