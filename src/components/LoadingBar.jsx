import { useState, useEffect } from 'preact/hooks'
import gsap from 'gsap'

export function LoadingBar() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const bar = document.getElementById('urj-load-bar')
    if (!bar) return

    gsap.fromTo(
      bar,
      { scaleX: 0, transformOrigin: 'left center' },
      {
        scaleX: 1,
        duration: 1.6,
        ease: 'power3.inOut',
        onComplete: () => {
          gsap.to(bar, {
            opacity: 0,
            duration: 0.4,
            onComplete: () => setVisible(false),
          })
        },
      }
    )
  }, [])

  if (!visible) return null

  return (
    <div
      id="urj-load-bar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, #B59410, #D4AF37, #FBF5A9)',
        boxShadow: '0 0 12px rgba(212,175,55,0.8), 0 0 32px rgba(212,175,55,0.3)',
        zIndex: 9999,
        transformOrigin: 'left center',
      }}
    />
  )
}
