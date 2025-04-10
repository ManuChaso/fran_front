/*import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import { iniciarSesion } from '../../services/Api/index'

import './iniciarsesion.css'

const Iniciarsesion = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await iniciarSesion(formData.email, formData.password)

      if (response.ok) {
        const { data } = response.data
        localStorage.setItem('token', data.token)
        localStorage.setItem('nombre', data.nombre)
        localStorage.setItem('rol', data.rol)

        setTimeout(() => {
          navigate('/dashboard')
        }, 500)
      } else {
        alert(response.data.message || 'Error en el inicio de sesión')
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error)
      alert('Error en la conexión con el servidor')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='login-page'>
      <Header />
      <div className='animation-wrapper'>
        <div className='dumbbell-anim'></div>
        <div className='kettlebell-anim'></div>
        <div className='barbell-anim'></div>
      </div>

      <div
        className={`form-wrapper ${animationComplete ? 'form-visible' : ''}`}
      >
        <div className='logo-wrapper'>
          <div className='dumbbell-logo'></div>
        </div>

        <h2 className='login-heading'>Iniciar Sesión</h2>

        <form onSubmit={handleSubmit} className='login-form'>
          <div className='input-wrapper'>
            <div className='input-field'>
              <span className='input-icon user-icon'></span>
              <input
                type='email'
                name='email'
                placeholder='Correo electrónico'
                value={formData.email}
                onChange={handleChange}
                required
                className='text-input'
                autoComplete='email'
              />
            </div>

            <div className='input-field'>
              <span className='input-icon lock-icon'></span>
              <input
                type='password'
                name='password'
                placeholder='Contraseña'
                value={formData.password}
                onChange={handleChange}
                required
                className='text-input'
                autoComplete='current-password'
              />
            </div>
          </div>

          <button type='submit' disabled={isLoading} className='submit-button'>
            <span className={isLoading ? 'hidden-text' : ''}>
              Iniciar Sesión
              <span className='arrow-right'></span>
            </span>

            {isLoading && (
              <div className='loader-wrapper'>
                <div className='spinner'></div>
              </div>
            )}

            <div className='progress-container'>
              <div className='progress-indicator'></div>
            </div>
          </button>
        </form>

        <p className='signup-text'>
          ¿No tienes una cuenta?{' '}
          <span onClick={() => navigate('/registro')} className='signup-link'>
            Regístrate aquí
          </span>
        </p>
      </div>
    </div>
  )
}

export default Iniciarsesion*/
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import handleSubmitHelper from '../../utils/HandleSubmit'

import './iniciarsesion.css'

const Iniciarsesion = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    handleSubmitHelper(e, 'login', {
      formData,
      setIsLoading,
      navigate
    })
  }

  return (
    <div className='login-page'>
      <Header />
      <div className='animation-wrapper'>
        <div className='dumbbell-anim'></div>
        <div className='kettlebell-anim'></div>
        <div className='barbell-anim'></div>
      </div>

      <div
        className={`form-wrapper ${animationComplete ? 'form-visible' : ''}`}
      >
        <div className='logo-wrapper'>
          <div className='dumbbell-logo'></div>
        </div>

        <h2 className='login-heading'>Iniciar Sesión</h2>

        <form onSubmit={handleSubmit} className='login-form'>
          <div className='input-wrapper'>
            <div className='input-field'>
              <span className='input-icon user-icon'></span>
              <input
                type='email'
                name='email'
                placeholder='Correo electrónico'
                value={formData.email}
                onChange={handleChange}
                required
                className='text-input'
                autoComplete='email'
              />
            </div>

            <div className='input-field'>
              <span className='input-icon lock-icon'></span>
              <input
                type='password'
                name='password'
                placeholder='Contraseña'
                value={formData.password}
                onChange={handleChange}
                required
                className='text-input'
                autoComplete='current-password'
              />
            </div>
          </div>

          <button type='submit' disabled={isLoading} className='submit-button'>
            <span className={isLoading ? 'hidden-text' : ''}>
              Iniciar Sesión
              <span className='arrow-right'></span>
            </span>

            {isLoading && (
              <div className='loader-wrapper'>
                <div className='spinner'></div>
              </div>
            )}

            <div className='progress-container'>
              <div className='progress-indicator'></div>
            </div>
          </button>
        </form>

        <p className='signup-text'>
          ¿No tienes una cuenta?{' '}
          <span onClick={() => navigate('/registro')} className='signup-link'>
            Regístrate aquí
          </span>
        </p>
      </div>
    </div>
  )
}

export default Iniciarsesion
