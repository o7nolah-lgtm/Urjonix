import { useEffect, useRef } from 'preact/hooks'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CapabilityCard } from '../components/CapabilityCard.jsx'

gsap.registerPlugin(ScrollTrigger)

// ── SVG Visuals ─────────────────────────────────────────────────────────────
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

// ── Page ───────────────────────────────────────────────────────────────────
export function Capabilities() {
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cap-hero-text', {
        opacity: 0, y: 36, stagger: 0.12, duration: 1, ease: 'power3.out', delay: 0.2,
      })
      gsap.utils.toArray('.gsap-hidden').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          opacity: 0, y: 30, duration: 0.9, ease: 'power3.out',
        })
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
          Full-Stack
          {' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #FBF5A9, #D4AF37, #B59410)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Engineering
          </span>
          {' '}
          at Every Layer.
        </h1>
      </section>

      {/* ─── Capability Cards ──────────────────────────────────────── */}
      <section
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: 'clamp(3rem, 6vw, 5rem) clamp(2rem, 8vw, 8rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5px',
          background: 'rgba(161,161,161,0.05)',
        }}
      >
        <CapabilityCard
          index={0}
          tag="Capability 01"
          title="Industrial Computer Vision & Edge AI"
          description="Full-stack Jetson Orin deployment purpose-built for high-throughput, low-latency inference at the edge. No cloud dependency. No single point of failure."
          bullets={[
            'Full-stack NVIDIA Jetson Orin Nano deployment',
            'Multi-person simultaneous face recognition',
            'Crowd density analytics & flow mapping',
            'Sub-15ms inference latency at the edge',
            'Custom model fine-tuning & quantization',
          ]}
          visual={<CVVisual />}
        />
        <CapabilityCard
          index={1}
          tag="Capability 02"
          title="Prototype-to-Production Engineering"
          description="We close the gap between proof-of-concept and a field-deployable unit—handling custom hardware, firmware, and mechanical integration under one roof."
          bullets={[
            'Custom carrier board design (white PCBs)',
            'Specialized actuation & robotics integration',
            'Rapid iteration loops (48hr prototype cycles)',
            'Low-volume scaled manufacturing',
            '3D-printed enclosures & ruggedized housing',
          ]}
          visual={<PCBVisual />}
        />
        <CapabilityCard
          index={2}
          tag="Capability 03"
          title="Data Integrity & Compliance"
          description="Institutional-grade data pipelines with encrypted telemetry, audit trails, and compliance frameworks that meet government-level reporting requirements."
          bullets={[
            'Institutional data sync (Government/NGO level)',
            'Secure cellular (4G/LTE) & LoRaWAN telemetry',
            'End-to-end encryption & audit logging',
            'Compliance framework integration',
            'Offline-first with automatic sync on reconnect',
          ]}
          visual={<GatewayVisual />}
        />
      </section>

      {/* ─── Spec strip ────────────────────────────────────────────── */}
      <section
        style={{
          borderTop: '1px solid rgba(161,161,161,0.08)',
          padding: 'clamp(3rem, 6vw, 5rem) clamp(2rem, 8vw, 8rem)',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        <p class="gsap-hidden mono-label" style={{ marginBottom: '2rem' }}>
          Technical Specifications
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1px',
            background: 'rgba(161,161,161,0.06)',
          }}
        >
          {[
            ['Compute',   'NVIDIA Jetson Orin Nano 8GB'],
            ['AI TOPS',   '40 TOPS sparse / 20 TOPS dense'],
            ['Vision',    '4× USB3 + 2× MIPI CSI cameras'],
            ['Comms',     '4G LTE + LoRaWAN 868/915MHz'],
            ['Storage',   'NVMe SSD, RAID-optional'],
            ['OS',        'JetPack 6.x — Ubuntu 22.04'],
            ['Power',     '10–20V DC, PoE+ optional'],
            ['Enclosure', 'IP67-rated ruggedized chassis'],
          ].map(([label, val]) => (
            <div
              key={label}
              class="gsap-hidden"
              style={{
                background: '#161718',
                padding: '1.5rem',
                borderRight: '1px solid rgba(161,161,161,0.05)',
              }}
            >
              <p
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.58rem',
                  letterSpacing: '0.18em',
                  color: '#D4AF37',
                  marginBottom: '0.4rem',
                  textTransform: 'uppercase',
                }}
              >
                {label}
              </p>
              <p style={{ fontSize: '0.82rem', color: '#C0C0C0' }}>{val}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
