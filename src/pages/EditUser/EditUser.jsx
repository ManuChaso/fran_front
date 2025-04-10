/*import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import {
  obtenerPerfilUsuario,
  actualizarPerfilUsuario
} from '../../services/Api/index'
import Button from '../../components/Button/Button'
import handleSubmitHelper from '../../utils/HandleSubmit'
import './EditUser.css'

const EditUser = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: { calle: '', ciudad: '', codigoPostal: '', pais: '' },
    avatar: ''
  })
  const [avatarFile, setAvatarFile] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('token')
        if (!token) {
          navigate('/iniciar-sesion')
          return
        }

        const response = await obtenerPerfilUsuario(token)

        const userData = response.data
        if (!userData.direccion) {
          userData.direccion = {
            calle: '',
            ciudad: '',
            codigoPostal: '',
            pais: ''
          }
        }

        setUser(userData)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching user:', error)
        setLoading(false)
      }
    }
    fetchUser()
  }, [navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddressChange = (e) => {
    const { name, value } = e.target
    setUser((prev) => ({
      ...prev,
      direccion: { ...prev.direccion, [name]: value }
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAvatarFile(file)
      const previewUrl = URL.createObjectURL(file)
      setAvatarPreview(previewUrl)
    }
  }

  const handleSubmit = (e) => {
    handleSubmitHelper(e, 'editarUsuario', {
      user,
      avatarFile,
      isSubmitting,
      setIsSubmitting,
      navigate
    })
  }

  if (loading) {
    return <div className='loading'>Cargando...</div>
  }

  return (
    <div className='edit-user-container'>
      <Header />
      <Button
        variant='secondary'
        onClick={() => navigate('/dashboard')}
        leftIcon={<span>←</span>}
      >
        Volver al Dashboard
      </Button>

      <h2>Editar Perfil</h2>
      <form onSubmit={handleSubmit} className='edit-user-form'>
        <div className='form-group'>
          <label htmlFor='nombre'>Nombre</label>
          <input
            id='nombre'
            type='text'
            name='nombre'
            value={user.nombre || ''}
            onChange={handleChange}
            placeholder='Nombre'
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            name='email'
            value={user.email || ''}
            onChange={handleChange}
            placeholder='Email'
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='telefono'>Teléfono</label>
          <input
            id='telefono'
            type='text'
            name='telefono'
            value={user.telefono || ''}
            onChange={handleChange}
            placeholder='Teléfono'
          />
        </div>

        <h3>Dirección</h3>
        <div className='form-group'>
          <label htmlFor='calle'>Calle</label>
          <input
            id='calle'
            type='text'
            name='calle'
            value={user.direccion?.calle || ''}
            onChange={handleAddressChange}
            placeholder='Calle'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='ciudad'>Ciudad</label>
          <input
            id='ciudad'
            type='text'
            name='ciudad'
            value={user.direccion?.ciudad || ''}
            onChange={handleAddressChange}
            placeholder='Ciudad'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='codigoPostal'>Código Postal</label>
          <input
            id='codigoPostal'
            type='text'
            name='codigoPostal'
            value={user.direccion?.codigoPostal || ''}
            onChange={handleAddressChange}
            placeholder='Código Postal'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='pais'>País</label>
          <input
            id='pais'
            type='text'
            name='pais'
            value={user.direccion?.pais || ''}
            onChange={handleAddressChange}
            placeholder='País'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='avatar'>Foto de Perfil</label>
          <input
            id='avatar'
            type='file'
            onChange={handleFileChange}
            accept='image/*'
          />
          {(avatarPreview || user.avatar) && (
            <div className='avatar-preview'>
              <img
                src={
                  avatarPreview ||
                  (user.avatar.startsWith('http')
                    ? user.avatar
                    : `http://localhost:5000/${user.avatar}`)
                }
                alt='Vista previa'
                style={{ maxWidth: '100px', maxHeight: '100px' }}
              />
            </div>
          )}
        </div>

        <div className='form-actions'>
          <Button
            type='submit'
            variant='secondary'
            size='lg'
            isLoading={isSubmitting}
          >
            Actualizar Perfil
          </Button>

          <Button
            type='button'
            variant='secondary'
            size='md'
            onClick={() => navigate('/dashboard')}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EditUser*/
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import {
  obtenerPerfilUsuario,
  actualizarPerfilUsuario
} from '../../services/Api/index'
import Button from '../../components/Button/Button'
import handleSubmitHelper from '../../utils/HandleSubmit'
import './EditUser.css'

