import { useEffect, useRef, useState } from 'preact/hooks'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CapabilityCard } from '../components/CapabilityCard.jsx'
import { BeforeAfterSlider } from '../components/BeforeAfterSlider.jsx'
import { ThreeImageSwitcher } from '../components/ThreeImageSwitcher.jsx'

gsap.registerPlugin(ScrollTrigger)

// ── SVG Visuals ─────────────────────────────────────────────────────────────
function RoboticsVisual() {
  return (
    <svg viewBox="0 0 260 200" width="100%" style={{ maxWidth: '260px' }} fill="none">
      {/* Robot body */}
      <rect x="95" y="80" width="70" height="60" rx="4" fill="#161718" stroke="#D4AF37" strokeWidth="1.2"/>
      {/* Head */}
      <rect x="105" y="52" width="50" height="34" rx="3" fill="#161718" stroke="#A1A1A1" strokeWidth="1"/>
      {/* Eyes */}
      <circle cx="122" cy="67" r="5" fill="#0B0C0E" stroke="#D4AF37" strokeWidth="1"/>
      <circle cx="138" cy="67" r="5" fill="#0B0C0E" stroke="#D4AF37" strokeWidth="1"/>
      <circle cx="122" cy="67" r="2" fill="#D4AF37" opacity="0.8"/>
      <circle cx="138" cy="67" r="2" fill="#D4AF37" opacity="0.8"/>
      {/* Neck */}
      <rect x="123" y="86" width="14" height="8" rx="1" fill="#1A1C1E" stroke="rgba(161,161,161,0.3)" strokeWidth="0.5"/>
      {/* Chest panel */}
      <rect x="108" y="94" width="44" height="28" rx="2" fill="#0F1012" stroke="rgba(212,175,55,0.3)" strokeWidth="0.5"/>
      <rect x="112" y="98" width="16" height="8" rx="1" fill="#D4AF37" opacity="0.2" stroke="#D4AF37" strokeWidth="0.4"/>
      <circle cx="140" cy="110" r="4" fill="rgba(212,175,55,0.15)" stroke="#D4AF37" strokeWidth="0.8"/>
      <circle cx="140" cy="110" r="1.5" fill="#D4AF37"/>
      {/* Arms */}
      <rect x="60" y="84" width="35" height="10" rx="5" fill="#1A1C1E" stroke="#A1A1A1" strokeWidth="0.8"/>
      <rect x="165" y="84" width="35" height="10" rx="5" fill="#1A1C1E" stroke="#A1A1A1" strokeWidth="0.8"/>
      {/* Hands/grippers */}
      <path d="M 60 84 L 48 78 M 60 94 L 48 100" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round"/>
      <path d="M 200 84 L 212 78 M 200 94 L 212 100" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round"/>
      {/* Legs */}
      <rect x="103" y="140" width="22" height="36" rx="3" fill="#1A1C1E" stroke="#A1A1A1" strokeWidth="0.8"/>
      <rect x="135" y="140" width="22" height="36" rx="3" fill="#1A1C1E" stroke="#A1A1A1" strokeWidth="0.8"/>
      {/* Feet */}
      <rect x="99"  y="172" width="30" height="8" rx="2" fill="#161718" stroke="rgba(161,161,161,0.4)" strokeWidth="0.5"/>
      <rect x="131" y="172" width="30" height="8" rx="2" fill="#161718" stroke="rgba(161,161,161,0.4)" strokeWidth="0.5"/>
      {/* Signal arcs */}
      {[1,2].map(i => (
        <path key={i} d={`M ${130 - i*14},${52 - i*8} Q 130,${38 - i*10} ${130 + i*14},${52 - i*8}`}
          stroke={`rgba(212,175,55,${0.4 - i*0.12})`} strokeWidth="0.8" fill="none"/>
      ))}
    </svg>
  )
}

