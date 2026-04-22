import { useState, useEffect, useRef } from 'preact/hooks'
import { Link, useLocation } from 'wouter'
import { ThemeToggle } from './ThemeToggle.jsx'
import { useTheme } from '../context/ThemeContext.jsx'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Capabilities', href: '/capabilities' },
  { label: 'Contact', href: '/contact' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [location] = useLocation()
  const { isDark } = useTheme()
  const headerRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  return (
    <header
      ref={headerRef}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        transition: 'background 0.4s ease, border-color 0.4s ease',
        background: scrolled ? 'var(--clr-header-scroll)' : 'var(--clr-header)',
        borderBottom: '1px solid var(--clr-border)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 1.25rem',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          overflow: 'hidden',
        }}
      >
        {/* ── Logo ── */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <img
            src="/logo.png"
            alt="Urjionix logo"
            style={{
              width: '36px', height: '36px', objectFit: 'contain',
              mixBlendMode: isDark ? 'lighten' : 'multiply',
              flexShrink: 0,
            }}
          />
          <div>
            <div style={{
              fontFamily: '"Inter Tight", sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(0.85rem, 2.5vw, 1.1rem)',
              letterSpacing: '0.08em',
              background: 'linear-gradient(135deg, #FBF5A9 0%, #D4AF37 55%, #B59410 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              whiteSpace: 'nowrap',
            }}>
              URJIONIX
            </div>
            <div class="hide-mobile" style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.5rem',
              letterSpacing: '0.2em',
              color: 'var(--clr-muted-text)',
              marginTop: '-1px',
              whiteSpace: 'nowrap',
            }}>
              AI · ROBOTICS · EDGE
            </div>
          </div>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav class="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: '"Inter Tight", sans-serif',
                fontSize: '0.8rem',
                letterSpacing: '0.06em',
                textDecoration: 'none',
                color: location === href ? '#D4AF37' : 'var(--clr-sub)',
                transition: 'color 0.2s ease',
                position: 'relative',
                paddingBottom: '2px',
              }}
              onMouseEnter={e => { if (location !== href) e.target.style.color = 'var(--clr-text)' }}
              onMouseLeave={e => { if (location !== href) e.target.style.color = 'var(--clr-sub)' }}
            >
              {label}
              {location === href && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: '-2px',
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: '#D4AF37',
                  }}
                />
              )}
            </Link>
          ))}

          {/* Theme toggle */}
          <ThemeToggle />

          {/* Edge Tech Robotics CTA */}
          <a
            href="https://edgetechrobotics.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.65rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              color: 'var(--clr-light)',
              border: '1px solid var(--clr-border)',
              padding: '0.5rem 1.2rem',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(192,192,192,0.6)'
              e.currentTarget.style.background = 'rgba(192,192,192,0.06)'
              e.currentTarget.style.color = 'var(--clr-text)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--clr-border)'
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--clr-light)'
            }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <rect x="1" y="1" width="8" height="8" stroke="currentColor" strokeWidth="0.8" />
              <rect x="3" y="3" width="4" height="4" fill="currentColor" />
            </svg>
            Edge Tech Robotics
          </a>
        </nav>

        {/* ── Mobile: toggle + hamburger ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div class="mobile-burger">
            <ThemeToggle />
          </div>
          <button
            class="mobile-burger"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none',
              border: '1px solid var(--clr-border)',
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
            }}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map(i => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: '20px',
                  height: '1px',
                  background: '#D4AF37',
                  transition: 'all 0.3s ease',
                  transform:
                    menuOpen && i === 0 ? 'rotate(45deg) translateY(6px)' :
                      menuOpen && i === 2 ? 'rotate(-45deg) translateY(-6px)' :
                        menuOpen && i === 1 ? 'scaleX(0)' : 'none',
                }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {menuOpen && (
        <div
          style={{
            background: 'var(--clr-mobile-menu)',
            borderTop: '1px solid var(--clr-border)',
            padding: '1.5rem 2rem 2rem',
          }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              style={{
                display: 'block',
                padding: '1.1rem 0',
                borderBottom: '1px solid var(--clr-border-faint)',
                fontFamily: '"Inter Tight", sans-serif',
                fontSize: '1rem',
                letterSpacing: '0.04em',
                textDecoration: 'none',
                color: location === href ? '#D4AF37' : 'var(--clr-sub)',
              }}
            >
              {label}
            </Link>
          ))}
          <a
            href="https://edgetechrobotics.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              marginTop: '1.5rem',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.65rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              color: 'var(--clr-light)',
              border: '1px solid var(--clr-border)',
              padding: '0.6rem 1.2rem',
            }}
          >
            Edge Tech Robotics ↗
          </a>
        </div>
      )}
    </header>
  )
}