const EditUser = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: { calle: '', ciudad: '', codigoPostal: '', pais: '' },
    avatar: ''
  })
  const [avatarFile, setAvatarFile] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('token')
        if (!token) {
          navigate('/iniciar-sesion')
          return
        }

        const response = await obtenerPerfilUsuario(token)

        const userData = response.data
        if (!userData.direccion) {
          userData.direccion = {
            calle: '',
            ciudad: '',
            codigoPostal: '',
            pais: ''
          }
        }

        // Si el usuario tiene un avatar, establecer la vista previa
        if (userData.avatar) {
          setAvatarPreview(
            userData.avatar.startsWith('http')
              ? userData.avatar
              : `http://localhost:5000/${userData.avatar}`
          )
        }

        setUser(userData)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching user:', error)
        setLoading(false)
      }
    }
    fetchUser()
  }, [navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddressChange = (e) => {
    const { name, value } = e.target
    setUser((prev) => ({
      ...prev,
      direccion: { ...prev.direccion, [name]: value }
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAvatarFile(file)
      const previewUrl = URL.createObjectURL(file)
      setAvatarPreview(previewUrl)
    }
  }

  const handleSubmit = (e) => {
    handleSubmitHelper(e, 'editarUsuario', {
      user,
      avatarFile,
      isSubmitting,
      setIsSubmitting,
      navigate
    })
  }

  if (loading) {
    return (
      <div className='cf-edit-user-loading'>
        <div className='cf-edit-user-spinner'></div>
        Cargando...
      </div>
    )
  }

  return (
    <div className='cf-edit-user-container'>
      <div className='cf-edit-user-animation-wrapper'>
        <div className='cf-edit-user-dumbbell-anim'></div>
        <div className='cf-edit-user-kettlebell-anim'></div>
      </div>

      <Header />

      <div className='cf-edit-user-back-button'>
        <Button
          variant='secondary'
          onClick={() => navigate('/dashboard')}
          leftIcon={<span>←</span>}
        >
          Volver al Dashboard
        </Button>
      </div>

      <div
        className={`cf-edit-user-form-wrapper ${
          animationComplete ? 'cf-edit-user-form-visible' : ''
        }`}
      >
        <div className='cf-edit-user-logo-wrapper'>
          <div className='cf-edit-user-dumbbell-logo'></div>
        </div>

        <h2 className='cf-edit-user-heading'>Editar Perfil</h2>

        <form onSubmit={handleSubmit} className='cf-edit-user-form'>
          {/* Avatar upload section */}
          <div className='cf-edit-user-avatar-upload'>
            <div
              className='cf-edit-user-avatar-preview'
              style={{
                backgroundImage: avatarPreview
                  ? `url(${avatarPreview})`
                  : "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23999999' strokeWidth='1.5'%3E%3Cpath strokeLinecap='round' strokeLinejoin='round' d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'/%3E%3C/svg%3E\")"
              }}
            >
              <div className='cf-edit-user-avatar-overlay'>
                <span>Cambiar</span>
              </div>
            </div>
            <input
              type='file'
              accept='image/*'
              onChange={handleFileChange}
              className='cf-edit-user-avatar-input'
              id='cf-edit-user-avatar-upload'
            />
            <label
              htmlFor='cf-edit-user-avatar-upload'
              className='cf-edit-user-avatar-label'
            >
              Seleccionar imagen de perfil
            </label>
          </div>

          <div className='cf-edit-user-input-wrapper'>
            <div className='cf-edit-user-input-field'>
              <span className='cf-edit-user-input-icon cf-edit-user-user-icon'></span>
              <input
                type='text'
                name='nombre'
                value={user.nombre || ''}
                onChange={handleChange}
                placeholder='Nombre'
                required
                className='cf-edit-user-text-input'
              />
            </div>

            <div className='cf-edit-user-input-field'>
              <span className='cf-edit-user-input-icon cf-edit-user-email-icon'></span>
              <input
                type='email'
                name='email'
                value={user.email || ''}
                onChange={handleChange}
                placeholder='Email'
                required
                className='cf-edit-user-text-input'
              />
            </div>

            <div className='cf-edit-user-input-field'>
              <span className='cf-edit-user-input-icon cf-edit-user-phone-icon'></span>
              <input
                type='text'
                name='telefono'
                value={user.telefono || ''}
                onChange={handleChange}
                placeholder='Teléfono'
                className='cf-edit-user-text-input'
              />
            </div>

            <h3 className='cf-edit-user-section-title'>Dirección</h3>

            <div className='cf-edit-user-input-field'>
              <span className='cf-edit-user-input-icon cf-edit-user-address-icon'></span>
              <input
                type='text'
                name='calle'
                value={user.direccion?.calle || ''}
                onChange={handleAddressChange}
                placeholder='Calle'
                className='cf-edit-user-text-input'
              />
            </div>

            <div className='cf-edit-user-input-field'>
              <span className='cf-edit-user-input-icon cf-edit-user-city-icon'></span>
              <input
                type='text'
                name='ciudad'
                value={user.direccion?.ciudad || ''}
                onChange={handleAddressChange}
                placeholder='Ciudad'
                className='cf-edit-user-text-input'
              />
            </div>

            <div className='cf-edit-user-input-field'>
              <span className='cf-edit-user-input-icon cf-edit-user-postal-icon'></span>
              <input
                type='text'
                name='codigoPostal'
                value={user.direccion?.codigoPostal || ''}
                onChange={handleAddressChange}
                placeholder='Código Postal'
                className='cf-edit-user-text-input'
              />
            </div>

            <div className='cf-edit-user-input-field'>
              <span className='cf-edit-user-input-icon cf-edit-user-country-icon'></span>
              <input
                type='text'
                name='pais'
                value={user.direccion?.pais || ''}
                onChange={handleAddressChange}
                placeholder='País'
                className='cf-edit-user-text-input'
              />
            </div>
          </div>

          <button
            type='submit'
            disabled={isSubmitting}
            className='cf-edit-user-submit-button'
          >
            <span className={isSubmitting ? 'cf-edit-user-hidden-text' : ''}>
              Actualizar Perfil
              <span className='cf-edit-user-arrow-right'></span>
            </span>

            {isSubmitting && (
              <div className='cf-edit-user-loader-wrapper'>
                <div className='cf-edit-user-spinner'></div>
              </div>
            )}

            <div className='cf-edit-user-progress-container'>
              <div className='cf-edit-user-progress-indicator'></div>
            </div>
          </button>

          <button
            type='button'
            onClick={() => navigate('/dashboard')}
            className='cf-edit-user-cancel-button'
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditUser
