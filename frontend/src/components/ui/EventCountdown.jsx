import { useEffect, useMemo, useState } from 'react'

function getParts(target) {
  const diff = Math.max(new Date(target).getTime() - Date.now(), 0)
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    mins: Math.floor((diff / 60000) % 60),
  }
}

export function EventCountdown({ date }) {
  const [parts, setParts] = useState(() => getParts(date))
  const items = useMemo(() => Object.entries(parts), [parts])

  useEffect(() => {
    const timer = window.setInterval(() => setParts(getParts(date)), 60000)
    return () => window.clearInterval(timer)
  }, [date])

  return (
    <div className="mt-5 grid grid-cols-3 gap-2">
      {items.map(([label, value]) => (
        <div key={label} className="rounded-2xl bg-[#fff9d2]/70 p-3 text-center">
          <div className="text-xl font-bold text-[#18324a]">{value}</div>
          <div className="text-xs uppercase tracking-[0.18em] text-[#6d7d8a]">{label}</div>
        </div>
      ))}
    </div>
  )
}
