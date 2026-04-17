import { useState } from 'preact/hooks'

export function ThreeImageSwitcher({ views }) {
  const [active, setActive] = useState(0)

  return (
    <div>
      {/* Image area */}
      <div style={{
        position: 'relative',
        borderRadius: '4px 4px 0 0',
        border: '1px solid rgba(212,175,55,0.18)',
        borderBottom: 'none',
        overflow: 'hidden',
        lineHeight: 0,
      }}>
        {views.map((v, i) => (
          <img
            key={v.label}
            src={v.src}
            alt={v.label}
            draggable={false}
            style={{
              display: 'block',
              width: '100%',
              height: 'auto',
              position: i === 0 ? 'relative' : 'absolute',
              top: 0, left: 0,
              opacity: active === i ? 1 : 0,
              transition: 'opacity 0.4s ease',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          />
        ))}

        {/* Active mode label — top left corner */}
        <div style={{
          position: 'absolute',
          top: '14px',
          left: '14px',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '0.58rem',
          letterSpacing: '0.16em',
          color: '#D4AF37',
          background: 'rgba(11,12,14,0.78)',
          padding: '4px 10px',
          borderRadius: '2px',
          border: '1px solid rgba(212,175,55,0.35)',
          textTransform: 'uppercase',
          pointerEvents: 'none',
        }}>
          {views[active].label}
        </div>
      </div>

      {/* Tab bar — sits flush below the image */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${views.length}, 1fr)`,
        border: '1px solid rgba(212,175,55,0.18)',
        borderRadius: '0 0 4px 4px',
        overflow: 'hidden',
      }}>
        {views.map((v, i) => {
          const isActive = active === i
          return (
            <button
              key={v.label}
              onClick={() => setActive(i)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                padding: '14px 12px',
                background: isActive ? 'rgba(212,175,55,0.07)' : '#0F1012',
                border: 'none',
                borderRight: i < views.length - 1 ? '1px solid rgba(212,175,55,0.12)' : 'none',
                borderTop: `2px solid ${isActive ? '#D4AF37' : 'transparent'}`,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {/* Icon per mode */}
              <span style={{ fontSize: '1rem', lineHeight: 1 }}>
                {i === 0 ? '📷' : i === 1 ? '🎯' : '🌡️'}
              </span>
              <span style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.6rem',
                letterSpacing: '0.14em',
                color: isActive ? '#D4AF37' : 'rgba(161,161,161,0.5)',
                textTransform: 'uppercase',
                transition: 'color 0.2s',
              }}>
                {v.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