function CVVisual() {
  return (
    <svg viewBox="0 0 260 200" width="100%" style={{ maxWidth: '260px' }} fill="none">
      {/* Camera body */}
      <rect x="80" y="60" width="100" height="70" rx="4" stroke="#D4AF37" strokeWidth="1.2" fill="#161718"/>
      <rect x="85" y="65" width="90" height="60" rx="2" fill="#0B0C0E" stroke="rgba(212,175,55,0.3)" strokeWidth="0.5"/>
      {/* Lens */}
      <circle cx="130" cy="95" r="24" stroke="#D4AF37" strokeWidth="1.2" fill="#0B0C0E"/>
      <circle cx="130" cy="95" r="16" stroke="rgba(212,175,55,0.4)" strokeWidth="0.8" fill="#0B0C0E"/>
      <circle cx="130" cy="95" r="8"  fill="rgba(212,175,55,0.12)" stroke="#D4AF37" strokeWidth="0.8"/>
      {/* Mount */}
      <rect x="120" y="130" width="20" height="30" fill="rgba(161,161,161,0.2)" stroke="rgba(161,161,161,0.4)" strokeWidth="0.5"/>
      {/* Bounding boxes */}
      <rect x="30"  y="30"  width="35" height="55" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="3,2" opacity="0.7"/>
      <rect x="195" y="45"  width="30" height="50" stroke="rgba(212,175,55,0.5)" strokeWidth="0.8" strokeDasharray="3,2"/>
      <rect x="50"  y="120" width="30" height="50" stroke="rgba(212,175,55,0.4)" strokeWidth="0.8" strokeDasharray="3,2"/>
      {/* Labels */}
      <rect x="30" y="22" width="60" height="10" fill="rgba(11,12,14,0.9)" rx="1"/>
      <text x="33" y="30" fill="#D4AF37" fontSize="5" fontFamily="JetBrains Mono, monospace">99.1% VERIFIED</text>
      {/* Connection lines */}
      <line x1="130" y1="60" x2="47"  y2="57"  stroke="rgba(212,175,55,0.2)" strokeWidth="0.5" strokeDasharray="2,2"/>
      <line x1="130" y1="60" x2="210" y2="70"  stroke="rgba(212,175,55,0.2)" strokeWidth="0.5" strokeDasharray="2,2"/>
      {/* Jetson board hint */}
      <rect x="20"  y="155" width="220" height="35" rx="2" fill="#161718" stroke="rgba(161,161,161,0.2)" strokeWidth="0.5"/>
      <text x="130" y="177" fill="#6C6C6C" fontSize="6" textAnchor="middle" fontFamily="JetBrains Mono, monospace">NVIDIA JETSON ORIN NANO</text>
    </svg>
  )
}

function PCBVisual() {
  return (
    <svg viewBox="0 0 260 200" width="100%" style={{ maxWidth: '260px' }} fill="none">
      {/* PCB board */}
      <rect x="30" y="30" width="200" height="140" rx="4" fill="#0d1a0d" stroke="#A1A1A1" strokeWidth="1"/>
      {/* Traces */}
      {[50,70,90,110,130,150,170].map((y, i) => (
        <line key={i} x1="40" y1={y} x2={80 + i * 12} y2={y} stroke="rgba(161,161,161,0.2)" strokeWidth="0.5"/>
      ))}
      {/* Chips */}
      <rect x="90"  y="60"  width="80" height="50" rx="2" fill="#1A1A1A" stroke="#D4AF37" strokeWidth="0.8"/>
      <text x="130" y="90" textAnchor="middle" fill="#D4AF37" fontSize="6" fontFamily="JetBrains Mono, monospace">CUSTOM CARRIER</text>
      <text x="130" y="99" textAnchor="middle" fill="#6C6C6C" fontSize="5" fontFamily="JetBrains Mono, monospace">URJ-CB-01</text>
      {/* Connectors */}
      {[0,1,2,3,4,5].map(i => (
        <rect key={i} x={40} y={50 + i * 15} width="14" height="8" rx="1" fill="#2a2a2a" stroke="rgba(161,161,161,0.3)" strokeWidth="0.4"/>
      ))}
      {[0,1,2,3,4,5].map(i => (
        <rect key={i} x={206} y={50 + i * 15} width="14" height="8" rx="1" fill="#2a2a2a" stroke="rgba(161,161,161,0.3)" strokeWidth="0.4"/>
      ))}
      {/* Via dots */}
      {[120,140,160].map((x, i) => [130,150,160].map((y, j) => (
        <circle key={`${i}-${j}`} cx={x} cy={y} r="1.5" fill="rgba(212,175,55,0.3)" stroke="#D4AF37" strokeWidth="0.3"/>
      )))}
      {/* Status LEDs */}
      <circle cx="70"  cy="155" r="4" fill="#D4AF37" opacity="0.8"/>
      <circle cx="85"  cy="155" r="4" fill="rgba(212,175,55,0.2)"/>
      <circle cx="100" cy="155" r="4" fill="rgba(212,175,55,0.2)"/>
    </svg>
  )
}

