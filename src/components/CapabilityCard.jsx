export function CapabilityCard({ index, tag, title, description, bullets, visual }) {
  return (
    <div
      class="gsap-hidden"
      style={{
        border: '1px solid rgba(161,161,161,0.1)',
        background: '#161718',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: index % 2 === 0 ? '1fr 1fr' : '1fr 1fr',
        minHeight: '400px',
        transition: 'border-color 0.4s ease',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(161,161,161,0.1)'}
    >
      {/* Content side */}
      <div
        style={{
          padding: '3rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          order: index % 2 === 0 ? 0 : 1,
        }}
      >
        <p
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.22em',
            color: '#D4AF37',
            marginBottom: '1.2rem',
            textTransform: 'uppercase',
          }}
        >
          {tag}
        </p>

        <h3
          style={{
            fontFamily: '"Inter Tight", sans-serif',
            fontWeight: 800,
            fontSize: '1.7rem',
            color: '#ffffff',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            marginBottom: '1rem',
          }}
        >
          {title}
        </h3>

        <p style={{ fontSize: '0.88rem', color: '#A1A1A1', lineHeight: 1.8, marginBottom: '1.5rem' }}>
          {description}
        </p>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {bullets.map((b, i) => (
            <li
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                marginBottom: '0.6rem',
                fontSize: '0.82rem',
                color: '#C0C0C0',
              }}
            >
              <span style={{ color: '#D4AF37', flexShrink: 0, marginTop: '2px' }}>→</span>
              {b}
            </li>
          ))}
        </ul>
      </div>

      {/* Visual side */}
      <div
        style={{
          background: '#0F1012',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '300px',
          order: index % 2 === 0 ? 1 : 0,
          borderLeft:  index % 2 === 0 ? '1px solid rgba(161,161,161,0.08)' : 'none',
          borderRight: index % 2 !== 0 ? '1px solid rgba(161,161,161,0.08)' : 'none',
          padding: '2rem',
        }}
      >
        {visual}
      </div>
    </div>
  )
}
