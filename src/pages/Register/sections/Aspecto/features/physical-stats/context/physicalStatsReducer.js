export const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_STATS: 'SET_STATS',
  SET_HISTORIAL: 'SET_HISTORIAL',
  SET_OBJETIVOS: 'SET_OBJETIVOS',
  CLEAR_ERROR: 'CLEAR_ERROR'
}

const physicalStatsReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    case ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      }
    case ACTIONS.SET_STATS:
      return {
        ...state,
        stats: action.payload,
        loading: false
      }
    case ACTIONS.SET_HISTORIAL:
      return {
        ...state,
        historialMedidas: action.payload,
        loading: false
      }
    case ACTIONS.SET_OBJETIVOS:
      return {
        ...state,
        objetivos: action.payload,
        loading: false
      }
    case ACTIONS.REMOVE_OBJETIVO:
      return {
        ...state,
        objetivos: state.objetivos.filter((obj) => obj._id !== action.payload),
        loading: false
      }
    default:
      return state
  }
}

export default physicalStatsReducer
