export const initialState = {
  productos: [],
  loading: false,
  error: '',
  successMessage: '',
  searchTerm: '',
  categoriaFiltro: '',
  currentPage: 1,
  totalPages: 1,
  modalOpen: false,
  editando: null,
  form: {
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: '',
    stock: '',
    marca: '',
    imagen: null,
    estado: 'activo',
    destacado: false
  },
  previewImage: null,
  formErrors: {}
}

export const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_PRODUCTOS: 'SET_PRODUCTOS',
  SET_ERROR: 'SET_ERROR',
  SET_SUCCESS_MESSAGE: 'SET_SUCCESS_MESSAGE',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  SET_CATEGORIA_FILTRO: 'SET_CATEGORIA_FILTRO',
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
  SET_TOTAL_PAGES: 'SET_TOTAL_PAGES',
  SET_MODAL_OPEN: 'SET_MODAL_OPEN',
  SET_FORM: 'SET_FORM',
  UPDATE_FORM: 'UPDATE_FORM',
  SET_EDITANDO: 'SET_EDITANDO',
  SET_PREVIEW_IMAGE: 'SET_PREVIEW_IMAGE',
  SET_FORM_ERRORS: 'SET_FORM_ERRORS',
  RESET_FORM: 'RESET_FORM',
  RESET_MESSAGES: 'RESET_MESSAGES'
}

export function productReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload }
    case ACTIONS.SET_PRODUCTOS:
      return { ...state, productos: action.payload }
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload }
    case ACTIONS.SET_SUCCESS_MESSAGE:
      return { ...state, successMessage: action.payload }
    case ACTIONS.SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload }
    case ACTIONS.SET_CATEGORIA_FILTRO:
      return { ...state, categoriaFiltro: action.payload }
    case ACTIONS.SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload }
    case ACTIONS.SET_TOTAL_PAGES:
      return { ...state, totalPages: action.payload }
    case ACTIONS.SET_MODAL_OPEN:
      return { ...state, modalOpen: action.payload }
    case ACTIONS.SET_FORM:
      return { ...state, form: action.payload }
    case ACTIONS.UPDATE_FORM:
      return { ...state, form: { ...state.form, ...action.payload } }
    case ACTIONS.SET_EDITANDO:
      return { ...state, editando: action.payload }
    case ACTIONS.SET_PREVIEW_IMAGE:
      return { ...state, previewImage: action.payload }
    case ACTIONS.SET_FORM_ERRORS:
      return { ...state, formErrors: action.payload }
    case ACTIONS.RESET_FORM:
      return {
        ...state,
        form: initialState.form,
        previewImage: null,
        editando: null,
        formErrors: {}
      }
    case ACTIONS.RESET_MESSAGES:
      return { ...state, error: '', successMessage: '' }
    default:
      return state
  }
}