function GatewayVisual() {
  return (
    <svg viewBox="0 0 260 200" width="100%" style={{ maxWidth: '260px' }} fill="none">
      {/* Gateway box */}
      <rect x="90" y="70" width="80" height="90" rx="3" fill="#161718" stroke="#A1A1A1" strokeWidth="1"/>
      {/* SIM slot */}
      <rect x="95"  y="78" width="20" height="12" rx="1" fill="#0B0C0E" stroke="rgba(161,161,161,0.3)" strokeWidth="0.5"/>
      {/* Antenna */}
      <rect x="120" y="55" width="5" height="20" fill="#A1A1A1"/>
      <line x1="122" y1="55" x2="115" y2="40" stroke="#A1A1A1" strokeWidth="1"/>
      <line x1="122" y1="55" x2="129" y2="40" stroke="#A1A1A1" strokeWidth="1"/>
      {/* Signal rings */}
      {[1,2,3].map(i => (
        <path key={i} d={`M ${110-i*8},${48-i*6} Q 122,${32-i*7} ${134+i*8},${48-i*6}`}
          stroke={`rgba(212,175,55,${0.5 - i * 0.12})`} strokeWidth="0.8" fill="none"/>
      ))}
      {/* 4G label */}
      <rect x="95" y="100" width="70" height="20" rx="1" fill="rgba(212,175,55,0.06)" stroke="rgba(212,175,55,0.3)" strokeWidth="0.4"/>
      <text x="130" y="114" textAnchor="middle" fill="#D4AF37" fontSize="7" fontFamily="JetBrains Mono, monospace">4G / LoRaWAN</text>
      {/* Cloud/server */}
      <ellipse cx="180" cy="40" rx="22" ry="14" fill="#161718" stroke="rgba(161,161,161,0.3)" strokeWidth="0.6"/>
      <text x="180" y="44" textAnchor="middle" fill="#6C6C6C" fontSize="5.5" fontFamily="JetBrains Mono, monospace">SERVER</text>
      {/* Data flow line */}
      <line x1="130" y1="70" x2="165" y2="54" stroke="rgba(212,175,55,0.35)" strokeWidth="0.6" strokeDasharray="3,2"/>
      {/* Power port */}
      <rect x="160" y="130" width="10" height="6" rx="1" fill="#0B0C0E" stroke="rgba(161,161,161,0.3)" strokeWidth="0.4"/>
      {/* Status */}
      <circle cx="160" cy="85" r="3" fill="#D4AF37" opacity="0.9"/>
      <text x="166" y="89" fill="#6C6C6C" fontSize="5" fontFamily="JetBrains Mono, monospace">ONLINE</text>
    </svg>
  )
}

// ── Mall Camera Showcase ───────────────────────────────────────────────────
const MALL_VIEWS = [
  { label: 'Raw Feed',     src: '/mall.png' },
  { label: 'AI Detection', src: '/mall-boxes.png' },
  { label: 'Heat Map',     src: '/map-heat-map.png' },
]

