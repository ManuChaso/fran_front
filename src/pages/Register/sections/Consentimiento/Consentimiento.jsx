import { useState, useRef, useEffect } from 'react'
import './Consentimiento.css'
import { guardarConsentimiento } from '../../../../services/Api'

const Consentimiento = ({ onConsentAccepted }) => {
  const [aceptado, setAceptado] = useState(false)
  const [autorizaImagen, setAutorizaImagen] = useState(null)
  const contentRef = useRef(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    try {
      const userString = localStorage.getItem('user')
      if (userString) {
        const user = JSON.parse(userString)
        if (user && user._id) {
          console.log('UserId obtenido del localStorage (user):', user._id)
          setUserId(user._id)
          return
        }
      }

      const storedUserId = localStorage.getItem('userId')
      if (storedUserId) {
        console.log('UserId obtenido del localStorage (userId):', storedUserId)
        setUserId(storedUserId)
        return
      }

      console.error('No se encontró userId en localStorage')
      setError(
        'No se pudo identificar al usuario. Por favor, inicie sesión nuevamente.'
      )
    } catch (err) {
      console.error('Error al obtener userId del localStorage:', err)
      setError(
        'Error al identificar al usuario. Por favor, inicie sesión nuevamente.'
      )
    }
  }, [])

  const handleAccept = async () => {
    if (autorizaImagen === null) {
      setError('Por favor, seleccione si autoriza o no el uso de su imagen')
      return
    }

    if (!userId) {
      setError(
        'Error: No se pudo identificar al usuario. Por favor, inicie sesión nuevamente.'
      )
      console.error('Error: userId no disponible')
      return
    }

    setError(null)
    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error(
          'No hay token disponible. Por favor, inicie sesión nuevamente.'
        )
      }

      console.log('Enviando consentimiento con userId:', userId)

      const response = await guardarConsentimiento(
        {
          userId,
          aceptado: true,
          autorizaImagen,
          fechaAceptacion: new Date()
        },
        token
      )

      console.log('Consentimiento guardado:', response)

      setAceptado(true)
      onConsentAccepted()
    } catch (err) {
      console.error('Error al guardar el consentimiento:', err)
      setError(
        'Hubo un error al guardar su consentimiento. Por favor, inténtelo de nuevo.'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleAutorizaImagen = (value) => {
    setAutorizaImagen(value)
    setError(null)
  }

  return (
    <div className='consentimiento-container'>
      {!aceptado ? (
        <>
          <div className='consent-header'>
            <h2 className='consent-title'>CONSENTIMIENTO INFORMADO</h2>
            <div className='progress-indicator'>
              <div className='progress-bar' style={{ width: `` }}></div>
            </div>
          </div>

          <div className='consent-content' ref={contentRef}>
            <div className='consent-section'>
              <h3>CENTRO DEPORTIVO ADERCROSSFIT</h3>
              <p className='subtitle'>
                Manuel Alexandre Atienza Sobrino 45654031-C
              </p>
              <h4>CONSENTIMIENTO INFORMADO Y AUTORIZACION DE IMAGEN</h4>
            </div>

            <div className='consent-section'>
              <div className='consent-text'>
                <p>
                  Yo, con D.N.I. mayor de edad [y/o como padre/madre/tutor del
                  menor con D.N.I. AUTORIZO] y (me) considero física y
                  psicológicamente apto y estoy de acuerdo en participar en uno
                  o más programas de aptitud física(s)/clase(s) o entrenamientos
                  libres realizados por EL CENTRO DEPORTIVO ADERCROSSFIT (en
                  adelante EL CENTRO) que puede incluir, pero no necesariamente
                  limitarse a CrossFit, entrenamientos de alta intensidad y/o
                  entrenamientos de cualquier tipo dirigidos por ENTRENADORES
                  contratados por EL CENTRO al igual que entrenamientos de forma
                  libre.
                </p>

                <p>
                  El CENTRO me hace plenamente consciente de que los programas
                  de aptitud física/clases que ofrece y que YO deseo participar,
                  son de naturaleza agotadoras y de alta intensidad y
                  pueden/podrían empujarme hasta el límite de mis capacidades
                  físicas. Reconozco y entiendo que los programas/clases cuentan
                  con diferentes grados de riesgo que pueden incluir, pero no se
                  limitan sólo a lo siguiente: Lesiones óseas, articulares y/o
                  musculares, en forma más rara problemas cardiacos e infarto y
                  casos extremos fallecimiento o muerte súbita.
                </p>

                <p className='highlight'>
                  Soy consciente de estos riesgos y otros posibles no
                  mencionados y eximo en consecuencia al CENTRO y todos sus
                  trabajadores y colaboradores de cualquier responsabilidad,
                  daño o perjuicio que pueda sufrir en el desarrollo de la
                  actividad, responsabilidad que es asumida en su totalidad por
                  mi parte, renunciando a cualquier tipo de indemnización o
                  retribución económica.
                </p>
              </div>
            </div>

            <div className='consent-section'>
              <h4>PROTECCIÓN DE DATOS</h4>
              <div className='consent-text'>
                <p>
                  Responsable: Identidad: Manuel Alexandre Atienza Sobrino -
                  NIF: 45654031-C Izq, C.P. 41300, San José de la Rinconada,
                  Dir. Fiscal: C/ Córdoba 34 1 Correo electrónico:
                  m.a.atienza360@hotmail.com Teléfono: 627491774
                </p>

                <p>
                  En nombre de la empresa tratamos la información que nos
                  facilita con el fin de prestarles el servicio solicitado,
                  realizar la facturación del mismo. Los datos proporcionados se
                  conservarán mientras se mantenga la relación comercial o
                  durante los años necesarios para cumplir con las obligaciones
                  legales, en virtud de la cual se legitima el tratamiento. Los
                  datos no se cederán a terceros salvo en los casos en que
                  exista una obligación legal o sin su expresa autorización.
                </p>

                <p>
                  Usted tiene derecho a obtener confirmación sobre si estamos
                  tratando sus datos personales, por tanto tiene derecho a
                  acceder a sus datos personales, rectificar los datos inexactos
                  o solicitar su supresión cuando los datos ya no sean
                  necesarios.
                </p>

                <p>
                  Puede ejercer sus derechos mediante escrito dirigido a Manuel
                  Alexandre Atienza Sobrino o por correo electrónico a
                  m.a.atienza360@hotmail.com. La empresa se compromete a dar
                  respuesta a su solicitud en el plazo de un mes ampliable a
                  tres por motivos justificados. Puede ejercitar sus
                  reclamaciones ante la autoridad de control, la Agencia
                  Española de Protección de Datos.
                </p>
              </div>
            </div>

            <div className='consent-section'>
              <h4>AUTORIZACIÓN DE IMAGEN</h4>
              <div className='consent-text'>
                <p>
                  Estoy de acuerdo en permitir al centro, filmaciones en video,
                  y/o imagen de mí con fines publicitarios. En caso de no
                  permitir el uso de lo antes mencionado, estoy de acuerdo que
                  debo informar al CENTRO de ello de forma expresamente escrita.
                </p>

                <div className='authorization-options'>
                  <div
                    className={`option ${
                      autorizaImagen === true ? 'selected' : ''
                    }`}
                    onClick={() => handleAutorizaImagen(true)}
                  >
                    <div className='checkbox'>
                      {autorizaImagen === true && '✓'}
                    </div>
                    <span>Sí autorizo</span>
                  </div>
                  <div
                    className={`option ${
                      autorizaImagen === false ? 'selected' : ''
                    }`}
                    onClick={() => handleAutorizaImagen(false)}
                  >
                    <div className='checkbox'>
                      {autorizaImagen === false && '✓'}
                    </div>
                    <span>NO autorizo</span>
                  </div>
                </div>

                {error && <p className='error-message'>{error}</p>}
              </div>
            </div>
          </div>

          <div className='consent-footer'>
            <button
              className={`accept-button ${
                autorizaImagen === null || loading ? 'disabled' : ''
              }`}
              disabled={autorizaImagen === null || loading}
              onClick={handleAccept}
            >
              {loading ? 'PROCESANDO...' : 'ACEPTAR'}
            </button>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default Consentimiento
