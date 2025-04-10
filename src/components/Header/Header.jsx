/*import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Button from '../Button/Button'
import './Header.css'
import logo from '../../assets/imagenes/logoalex.jpg'
import { Menu, X } from 'lucide-react'

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('rol')?.toLowerCase().trim()

    setIsAuthenticated(!!token)
    setUserRole(role)
  }, [])

  return (
    <header className='headerheader'>
      <div className='header-content'>
        <img src={logo || '/placeholder.svg'} alt='Logo' className='logo' />
        <button className='menu-button' onClick={() => setMenuOpen(true)}>
          <Menu size={40} />
        </button>
        <nav className='nav'>
          <Button variant='secondary' size='sm'>
            <Link to='/'>Inicio</Link>
          </Button>
          <Button variant='secondary' size='sm'>
            <Link to='/registro'>Registro o inicio</Link>
          </Button>
          {isAuthenticated ? (
            <>
              <Button variant='primary' size='sm'>
                <Link to='/dashboard'>Mi Dashboard</Link>
              </Button>
              {(userRole === 'administrador' ||
                userRole === 'admin' ||
                userRole === 'creador') && (
                <Button variant='primary' size='sm'>
                  <Link to='/administracion'>Administración</Link>
                </Button>
              )}
            </>
          ) : (
            <Button variant='primary' size='sm'>
              <Link to='/iniciar-sesion'>Iniciar Sesión</Link>
            </Button>
          )}
          <Button variant='secondary' size='sm'>
            <Link to='/clases'>Clases</Link>
          </Button>
          <Button variant='secondary' size='sm'>
            <Link to='/productos'>Productos</Link>
          </Button>
          <Button variant='secondary' size='sm'>
            <Link to='/contacto'>Contacto</Link>
          </Button>
          <Button variant='secondary' size='sm'>
            <Link to='/precios'>Precios</Link>
          </Button>
          <Button variant='secondary' size='sm'>
            <Link to='/entrenamientos'>Entrenamientos</Link>
          </Button>
        </nav>
      </div>

      <div className={`mobile-menu ${menuOpen ? 'active' : ''}`}>
        <button className='close-button' onClick={() => setMenuOpen(false)}>
          <X size={40} />
        </button>
        <nav className='mobile-nav'>
          <Link to='/' onClick={() => setMenuOpen(false)}>
            Inicio
          </Link>
          <Link to='/registro' onClick={() => setMenuOpen(false)}>
            Registro o inicio
          </Link>
          {isAuthenticated && (
            <Link to='/dashboard' onClick={() => setMenuOpen(false)}>
              Mi Dashboard
            </Link>
          )}
          {(userRole === 'administrador' ||
            userRole === 'admin' ||
            userRole === 'creador') && (
            <Link to='/administracion' onClick={() => setMenuOpen(false)}>
              Administración
            </Link>
          )}
          <Link to='/clases' onClick={() => setMenuOpen(false)}>
            Clases
          </Link>
          <Link to='/productos' onClick={() => setMenuOpen(false)}>
            Productos
          </Link>
          <Link to='/contacto' onClick={() => setMenuOpen(false)}>
            Contacto
          </Link>
          <Link to='/precios' onClick={() => setMenuOpen(false)}>
            Precios
          </Link>
          <Link to='/entrenamientos' onClick={() => setMenuOpen(false)}>
            Entrenamientos
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header*/

import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Button from '../Button/Button'
import './Header.css'
import logo from '../../assets/imagenes/logoalex.jpg'

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const location = useLocation()

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token')
      const role = localStorage.getItem('rol')?.toLowerCase().trim()

      setIsAuthenticated(!!token)
      setUserRole(role)
    }

    checkAuth()

    window.addEventListener('storage', checkAuth)

    return () => window.removeEventListener('storage', checkAuth)
  }, [])

  useEffect(() => {
    const forceRepaint = () => {
      const el = document.body
      el.style.display = 'none'
      void el.offsetHeight
      el.style.display = ''
    }

    forceRepaint()
  }, [location.pathname])

  return (
    <header className='headerheader'>
      <div className='header-content'>
        <img src={logo || '/placeholder.svg'} alt='Logo' className='logo' />
        <nav className='nav'>
          <Button variant='secondary' size='sm'>
            <Link to='/'>Inicio</Link>
          </Button>

          {!isAuthenticated && (
            <Button variant='secondary' size='sm'>
              <Link to='/registro'>Registro o inicio</Link>
            </Button>
          )}

          <Button variant='secondary' size='sm'>
            <Link to='/videos'>Videos</Link>
          </Button>

          {isAuthenticated && (
            <>
              <Button variant='primary' size='sm'>
                <Link to='/dashboard'>Mi Dashboard</Link>
              </Button>

              {(userRole === 'administrador' ||
                userRole === 'admin' ||
                userRole === 'creador') && (
                <Button variant='primary' size='sm'>
                  <Link to='/administracion'>Administración</Link>
                </Button>
              )}
            </>
          )}

          <Button variant='secondary' size='sm'>
            <Link to='/clases'>Clases</Link>
          </Button>

          <Button variant='secondary' size='sm'>
            <Link to='/productos'>Productos</Link>
          </Button>

          <Button variant='secondary' size='sm'>
            <Link to='/contacto'>Contacto</Link>
          </Button>

          <Button variant='secondary' size='sm'>
            <Link to='/precios'>Precios</Link>
          </Button>

          <Button variant='secondary' size='sm'>
            <Link to='/entrenamientos'>Entrenamientos</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}

export default Header
