import { useRef, useState } from 'react'
import './App.css'
import Countdown from 'react-countdown'

function App() {
  const [time, setTime] = useState(10000)
  const [startKey, setStartKey] = useState(0)
  const audioRef = useRef(null)


  const lunchTime = 4320000

  const startCountdown = () => {
    setTime(lunchTime)
    setStartKey(prev => prev + 1)

    if (audioRef.current) {
      audioRef.current.play().then(() => {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }).catch(err => {
        console.log('Som preparado, mas não tocado ainda:', err)
      })
    }
  }


  const handleComplete = () => {
    alert('Hora de voltar! O tempo do almoço acabou.')
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.log('Erro ao tocar áudio:', err))
    }
  }

  return (
    <main className='flex justify-center items-center h-screen flex-col'>
      <Countdown
        key={startKey}
        date={Date.now() + time}
        onComplete={handleComplete}
      />
      <button
        onClick={startCountdown}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Start
      </button>
      <audio ref={audioRef} src="/loud_alarm_sound.mp3" preload="auto" />
    </main>
  )
}

export default App
