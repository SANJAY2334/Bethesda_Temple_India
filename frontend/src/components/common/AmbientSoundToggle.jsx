import { useEffect, useRef, useState } from 'react'
import { Bell, BellOff } from 'lucide-react'

export function AmbientSoundToggle() {
  const [enabled, setEnabled] = useState(false)
  const contextRef = useRef(null)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!enabled) {
      window.clearInterval(intervalRef.current)
      contextRef.current?.close()
      contextRef.current = null
      return undefined
    }

    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return undefined
    const context = new AudioContext()
    contextRef.current = context

    const playBell = () => {
      const osc = context.createOscillator()
      const gain = context.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(392, context.currentTime)
      gain.gain.setValueAtTime(0.0001, context.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.045, context.currentTime + 0.08)
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 2.4)
      osc.connect(gain).connect(context.destination)
      osc.start()
      osc.stop(context.currentTime + 2.5)
    }

    playBell()
    intervalRef.current = window.setInterval(playBell, 18000)
    return () => window.clearInterval(intervalRef.current)
  }, [enabled])

  return (
    <button
      type="button"
      onClick={() => setEnabled((value) => !value)}
      className="fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-full border border-white/70 bg-white/70 text-[#18324a] shadow-xl shadow-[#7ca8c8]/20 backdrop-blur-xl transition hover:-translate-y-0.5"
      aria-label={enabled ? 'Turn ambient bell sound off' : 'Turn ambient bell sound on'}
      title={enabled ? 'Ambient bell on' : 'Ambient bell off'}
    >
      {enabled ? <Bell size={19} /> : <BellOff size={19} />}
    </button>
  )
}
