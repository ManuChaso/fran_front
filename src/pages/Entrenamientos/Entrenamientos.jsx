import React from 'react'
import Header from '../../components/Header/Header'
import './Entrenamientos.css'

import entrenamiento1 from '../../assets/imagenes/entrenamiento1.jpg'
import entrenamiento2 from '../../assets/imagenes/entrenamiento2.jpg'
import entrenamiento3 from '../../assets/imagenes/entrenamiento3.jpg'
import entrenamiento4 from '../../assets/imagenes/entrenamiento4.jpg'
import entrenamiento5 from '../../assets/imagenes/entrenamiento5.jpg'
import entrenamiento6 from '../../assets/imagenes/entrenamiento6.jpg'
import entrenamiento7 from '../../assets/imagenes/entrenamiento7.webp'
import entrenamiento8 from '../../assets/imagenes/entrenamiento8.jpg'
import entrenamiento9 from '../../assets/imagenes/entrenamiento9.jpg'
import entrenamiento10 from '../../assets/imagenes/entrenamientto10.jpg'

const entrenamientos = [
  {
    id: 1,
    nombre: 'Entrenamiento Full Body',
    descripcion:
      'Un entrenamiento que trabaja todo el cuerpo, incluyendo cardio, fuerza y flexibilidad.',
    duracion: '60 minutos',
    imagen: entrenamiento1
  },
  {
    id: 2,
    nombre: 'Entrenamiento de Fuerza',
    descripcion:
      'Enfocado en aumentar la fuerza muscular con ejercicios de levantamiento de pesas.',
    duracion: '45 minutos',
    imagen: entrenamiento2
  },
  {
    id: 3,
    nombre: 'Entrenamiento HIIT',
    descripcion:
      'Entrenamiento de intervalos de alta intensidad para quemar grasa rápidamente.',
    duracion: '30 minutos',
    imagen: entrenamiento3
  },
  {
    id: 4,
    nombre: 'Entrenamiento de Resistencia',
    descripcion:
      'Entrenamiento de resistencia con bandas y ejercicios de cuerpo libre.',
    duracion: '50 minutos',
    imagen: entrenamiento4
  },
  {
    id: 5,
    nombre: 'Entrenamiento Core',
    descripcion:
      'Entrenamiento para fortalecer el core (zona abdominal y lumbar).',
    duracion: '40 minutos',
    imagen: entrenamiento5
  },
  {
    id: 6,
    nombre: 'Entrenamiento de Agilidad',
    descripcion: 'Mejora tu agilidad con ejercicios de rapidez y coordinación.',
    duracion: '35 minutos',
    imagen: entrenamiento6
  },
  {
    id: 7,
    nombre: 'Entrenamiento para Principiantes',
    descripcion: 'Entrenamiento básico para quienes inician en CrossFit.',
    duracion: '50 minutos',
    imagen: entrenamiento7
  },
  {
    id: 8,
    nombre: 'Entrenamiento de Flexibilidad',
    descripcion:
      'Enfocado en mejorar la flexibilidad con estiramientos profundos.',
    duracion: '30 minutos',
    imagen: entrenamiento8
  },
  {
    id: 9,
    nombre: 'Entrenamiento Cardio',
    descripcion:
      'Entrenamiento cardiovascular para mejorar resistencia y quemar grasa.',
    duracion: '60 minutos',
    imagen: entrenamiento9
  },
  {
    id: 10,
    nombre: 'Entrenamiento para Fuerza Explosiva',
    descripcion:
      'Entrenamiento para mejorar la fuerza explosiva y la potencia muscular.',
    duracion: '45 minutos',
    imagen: entrenamiento10
  }
]

const Entrenamientos = () => {
  return (
    <div className='entrenamientos-container'>
      <Header />
      <h1 className='titulo'>Entrenamientos de CrossFit</h1>
      <div className='entrenamientos-grid'>
        {entrenamientos.map((entrenamiento) => (
          <div key={entrenamiento.id} className='entrenamiento-card'>
            <img
              src={entrenamiento.imagen}
              alt={entrenamiento.nombre}
              className='entrenamiento-image'
            />
            <div className='card-content'>
              <h2 className='entrenamiento-nombre'>{entrenamiento.nombre}</h2>
              <p className='entrenamiento-descripcion'>
                {entrenamiento.descripcion}
              </p>
              <p className='entrenamiento-duracion'>
                <strong>Duración:</strong> {entrenamiento.duracion}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Entrenamientos
