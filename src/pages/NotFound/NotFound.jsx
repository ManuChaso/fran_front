import { Link } from 'react-router-dom'
import { memo } from 'react'
import Header from '../../components/Header/Header'
import './NotFound.css'

const NotFound = () => {
  return (
    <div className='not-found-container'>
      <Header />
      <h1 className='not-found-title'>404</h1>
      <h2 className='not-found-subtitle'>Página no encontrada</h2>
      <p className='not-found-text'>
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>
      <Link to='/' className='not-found-button'>
        Volver al inicio
      </Link>
    </div>
  )
}

export default memo(NotFound)
