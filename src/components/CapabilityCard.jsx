export function CapabilityCard({ id, index, tag, title, description, bullets, visual }) {
  return (
    <div
      id={id}
      class="gsap-hidden cap-card-grid"
      style={{
        border: '1px solid var(--clr-border)',
        background: 'var(--clr-surf)',
        overflow: 'hidden',
        transition: 'border-color 0.4s ease, background 0.35s ease',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--clr-border)'}
    >
      {/* Visual side */}
      <div
        class="cap-card-visual"
        style={{
          background: 'var(--clr-deeper)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '180px',
          order: index % 2 === 0 ? 1 : 0,
          borderLeft:  index % 2 === 0 ? '1px solid var(--clr-border-dim)' : 'none',
          borderRight: index % 2 !== 0 ? '1px solid var(--clr-border-dim)' : 'none',
          padding: '1.5rem',
          transition: 'background 0.35s ease',
        }}
      >
        {visual}
      </div>

      {/* Content side */}
      <div
        class="cap-card-content"
        style={{
          padding: '1.75rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          order: index % 2 === 0 ? 0 : 1,
        }}
      >
        <p style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '0.55rem',
          letterSpacing: '0.2em',
          color: '#D4AF37',
          marginBottom: '0.5rem',
          textTransform: 'uppercase',
        }}>
          {tag}
        </p>

        <h3 style={{
          fontFamily: '"Inter Tight", sans-serif',
          fontWeight: 800,
          fontSize: '1.25rem',
          color: 'var(--clr-text)',
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
          marginBottom: '0.6rem',
        }}>
          {title}
        </h3>

        <p style={{ fontSize: '0.8rem', color: 'var(--clr-sub)', lineHeight: 1.7, marginBottom: '0.9rem' }}>
          {description}
        </p>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {bullets.map((b, i) => (
            <li key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: '8px',
              marginBottom: '0.35rem', fontSize: '0.78rem', color: 'var(--clr-light)',
            }}>
              <span style={{ color: '#D4AF37', flexShrink: 0, marginTop: '2px' }}>→</span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
