import { useTheme } from '../context/ThemeContext.jsx'

function SunIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
      <circle cx="4" cy="4" r="1.8" fill="white"/>
      <line x1="4" y1="0.2" x2="4" y2="1.2" stroke="white" strokeWidth="0.8" strokeLinecap="round"/>
      <line x1="4" y1="6.8" x2="4" y2="7.8" stroke="white" strokeWidth="0.8" strokeLinecap="round"/>
      <line x1="0.2" y1="4" x2="1.2" y2="4" stroke="white" strokeWidth="0.8" strokeLinecap="round"/>
      <line x1="6.8" y1="4" x2="7.8" y2="4" stroke="white" strokeWidth="0.8" strokeLinecap="round"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
      <path d="M6.5 4.8A3.2 3.2 0 0 1 3.7 8 3.2 3.2 0 0 1 .5 4.8 3.2 3.2 0 0 1 3.2.5 3.2 3.2 0 0 0 6.5 4.8z" fill="#0B0C0E"/>
    </svg>
  )
}

export function ThemeToggle() {
  const { isDark, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      style={{
        position: 'relative',
        width: '44px',
        height: '24px',
        borderRadius: '12px',
        border: isDark ? '1px solid rgba(212,175,55,0.25)' : '1px solid rgba(0,0,0,0.15)',
        background: isDark ? 'rgba(212,175,55,0.07)' : 'rgba(0,0,0,0.06)',
        cursor: 'pointer',
        padding: 0,
        overflow: 'hidden',
        transition: 'background 0.35s ease, border-color 0.35s ease',
        flexShrink: 0,
        outline: 'none',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: '3px',
          left: isDark ? '21px' : '3px',
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          background: isDark ? '#D4AF37' : '#6B6B6B',
          transition: 'left 0.35s cubic-bezier(0.4,0,0.2,1), background 0.35s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isDark ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  )
}
