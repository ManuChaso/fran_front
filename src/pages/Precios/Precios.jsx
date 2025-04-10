import { useState } from 'react'
import Header from '../../components/Header/Header'
import './Precios.css'

const Precios = () => {
  const [selectedPlan, setSelectedPlan] = useState('mensual')

  const planes = [
    {
      nombre: 'Bono Básico',
      sesiones: 8,
      precio: 40,
      caracteristicas: [
        '8 sesiones mensuales',
        'Evaluación física inicial',
        'Acceso a la app de seguimiento',
        'Casillero durante la sesión'
      ],
      noIncluido: [
        'Sesiones ilimitadas',
        'Programación personalizada',
        'Nutrición personalizada',
        'Acceso 24/7'
      ],
      popular: false
    },
    {
      nombre: 'Bono Estándar',
      sesiones: 12,
      precio: 55,
      caracteristicas: [
        '12 sesiones mensuales',
        'Evaluación física inicial',
        'Acceso a la app de seguimiento',
        'Casillero personal',
        '1 sesión PT al mes'
      ],
      noIncluido: [
        'Sesiones ilimitadas',
        'Programación personalizada',
        'Nutrición personalizada',
        'Acceso 24/7'
      ],
      popular: true
    },
    {
      nombre: 'Bono Premium',
      sesiones: 20,
      precio: 80,
      caracteristicas: [
        '20 sesiones mensuales',
        'Evaluación física mensual',
        'Acceso a la app premium',
        'Casillero personal',
        '2 sesiones PT al mes',
        'Programación básica personalizada'
      ],
      noIncluido: [
        'Sesiones ilimitadas',
        'Nutrición personalizada',
        'Acceso 24/7'
      ],
      popular: false
    },
    {
      nombre: 'Bono Ilimitado',
      sesiones: 'Ilimitadas',
      precio: 120,
      caracteristicas: [
        'Sesiones ilimitadas',
        'Evaluación física mensual',
        'Acceso a la app premium',
        'Casillero personal premium',
        '4 sesiones PT al mes',
        'Programación personalizada',
        'Consulta nutricional básica'
      ],
      noIncluido: ['Plan nutricional completo', 'Acceso 24/7'],
      popular: false
    }
  ]

  return (
    <div className='precios-container'>
      <Header />

      <main className='precios-main'>
        <section className='precios-hero'>
          <h1>Bonos de Sesiones</h1>
          <p>Elige el bono que mejor se adapte a tu rutina de entrenamiento</p>

          <div className='planes-tipo'>
            <button
              className={`plan-btn ${
                selectedPlan === 'mensual' ? 'active' : ''
              }`}
              onClick={() => setSelectedPlan('mensual')}
            >
              Bonos Mensuales
            </button>
            <button
              className={`plan-btn ${
                selectedPlan === 'trimestral' ? 'active' : ''
              }`}
              onClick={() => setSelectedPlan('trimestral')}
            >
              Bonos Trimestrales
            </button>
          </div>
        </section>

        <section className='planes-container'>
          {planes.map((plan, index) => (
            <div
              key={index}
              className={`plan-card ${plan.popular ? 'popular' : ''}`}
            >
              {plan.popular && <div className='popular-badge'>Más Popular</div>}
              <h2>{plan.nombre}</h2>
              <div className='sesiones-info'>
                <span className='sesiones-num'>{plan.sesiones}</span>
                <span className='sesiones-text'>sesiones</span>
              </div>
              <div className='precio'>
                <span className='moneda'>€</span>
                <span className='cantidad'>
                  {selectedPlan === 'trimestral'
                    ? (plan.precio * 3 * 0.9).toFixed(0)
                    : plan.precio}
                </span>
                <span className='periodo'>
                  /{selectedPlan === 'trimestral' ? 'trimestre' : 'mes'}
                </span>
              </div>
              {selectedPlan === 'trimestral' && (
                <div className='precio-ahorro'>
                  Ahorras: €{(plan.precio * 3 * 0.1).toFixed(0)}
                </div>
              )}
              <button
                className={`btn-suscribir ${plan.popular ? 'popular' : ''}`}
              >
                Comenzar Ahora
              </button>
              <div className='caracteristicas'>
                <h3>Incluye:</h3>
                {plan.caracteristicas.map((caracteristica, i) => (
                  <div key={i} className='caracteristica incluido'>
                    <span className='check-icon'>✓</span>
                    <span>{caracteristica}</span>
                  </div>
                ))}
                {plan.noIncluido.map((caracteristica, i) => (
                  <div key={i} className='caracteristica no-incluido'>
                    <span className='x-icon'>×</span>
                    <span>{caracteristica}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className='beneficios'>
          <h2>¿Por qué elegir nuestro Box?</h2>
          <div className='beneficios-grid'>
            <div className='beneficio'>
              <h3>Entrenadores Certificados</h3>
              <p>
                Todos nuestros coaches tienen certificaciones oficiales de
                CrossFit
              </p>
            </div>
            <div className='beneficio'>
              <h3>Comunidad Increíble</h3>
              <p>
                Únete a una comunidad que te apoyará en cada paso del camino
              </p>
            </div>
            <div className='beneficio'>
              <h3>Instalaciones Premium</h3>
              <p>
                Equipamiento de primera calidad y espacios amplios y ventilados
              </p>
            </div>
            <div className='beneficio'>
              <h3>Resultados Garantizados</h3>
              <p>Sistema probado de entrenamiento y seguimiento de progreso</p>
            </div>
          </div>
        </section>

        <section className='faq'>
          <h2>Preguntas Frecuentes</h2>
          <div className='faq-grid'>
            <div className='faq-item'>
              <h3>¿Cómo funcionan los bonos de sesiones?</h3>
              <p>
                Cada bono te da acceso a un número determinado de sesiones
                mensuales que puedes utilizar cuando mejor te convenga.
              </p>
            </div>
            <div className='faq-item'>
              <h3>¿Puedo acumular sesiones no utilizadas?</h3>
              <p>
                Las sesiones no utilizadas no se acumulan para el siguiente mes,
                excepto en casos especiales.
              </p>
            </div>
            <div className='faq-item'>
              <h3>¿Hay permanencia mínima?</h3>
              <p>
                No hay permanencia mínima en los bonos mensuales. Los bonos
                trimestrales tienen 3 meses de compromiso.
              </p>
            </div>
            <div className='faq-item'>
              <h3>¿Qué pasa si quiero más sesiones?</h3>
              <p>
                Puedes adquirir sesiones adicionales o cambiar a un bono
                superior en cualquier momento.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Precios
