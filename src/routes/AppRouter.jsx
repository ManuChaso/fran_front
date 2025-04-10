/*import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Register from '../pages/Register/Registro/Register'
import Clases from '../pages/Clases/Clases'
import Entrenamientos from '../pages/Entrenamientos/Entrenamientos'
import Contacto from '../pages/Contactos/Contacto'
import UserDashboard from '../pages/Register/sections/Dashboard/UserDashboard'
import Medico from '../pages/Register/sections/Medico/Medico'
import Aspecto from '../pages/Register/sections/Aspecto/features/physical-stats/pages/Aspecto'
import Marcas from '../pages/Register/sections/Marcas/page/Marcas'
import Iniciarsesion from '../pages/Iniciar Sesion/iniciarsesion'
import Productos from '../pages/Productos/Productos'
import Precios from '../pages/Precios/Precios'
import Administracion from '../pages/Administracion/Administracion/Administracion'
import AdminClases from '../pages/Administracion/AdminClases/AdminClases'
import AdminProductos from '../pages/Administracion/AdminProductos/components/pages/AdminProductos/AdminProductos'
import AdminUsuarios from '../pages/Administracion/AdminUsuarios/AdminUsuarios'
import AdminConsentimientos from '../pages/Administracion/AdminConsentimientos/AdminConsentimientos'
import Chat from '../pages/Register/sections/Chat/Chat'
import EditarPerfil from '../pages/EditUser/EditUser'
import MedicalInfoList from '../pages/Administracion/AdministracionMedico/MedicalinfoList'
import Videos from '../pages/Videos/Videos'
import AdminUsuarioClases from '../pages/Administracion/AdminUsuarios/AdminUsuarioClases/AdminUsuarioClases'
import AdminUsuarioMensajes from '../pages/Administracion/AdminUsuarios/AdminUsuarioMensajePrivado/AdminUsuarioMensajePrivado'
import UserMensajes from '../pages/Administracion/AdminUsuarios/AdminUsuarioMensajePrivado/AdminUsuarioMensajePrivado'
import NotFound from '../pages/NotFound/NotFound'

import {
  PhysicalStatsProvider,
  PhysicalStatsPage
} from '../pages/Register/sections/Aspecto/features/physical-stats'

const AppRouter = () => {
  return (
    <Router>
      <PhysicalStatsProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/registro' element={<Register />} />
          <Route path='/iniciar-sesion' element={<Iniciarsesion />} />
          <Route path='/clases' element={<Clases />} />
          <Route path='/productos' element={<Productos />} />
          <Route path='/contacto' element={<Contacto />} />
          <Route path='/precios' element={<Precios />} />
          <Route path='/entrenamientos' element={<Entrenamientos />} />
          <Route path='/administracion' element={<Administracion />} />
          <Route path='/videos' element={<Videos />} />

          <Route path='/administracion/clases' element={<AdminClases />} />
          <Route
            path='/administracion/productos'
            element={<AdminProductos />}
          />
          <Route path='/administracion/usuarios' element={<AdminUsuarios />} />
          <Route path='/admin/medical-info' element={<MedicalInfoList />} />
          <Route
            path='/administracion/consentimientos'
            element={<AdminConsentimientos />}
          />
          <Route
            path='/admin/usuario/:userId/clases'
            element={<AdminUsuarioClases />}
          />

          <Route
            path='/admin/usuario/:userId/mensajes'
            element={<AdminUsuarioMensajes />}
          />

          <Route path='/dashboard' element={<UserDashboard />} />
          <Route path='/dashboard/medico' element={<Medico />} />
          <Route path='/dashboard/aspecto' element={<Aspecto />} />
          <Route path='/physical-stats' element={<PhysicalStatsPage />} />
          <Route path='/dashboard/marcas' element={<Marcas />} />
          <Route path='/dashboard/chat' element={<Chat />} />

          <Route path='/dashboard/mensajes' element={<UserMensajes />} />
          <Route
            path='/dashboard/editar-perfil/:id'
            element={<EditarPerfil />}
          />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </PhysicalStatsProvider>
    </Router>
  )
}

export default AppRouter*/
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Register from '../pages/Register/Registro/Register'
import Clases from '../pages/Clases/Clases'
import Entrenamientos from '../pages/Entrenamientos/Entrenamientos'
import Contacto from '../pages/Contactos/Contacto'
import UserDashboard from '../pages/Register/sections/Dashboard/UserDashboard'
import Medico from '../pages/Register/sections/Medico/Medico'
import Aspecto from '../pages/Register/sections/Aspecto/features/physical-stats/pages/Aspecto'
import Marcas from '../pages/Register/sections/Marcas/page/Marcas'
import Iniciarsesion from '../pages/Iniciar Sesion/iniciarsesion'
import Productos from '../pages/Productos/Productos'
import Precios from '../pages/Precios/Precios'
import Administracion from '../pages/Administracion/Administracion/Administracion'
import AdminClases from '../pages/Administracion/AdminClases/AdminClases'
import AdminProductos from '../pages/Administracion/AdminProductos/components/pages/AdminProductos/AdminProductos'
import AdminUsuarios from '../pages/Administracion/AdminUsuarios/AdminUsuarios'
import AdminConsentimientos from '../pages/Administracion/AdminConsentimientos/AdminConsentimientos'
import Chat from '../pages/Register/sections/Chat/Chat'
import EditarPerfil from '../pages/EditUser/EditUser'
import MedicalInfoList from '../pages/Administracion/AdministracionMedico/MedicalinfoList'
import Videos from '../pages/Videos/Videos'
import AdminUsuarioClases from '../pages/Administracion/AdminUsuarios/AdminUsuarioClases/AdminUsuarioClases'
import AdminUsuarioMensajePrivado from '../pages/Administracion/AdminUsuarios/AdminUsuarioMensajePrivado/AdminUsuarioMensajePrivado'
import UserMensajes from '../pages/Register/sections/UsuarioMensajePrivado/UsuarioMensajePrivado'
import NotFound from '../pages/NotFound/NotFound'

