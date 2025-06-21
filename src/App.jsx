import { useRef, useState } from 'react'
import './App.css'
import Countdown from 'react-countdown'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

function App() {
  const [time, setTime] = useState(10000)
  const [startKey, setStartKey] = useState(0)
  const [startTime, setStartTime] = useState(null)
  const [remaining, setRemaining] = useState(0)
  const audioRef = useRef(null)


  const lunchTime = 4320000

  const startCountdown = () => {
    const countdownTime = 4320000
    setTime(countdownTime)
    setStartKey(prev => prev + 1)
    setStartTime(new Date())

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
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.log('Erro ao tocar áudio:', err))
    }
  }

  const renderer = ({ props }) => {
    const remainingTime = props.date - Date.now()
    const totalTime = time
    const percentage = Math.max(0, (remainingTime / totalTime) * 100)

    return (
      <div style={{ width: 200, height: 200 }}>
        <CircularProgressbar
          value={percentage}
          text={`${Math.floor(percentage)}%`}
          styles={buildStyles({
            pathColor: '#3b82f6',
            textColor: '#000',
            trailColor: '#d6d6d6',
          })}
        />
      </div>
    )
  }
  return (
    <main className='flex justify-center items-center h-screen flex-col gap-5'>
      <Countdown
        date={Date.now() + time}
      />
      <Countdown
        key={startKey}
        date={Date.now() + time}
        onComplete={handleComplete}
        renderer={renderer}
      />
      <button
        onClick={startCountdown}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Start
      </button>
      {startTime && (
        <p>Iniciado às: {startTime.toLocaleTimeString()}</p>
      )}
      {startTime && (
        <p>Horário da volta: {new Date(startTime.getTime() + lunchTime).toLocaleTimeString()}</p>
      )}
      <audio ref={audioRef} src="/loud_alarm_sound.mp3" preload="auto" />
    </main>
  )
}

export default App
