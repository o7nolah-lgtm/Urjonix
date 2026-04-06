export function ProcessCard({ step, title, description, icon, delay = 0 }) {
  return (
    <div
      class="gsap-hidden"
      data-delay={delay}
      style={{
        background: '#161718',
        border: '1px solid rgba(161,161,161,0.1)',
        padding: '2.5rem 2rem',
        position: 'relative',
        transition: 'border-color 0.3s ease, transform 0.3s ease',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)'
        e.currentTarget.style.transform   = 'translateY(-4px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(161,161,161,0.1)'
        e.currentTarget.style.transform   = 'translateY(0)'
      }}
    >
      {/* Step number */}
      <div
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '3.5rem',
          fontWeight: 700,
          color: 'rgba(212,175,55,0.06)',
          lineHeight: 1,
          userSelect: 'none',
        }}
      >
        {String(step).padStart(2, '0')}
      </div>

      {/* Gold accent top bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '3px',
          height: '100%',
          background: 'linear-gradient(180deg, #D4AF37, transparent)',
          opacity: 0.5,
        }}
      />

      {/* Icon */}
      <div
        style={{
          width: '48px',
          height: '48px',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(212,175,55,0.25)',
          color: '#D4AF37',
        }}
      >
        {icon}
      </div>

      {/* Mono label */}
      <p
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          color: '#D4AF37',
          textTransform: 'uppercase',
          marginBottom: '0.75rem',
        }}
      >
        Phase {step}
      </p>

      {/* Title */}
      <h3
        style={{
          fontFamily: '"Inter Tight", sans-serif',
          fontWeight: 700,
          fontSize: '1.2rem',
          color: '#ffffff',
          marginBottom: '0.75rem',
          letterSpacing: '-0.01em',
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p style={{ fontSize: '0.85rem', color: '#A1A1A1', lineHeight: 1.75 }}>
        {description}
      </p>
    </div>
  )
}
