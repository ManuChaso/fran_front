import Header from '../../components/Header/Header'
import './Home.css'
import { motion } from 'framer-motion'
import crossfitVideo from '../../assets/videos/videocrossfit.mp4'

const Home = () => {
  return (
    <div className='home'>
      <Header />
      <main className='main-content'>
        <div className='video-container'>
          <video
            className='background-video'
            src={crossfitVideo}
            autoPlay
            loop
            muted
          />
        </div>
        <motion.div
          className='motivation-text'
          animate={{
            scale: [1, 1.1, 1],
            textShadow: [
              '0 0 10px #ff0000',
              '0 0 20px #ff0000',
              '0 0 10px #ff0000'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <h2>SUPERA TUS LÍMITES</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='overlay'
        >
          <h1>CROSSFIT: ROMPE TUS BARRERAS</h1>
          <p>Descubre la mejor comunidad de entrenamiento.</p>
        </motion.div>
      </main>

      <section className='crossfit-animations'>
        <div className='animation-container'>
          <motion.div
            className='barbell'
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className='bar'></div>
            <div className='plate left'></div>
            <div className='plate right'></div>
          </motion.div>
        </div>

        <div className='animation-container'>
          <motion.div
            className='kettlebell'
            animate={{ rotate: [-45, 45, -45], y: [0, -50, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className='handle'></div>
            <div className='body'></div>
          </motion.div>
        </div>

        <div className='animation-container'>
          <motion.div
            className='athlete'
            animate={{ y: [0, -30, 0], scaleY: [1, 0.9, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className='head'></div>
            <div className='body'></div>
            <div className='legs'></div>
          </motion.div>
        </div>

        <div className='icon-container'>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          >
            <div className='animated-box'></div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
