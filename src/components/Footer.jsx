import { Link } from 'wouter'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(161,161,161,0.1)',
        background: '#0B0C0E',
        padding: '4rem 2rem 2.5rem',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '3rem',
            marginBottom: '3rem',
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '1rem',
              }}
            >
              <img src="/logo.png" alt="Urjionix logo" style={{ width: '36px', height: '36px', objectFit: 'contain', mixBlendMode: 'lighten' }} />
              <span
                style={{
                  fontFamily: '"Inter Tight", sans-serif',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  letterSpacing: '0.1em',
                  background: 'linear-gradient(135deg, #FBF5A9, #D4AF37, #B59410)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                URJIONIX TECHNOLOGIES
              </span>
            </div>
            <p
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                color: '#6C6C6C',
                marginBottom: '1rem',
              }}
            >
              AI · ROBOTICS · EDGE
            </p>
            <p style={{ fontSize: '0.8rem', color: '#6C6C6C', lineHeight: 1.7, maxWidth: '260px' }}>
              AI and Robotics company building intelligent systems — from edge vision to autonomous machines.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                color: '#D4AF37',
                marginBottom: '1.2rem',
                textTransform: 'uppercase',
              }}
            >
              Navigation
            </p>
            {[
              { label: 'Home',                href: '/' },
              { label: 'Our Capabilities',   href: '/capabilities' },
              { label: 'Contact',             href: '/contact' },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                style={{
                  display: 'block',
                  marginBottom: '0.7rem',
                  fontSize: '0.82rem',
                  color: '#A1A1A1',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.target.style.color = '#D4AF37'}
                onMouseLeave={e => e.target.style.color = '#A1A1A1'}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Capabilities */}
          <div>
            <p
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                color: '#D4AF37',
                marginBottom: '1.2rem',
                textTransform: 'uppercase',
              }}
            >
              Capabilities
            </p>
            {[
              'Computer Vision & Edge AI',
              'Robotics & Autonomous Systems',
              'Prototype-to-Production',
              'Data Integrity & Compliance',
              'Edge Tech Robotics (Shop)',
            ].map(item => (
              <p
                key={item}
                style={{
                  marginBottom: '0.7rem',
                  fontSize: '0.82rem',
                  color: '#A1A1A1',
                  lineHeight: 1.5,
                }}
              >
                {item}
              </p>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                color: '#D4AF37',
                marginBottom: '1.2rem',
                textTransform: 'uppercase',
              }}
            >
              Contact
            </p>
            <p style={{ fontSize: '0.82rem', color: '#A1A1A1', marginBottom: '0.6rem' }}>
              contact@urjionix.com
            </p>
            <p style={{ fontSize: '0.82rem', color: '#A1A1A1', marginBottom: '0.6rem' }}>
              Urjionix Technologies Pvt Ltd
            </p>
            <p style={{ fontSize: '0.82rem', color: '#A1A1A1' }}>
              India
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(161,161,161,0.08)',
            paddingTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.6rem',
              letterSpacing: '0.12em',
              color: '#3C3C3C',
            }}
          >
            © {year} URJIONIX TECHNOLOGIES PVT LTD — ALL RIGHTS RESERVED
          </p>
          <p
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.6rem',
              letterSpacing: '0.12em',
              color: '#3C3C3C',
            }}
          >
            AI · ROBOTICS · EDGE COMPUTE · COMPUTER VISION
          </p>
        </div>
      </div>
    </footer>
  )
}