function MallShowcase() {
  const [open, setOpen] = useState(false)

  return (
    <section style={{
      borderTop: '1px solid rgba(161,161,161,0.08)',
      padding: 'clamp(3rem, 6vw, 5rem) clamp(2rem, 6vw, 6rem)',
      maxWidth: '1400px',
      margin: '0 auto',
    }}>
      <p class="gsap-hidden mono-label" style={{ marginBottom: '0.75rem' }}>
        Use Case — Retail & Mall Intelligence
      </p>
      <h2 class="gsap-hidden" style={{
        fontFamily: '"Inter Tight", sans-serif',
        fontWeight: 800,
        fontSize: 'clamp(1.6rem, 3vw, 2.6rem)',
        letterSpacing: '-0.025em',
        color: '#ffffff',
        marginBottom: '2rem',
        lineHeight: 1.1,
      }}>
        Understanding Spaces,{' '}
        <span style={{
          background: 'linear-gradient(135deg, #FBF5A9, #D4AF37, #B59410)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>
          Not Just Faces.
        </span>
      </h2>

      {/* Three-mode image switcher */}
      <div class="gsap-hidden" style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <ThreeImageSwitcher views={MALL_VIEWS} />

        {/* Know More button — below the tab bar */}
        <button
          onClick={() => setOpen(v => !v)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '1rem',
            background: 'transparent',
            border: `1px solid ${open ? 'rgba(212,175,55,0.6)' : 'rgba(212,175,55,0.25)'}`,
            borderRadius: '2px',
            padding: '8px 20px',
            cursor: 'pointer',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.62rem',
            letterSpacing: '0.16em',
            color: '#D4AF37',
            textTransform: 'uppercase',
            transition: 'border-color 0.2s, box-shadow 0.2s',
            boxShadow: open ? '0 0 14px rgba(212,175,55,0.12)' : 'none',
          }}
        >
          <span style={{
            display: 'inline-block',
            width: '5px', height: '5px',
            borderRight: '1.5px solid #D4AF37',
            borderBottom: '1.5px solid #D4AF37',
            transform: open ? 'rotate(-135deg) translateY(2px)' : 'rotate(45deg)',
            transition: 'transform 0.3s',
          }} />
          {open ? 'Show Less' : 'Know More'}
        </button>
      </div>

      {/* Expandable details */}
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        overflow: 'hidden',
        maxHeight: open ? '800px' : '0',
        transition: 'max-height 0.55s cubic-bezier(0.4,0,0.2,1)',
      }}>
        <div style={{ padding: '2.5rem 0 0.5rem' }}>
          <p style={{
            color: '#7A7A7A', fontSize: '0.92rem', lineHeight: 1.8,
            maxWidth: '660px', marginBottom: '2rem',
          }}>
            Beyond simple surveillance — our mall camera AI understands foot traffic patterns,
            dwell zones, and crowd density in real time. Switch between raw feed, detection overlay,
            and heat map to see how the same camera reveals entirely different insights.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {[
              ['Detection Mode',  'People, Groups, Objects'],
              ['Heat Mapping',    'Dwell & Density Analysis'],
              ['Zone Analytics',  'Entry, Exit & Flow Tracking'],
              ['Alerts',          'Crowd Threshold & Anomalies'],
              ['Processing',      'On-Device — No Cloud'],
            ].map(([label, val]) => (
              <div key={label} style={{
                background: '#161718',
                border: '1px solid rgba(212,175,55,0.14)',
                borderRadius: '3px',
                padding: '0.65rem 1.1rem',
              }}>
                <p style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.52rem', letterSpacing: '0.18em',
                  color: '#D4AF37', marginBottom: '0.25rem', textTransform: 'uppercase',
                }}>{label}</p>
                <p style={{ fontSize: '0.82rem', color: '#E0E0E0', fontWeight: 600 }}>{val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Use Case Showcase ─────────────────────────────────────────────────────
function UseCaseShowcase() {
  const [open, setOpen] = useState(false)

  return (
    <section
      style={{
        borderTop: '1px solid rgba(161,161,161,0.08)',
        padding: 'clamp(3rem, 6vw, 5rem) clamp(2rem, 6vw, 6rem)',
        maxWidth: '1400px',
        margin: '0 auto',
      }}
    >
      {/* Label + headline always visible */}
      <p class="gsap-hidden mono-label" style={{ marginBottom: '0.75rem' }}>
        Use Case — Smart Traffic Management
      </p>
      <h2
        class="gsap-hidden"
        style={{
          fontFamily: '"Inter Tight", sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(1.6rem, 3vw, 2.6rem)',
          letterSpacing: '-0.025em',
          color: '#ffffff',
          marginBottom: '2rem',
          lineHeight: 1.1,
        }}
      >
        AI That Sees the Road{' '}
        <span style={{
          background: 'linear-gradient(135deg, #FBF5A9, #D4AF37, #B59410)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>
          in Real Time.
        </span>
      </h2>

      {/* Slider always visible */}
      <div class="gsap-hidden" style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
        <BeforeAfterSlider before="/traffic-before.png" after="/traffic-after.png" />

        {/* Know More button anchored to bottom of image */}
        <button
          onClick={() => setOpen(v => !v)}
          style={{
            position: 'absolute',
            bottom: '18px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(11,12,14,0.82)',
            border: `1px solid ${open ? 'rgba(212,175,55,0.6)' : 'rgba(212,175,55,0.3)'}`,
            borderRadius: '2px',
            padding: '8px 20px',
            cursor: 'pointer',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.65rem',
            letterSpacing: '0.18em',
            color: '#D4AF37',
            textTransform: 'uppercase',
            backdropFilter: 'blur(6px)',
            transition: 'border-color 0.2s, box-shadow 0.2s',
            boxShadow: open ? '0 0 14px rgba(212,175,55,0.18)' : 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{
            display: 'inline-block',
            width: '6px', height: '6px',
            borderRight: '1.5px solid #D4AF37',
            borderBottom: '1.5px solid #D4AF37',
            transform: open ? 'rotate(-135deg) translateY(3px)' : 'rotate(45deg)',
            transition: 'transform 0.3s',
          }} />
          {open ? 'Show Less' : 'Know More'}
        </button>
      </div>

      {/* Expandable details */}
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          overflow: 'hidden',
          maxHeight: open ? '1200px' : '0',
          transition: 'max-height 0.6s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <div style={{ padding: '2.5rem 0 0.5rem' }}>
          {/* Description */}
          <p style={{
            color: '#7A7A7A', fontSize: '0.92rem', lineHeight: 1.8,
            maxWidth: '660px', marginBottom: '2rem',
          }}>
            Edge-deployed vehicle detection, classification, and licence-plate reading —
            running on-device with no cloud round-trip. The system identifies vehicle type,
            tracks movement, and reads plates in real time, all from a compact ruggedized unit
            that works in any environment.
          </p>

          {/* Feature pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
            {[
              ['Detection',    'Vehicles, Pedestrians, Objects'],
              ['Classification', 'Sedan, SUV, Truck, Bus & more'],
              ['Plate Reading', 'Real-time LPR'],
              ['Processing',   'On-Device — No Cloud'],
              ['Deployment',   'Edge / Embedded'],
            ].map(([label, val]) => (
              <div key={label} style={{
                background: '#161718',
                border: '1px solid rgba(212,175,55,0.14)',
                borderRadius: '3px',
                padding: '0.65rem 1.1rem',
              }}>
                <p style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.52rem', letterSpacing: '0.18em',
                  color: '#D4AF37', marginBottom: '0.25rem', textTransform: 'uppercase',
                }}>{label}</p>
                <p style={{ fontSize: '0.82rem', color: '#E0E0E0', fontWeight: 600 }}>{val}</p>
              </div>
            ))}
          </div>

          {/* Technical Specifications */}
          <p style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.58rem', letterSpacing: '0.18em',
            color: '#D4AF37', textTransform: 'uppercase',
            marginBottom: '1.25rem',
          }}>
            Technical Specifications
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1px',
            background: 'rgba(161,161,161,0.06)',
          }}>
            {[
              ['Compute',     'NVIDIA Jetson Orin Nano'],
              ['AI Engine',   'High-performance edge inference'],
              ['Vision',      'Multi-camera USB & MIPI support'],
              ['Connectivity','Cellular + LoRaWAN'],
              ['Storage',     'NVMe SSD onboard'],
              ['OS',          'Linux — JetPack based'],
              ['Power',       'Wide-range DC input, PoE ready'],
              ['Enclosure',   'Ruggedized, field-deployable'],
            ].map(([label, val]) => (
              <div key={label} style={{
                background: '#161718',
                padding: '1.25rem 1.5rem',
                borderRight: '1px solid rgba(161,161,161,0.05)',
              }}>
                <p style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.55rem', letterSpacing: '0.18em',
                  color: '#D4AF37', marginBottom: '0.4rem', textTransform: 'uppercase',
                }}>{label}</p>
                <p style={{ fontSize: '0.82rem', color: '#C0C0C0' }}>{val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────
export function Capabilities() {
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cap-hero-text', {
        opacity: 0, y: 36, stagger: 0.12, duration: 1, ease: 'power3.out', delay: 0.2,
      })
      gsap.utils.toArray('.gsap-hidden').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true } }
        )
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <main ref={pageRef}>
      {/* ─── Page hero ─────────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: 'clamp(8rem, 16vw, 12rem)',
          paddingBottom: 'clamp(4rem, 8vw, 6rem)',
          paddingLeft:  'clamp(1.5rem, 8vw, 8rem)',
          paddingRight: 'clamp(1.5rem, 8vw, 8rem)',
          maxWidth: '1400px',
          margin: '0 auto',
          borderBottom: '1px solid rgba(161,161,161,0.08)',
        }}
      >
        <p class="cap-hero-text mono-label" style={{ marginBottom: '1rem' }}>
          Our Capabilities
        </p>
        <h1
          class="cap-hero-text"
          style={{
            fontFamily: '"Inter Tight", sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            letterSpacing: '-0.03em',
            color: '#ffffff',
            lineHeight: 1.05,
            maxWidth: '700px',
          }}
        >
          AI & Robotics,{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #FBF5A9, #D4AF37, #B59410)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Built to Deploy.
          </span>
        </h1>
      </section>

      {/* ─── Use Case Showcase — Traffic ───────────────────────────── */}
      <UseCaseShowcase />

      {/* ─── Use Case Showcase — Mall AI ───────────────────────────── */}
      <MallShowcase />

      {/* ─── Capability Cards ──────────────────────────────────────── */}
      <section
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: 'clamp(2rem, 4vw, 3rem) clamp(2rem, 8vw, 8rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5px',
          background: 'rgba(161,161,161,0.05)',
        }}
      >
        <CapabilityCard
          index={0}
          tag="Edge AI & Computer Vision"
          title="See More. Know More. Act Faster."
          description="We deploy intelligent vision systems that process the world in real time — on-device, offline-capable, and built for environments where the cloud isn't an option."
          bullets={[
            'Person & object detection in complex environments',
            'Face recognition and crowd analytics',
            'Vehicle classification and traffic intelligence',
            'Custom model training for your specific use case',
            'Runs entirely on-device — no cloud dependency',
          ]}
          visual={<CVVisual />}
        />
        <CapabilityCard
          index={1}
          tag="Hardware & Systems Engineering"
          title="From Concept to Field-Ready."
          description="We don't stop at software. We design the hardware it runs on — custom carrier boards, enclosures, and integration work that gets your product into the real world."
          bullets={[
            'Custom PCB and carrier board design',
            'Embedded firmware and driver development',
            'Ruggedized enclosures for harsh environments',
            'Rapid prototyping with short iteration cycles',
            'End-to-end integration under one roof',
          ]}
          visual={<PCBVisual />}
        />
        <CapabilityCard
          index={2}
          tag="Robotics & Autonomous Systems"
          title="Machines That Think and Act."
          description="We design and build robotic systems that integrate AI perception with physical actuation — from research prototypes to field-deployable autonomous units."
          bullets={[
            'Custom robot design & mechanical integration',
            'AI-driven perception and decision making',
            'ROS2-based control systems',
            'Sensor fusion — cameras, LiDAR, IMU',
            'From arm manipulators to mobile platforms',
          ]}
          visual={<RoboticsVisual />}
        />
        <CapabilityCard
          index={3}
          tag="Connectivity & Data Pipelines"
          title="Always Connected. Always Compliant."
          description="Field-deployed units that sync securely over cellular and low-power networks — with audit trails, encrypted telemetry, and offline-first resilience built in."
          bullets={[
            'Secure cellular and LoRaWAN connectivity',
            'End-to-end encrypted data transmission',
            'Offline-first with automatic sync on reconnect',
            'Audit logging and compliance-ready pipelines',
            'Government and institutional-grade reliability',
          ]}
          visual={<GatewayVisual />}
        />
      </section>
    </main>
  )
}