import {
  PhysicalStatsProvider,
  PhysicalStatsPage
} from '../pages/Register/sections/Aspecto/features/physical-stats'

const AppRouter = () => {
  return (
    <Router>
      <PhysicalStatsProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/registro' element={<Register />} />
          <Route path='/iniciar-sesion' element={<Iniciarsesion />} />
          <Route path='/clases' element={<Clases />} />
          <Route path='/productos' element={<Productos />} />
          <Route path='/contacto' element={<Contacto />} />
          <Route path='/precios' element={<Precios />} />
          <Route path='/entrenamientos' element={<Entrenamientos />} />
          <Route path='/administracion' element={<Administracion />} />
          <Route path='/videos' element={<Videos />} />

          <Route path='/administracion/clases' element={<AdminClases />} />
          <Route
            path='/administracion/productos'
            element={<AdminProductos />}
          />
          <Route path='/administracion/usuarios' element={<AdminUsuarios />} />
          <Route path='/admin/medical-info' element={<MedicalInfoList />} />
          <Route
            path='/administracion/consentimientos'
            element={<AdminConsentimientos />}
          />
          <Route
            path='/admin/usuario/:userId/clases'
            element={<AdminUsuarioClases />}
          />
          <Route
            path='/admin/usuario/:userId/mensajes'
            element={<AdminUsuarioMensajePrivado />}
          />

          <Route path='/dashboard' element={<UserDashboard />} />
          <Route path='/dashboard/medico' element={<Medico />} />
          <Route path='/dashboard/aspecto' element={<Aspecto />} />
          <Route path='/physical-stats' element={<PhysicalStatsPage />} />
          <Route path='/dashboard/marcas' element={<Marcas />} />
          <Route path='/dashboard/chat' element={<Chat />} />
          <Route path='/dashboard/mensajes' element={<UserMensajes />} />
          <Route
            path='/dashboard/editar-perfil/:id'
            element={<EditarPerfil />}
          />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </PhysicalStatsProvider>
    </Router>
  )
}

export default AppRouter
