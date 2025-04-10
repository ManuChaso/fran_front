import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import handleSubmitHelper from '../../utils/HandleSubmit'
import './Contacto.css'

const Contacto = () => {
  const [mensajeEnviado, setMensajeEnviado] = useState(false)
  /*
  const handleSubmit = (e) => {
    e.preventDefault()
    setMensajeEnviado(true)
  }*/

  const handleSubmit = (e) => {
    handleSubmitHelper(e, 'contacto', { setMensajeEnviado })
  }

  const handleNuevoMensaje = () => {
    setMensajeEnviado(false)
  }

  const [faqActivo, setFaqActivo] = useState(null)
  const toggleFAQ = (index) => {
    setFaqActivo(faqActivo === index ? null : index)
  }

  const preguntasFrecuentes = [
    {
      pregunta: '¿Qué es CrossFit?',
      respuesta:
        'CrossFit es un programa de entrenamiento de alta intensidad que combina ejercicios funcionales de diversas disciplinas.'
    },
    {
      pregunta: '¿Necesito experiencia previa?',
      respuesta:
        'No, nuestros entrenamientos se adaptan a cualquier nivel, desde principiantes hasta avanzados.'
    },
    {
      pregunta: '¿Cuánto dura una clase?',
      respuesta:
        'Cada sesión dura aproximadamente 60 minutos, incluyendo calentamiento, entrenamiento y estiramiento.'
    },
    {
      pregunta: '¿Cuántas veces a la semana debo entrenar?',
      respuesta:
        'Recomendamos entre 3 a 5 sesiones por semana para obtener los mejores resultados.'
    }
  ]

  const testimonios = [
    {
      nombre: 'Carlos Martínez',
      comentario:
        'Gracias a CrossFit, he mejorado mi resistencia y fuerza. ¡Entrenamientos increíbles!',
      imagen:
        'https://www.blogdelfotografo.com/wp-content/uploads/2022/01/retrato-anillo-luz.webp'
    },
    {
      nombre: 'Laura Sánchez',
      comentario:
        'Nunca pensé que podría levantar tanto peso. La comunidad aquí es espectacular.',
      imagen:
        'https://i.pinimg.com/236x/e8/fd/15/e8fd158ff73599778d125120421af8ae.jpg'
    },
    {
      nombre: 'Pedro López',
      comentario:
        'El mejor gimnasio en el que he estado, los entrenadores son geniales.',
      imagen:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwr_zZjgvmu4BccwDNIHic8K5dyehw7cSYA&s'
    }
  ]

  return (
    <>
      <div className='contacto-container'>
        <Header />
        <h1 className='contacto-titulo'>📞 ¡Contáctanos Hoy!</h1>

        <div className='contacto-secciones'>
          <div className='contacto-info'>
            <h2>📍 Nuestra Ubicación</h2>
            <p>
              🏠 Calle Narciso Monturiol 11, San jose de la Rinconada, España
            </p>
            <p>📞 Teléfono: +34 647 40 69 38</p>
            <p>📧 Email: contacto@crosfitgym.com</p>

            <div className='contacto-mapa'>
              <iframe
                title='Ubicación Gimnasio'
                src='https://www.google.com/maps/embed?...'
                allowFullScreen
                loading='lazy'
              ></iframe>
            </div>
          </div>

          <div className='contacto-formulario'>
            {!mensajeEnviado ? (
              <>
                <h2>📩 Envíanos un Mensaje</h2>
                <form onSubmit={handleSubmit}>
                  <div className='form-group'>
                    <label htmlFor='nombre'>Nombre</label>
                    <input
                      type='text'
                      id='nombre'
                      placeholder='Tu nombre'
                      required
                    />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input
                      type='email'
                      id='email'
                      placeholder='Tu correo electrónico'
                      required
                    />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='mensaje'>Mensaje</label>
                    <textarea
                      id='mensaje'
                      rows='4'
                      placeholder='Escribe tu mensaje'
                      required
                    ></textarea>
                  </div>

                  <button type='submit' className='boton-enviar'>
                    Enviar mensaje
                  </button>
                </form>
              </>
            ) : (
              <div className='mensaje-exito'>
                🎉 ¡Gracias por tu mensaje! Te contactaremos pronto. 😊
                <button
                  onClick={handleNuevoMensaje}
                  className='boton-nuevo-mensaje'
                >
                  Mandar otro mensaje
                </button>
              </div>
            )}
          </div>
        </div>

        <div className='faq-container'>
          <h2>❓ Preguntas Frecuentes</h2>
          {preguntasFrecuentes.map((faq, index) => (
            <div key={index} className='faq-item'>
              <button className='faq-pregunta' onClick={() => toggleFAQ(index)}>
                {faq.pregunta} {faqActivo === index ? '🔼' : '🔽'}
              </button>
              {faqActivo === index && (
                <p className='faq-respuesta'>{faq.respuesta}</p>
              )}
            </div>
          ))}
        </div>

        <div className='testimonios-container'>
          <h2>💪 Testimonios de Nuestros Clientes</h2>
          <div className='testimonios-grid'>
            {testimonios.map((testimonio, index) => (
              <div key={index} className='testimonio-card'>
                <img src={testimonio.imagen} alt={testimonio.nombre} />
                <p className='testimonio-texto'>"{testimonio.comentario}"</p>
                <h4 className='testimonio-nombre'>- {testimonio.nombre}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Contacto
