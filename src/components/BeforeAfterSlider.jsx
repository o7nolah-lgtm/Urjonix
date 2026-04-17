import { useRef, useState } from 'preact/hooks'

export function BeforeAfterSlider({ before, after }) {
  const containerRef = useRef(null)
  const [pos, setPos]   = useState(0.5)
  const dragging        = useRef(false)

  const clamp = (v) => Math.max(0.02, Math.min(0.98, v))

  const updateFromClient = (clientX) => {
    const rect = containerRef.current.getBoundingClientRect()
    setPos(clamp((clientX - rect.left) / rect.width))
  }

  const onPointerDown = (e) => {
    dragging.current = true
    containerRef.current.setPointerCapture(e.pointerId)
    updateFromClient(e.clientX)
  }
  const onPointerMove = (e) => { if (dragging.current) updateFromClient(e.clientX) }
  const onPointerUp   = ()  => { dragging.current = false }

  const pct = `${pos * 100}%`

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{
        position: 'relative',
        userSelect: 'none',
        cursor: 'ew-resize',
        overflow: 'hidden',
        borderRadius: '4px',
        border: '1px solid rgba(212,175,55,0.18)',
        lineHeight: 0,
      }}
    >
      {/* ── BEFORE layer ── */}
      <img
        src={before}
        draggable={false}
        alt="Before — raw traffic feed"
        style={{ display: 'block', width: '100%', height: 'auto', pointerEvents: 'none' }}
      />

      {/* ── AFTER layer clipped to left of divider ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          clipPath: `inset(0 ${100 - pos * 100}% 0 0)`,
          pointerEvents: 'none',
        }}
      >
        <img
          src={after}
          draggable={false}
          alt="After — AI detection overlay"
          style={{ display: 'block', width: '100%', height: 'auto' }}
        />
      </div>

      {/* ── Divider line ── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: pct,
          width: '2px',
          background: '#D4AF37',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
          boxShadow: '0 0 10px rgba(212,175,55,0.55)',
        }}
      >
        {/* Handle knob */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: '#D4AF37',
            boxShadow: '0 0 18px rgba(212,175,55,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
          }}
        >
          {/* Chevrons */}
          <svg width="18" height="12" viewBox="0 0 18 12" fill="#0B0C0E">
            <path d="M6 1L1 6l5 5" stroke="#0B0C0E" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 1l5 5-5 5" stroke="#0B0C0E" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* ── Corner labels ── */}
      <span
        style={{
          position: 'absolute',
          top: '14px',
          left: '14px',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '0.58rem',
          letterSpacing: '0.18em',
          color: 'rgba(255,255,255,0.6)',
          background: 'rgba(11,12,14,0.75)',
          padding: '3px 8px',
          borderRadius: '2px',
          pointerEvents: 'none',
          border: '1px solid rgba(161,161,161,0.18)',
        }}
      >
        RAW FEED
      </span>
      <span
        style={{
          position: 'absolute',
          top: '14px',
          right: '14px',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '0.58rem',
          letterSpacing: '0.18em',
          color: '#D4AF37',
          background: 'rgba(11,12,14,0.75)',
          padding: '3px 8px',
          borderRadius: '2px',
          pointerEvents: 'none',
          border: '1px solid rgba(212,175,55,0.3)',
        }}
      >
        AI ENHANCED
      </span>
    </div>
  )
}
