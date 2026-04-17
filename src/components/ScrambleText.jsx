import { useEffect, useRef, useState } from 'preact/hooks'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>/\\|[]{}~'

export function ScrambleText({ text, className, style, delay = 0, duration = 1000 }) {
  const [display, setDisplay] = useState(text)
  const [triggered, setTriggered] = useState(false)
  const ref = useRef(null)

  // Trigger on intersection
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!triggered) return
    let raf
    const start = performance.now() + delay
    const end   = start + duration
    const len   = text.length

    function tick(now) {
      if (now < start) { raf = requestAnimationFrame(tick); return }
      const progress = Math.min((now - start) / duration, 1)
      const resolved = Math.floor(progress * len)

      setDisplay(
        text.split('').map((char, i) => {
          if (char === ' ' || char === '—' || char === '.') return char
          if (i < resolved) return char
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        }).join('')
      )

      if (progress < 1) raf = requestAnimationFrame(tick)
      else setDisplay(text)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [triggered, text, delay, duration])

  return (
    <span ref={ref} class={className} style={{
      fontFamily: '"JetBrains Mono", monospace',
      ...style,
    }}>
      {display}
    </span>
  )
}
