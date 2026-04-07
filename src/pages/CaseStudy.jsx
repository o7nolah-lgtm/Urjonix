import { useEffect, useRef } from 'preact/hooks'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── Phase visuals ─────────────────────────────────────────────────────────
function ChallengeViz() {
  return (
    <svg viewBox="0 0 320 180" width="100%" style={{ maxWidth: '320px' }} fill="none">
      {/* Crowd at gate */}
      {[30,70,110,150,190,230,270].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy={90} r="7" fill="rgba(255,255,255,0.06)" stroke="rgba(161,161,161,0.2)" strokeWidth="0.5"/>
          <circle cx={x} cy={90} r="7" fill="rgba(255,255,255,0.06)" stroke="rgba(161,161,161,0.2)" strokeWidth="0.5"/>
          <rect x={x-5} y={97} width="10" height="14" fill="rgba(255,255,255,0.04)" stroke="rgba(161,161,161,0.2)" strokeWidth="0.5"/>
        </g>
      ))}
      {[50,90,130,170,210,250].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy={120} r="6" fill="rgba(255,255,255,0.04)" stroke="rgba(161,161,161,0.15)" strokeWidth="0.5"/>
          <rect x={x-4} y={126} width="8" height="12" fill="rgba(255,255,255,0.03)" stroke="rgba(161,161,161,0.15)" strokeWidth="0.5"/>
        </g>
      ))}
      {/* Gate frame */}
      <rect x="10"  y="60" width="300" height="3"  fill="rgba(161,161,161,0.25)"/>
      <rect x="10"  y="60" width="3"   height="110" fill="rgba(161,161,161,0.25)"/>
      <rect x="307" y="60" width="3"   height="110" fill="rgba(161,161,161,0.25)"/>
      {/* Chaos indicator — red/amber marks */}
      {[60,140,220].map((x, i) => (
        <circle key={i} cx={x} cy={75} r="4" fill="rgba(255,80,80,0.6)" opacity={0.6 + i * 0.1}/>
      ))}
      <text x="160" y="25" textAnchor="middle" fill="#A1A1A1" fontSize="8" fontFamily="JetBrains Mono, monospace">HIGH-DENSITY ENTRY — UNMONITORED</text>
      <text x="160" y="38" textAnchor="middle" fill="rgba(255,80,80,0.7)" fontSize="7" fontFamily="JetBrains Mono, monospace">MANUAL HEADCOUNT ERROR RATE: ~18%</text>
    </svg>
  )
}

function SolutionViz() {
  return (
    <svg viewBox="0 0 320 200" width="100%" style={{ maxWidth: '320px' }} fill="none">
      {/* Camera stack top */}
      <rect x="130" y="10" width="60" height="35" rx="2" fill="#1A1C1E" stroke="#D4AF37" strokeWidth="1"/>
      <text x="160" y="32" textAnchor="middle" fill="#D4AF37" fontSize="6" fontFamily="JetBrains Mono, monospace">4× CSI CAM</text>
      {/* Jetson module */}
      <rect x="110" y="55" width="100" height="55" rx="2" fill="#1A1C1E" stroke="#A1A1A1" strokeWidth="0.8"/>
      <text x="160" y="78" textAnchor="middle" fill="#D4AF37" fontSize="6.5" fontFamily="JetBrains Mono, monospace">JETSON ORIN</text>
      <text x="160" y="90" textAnchor="middle" fill="#6C6C6C" fontSize="5.5" fontFamily="JetBrains Mono, monospace">NANO 8GB — 40 TOPS</text>
      {/* Custom PCB */}
      <rect x="120" y="120" width="80" height="30" rx="1" fill="#0d1a0d" stroke="rgba(161,161,161,0.4)" strokeWidth="0.6"/>
      <text x="160" y="139" textAnchor="middle" fill="#A1A1A1" fontSize="5.5" fontFamily="JetBrains Mono, monospace">CUSTOM CARRIER URJ-CB-01</text>
      {/* Gateway */}
      <rect x="240" y="80" width="65" height="50" rx="2" fill="#161718" stroke="rgba(161,161,161,0.3)" strokeWidth="0.6"/>
      <text x="272" y="101" textAnchor="middle" fill="#A1A1A1" fontSize="5.5" fontFamily="JetBrains Mono, monospace">4G GATEWAY</text>
      <text x="272" y="114" textAnchor="middle" fill="#6C6C6C" fontSize="5" fontFamily="JetBrains Mono, monospace">LoRaWAN SYNC</text>
      {/* Cloud */}
      <ellipse cx="50" cy="95" rx="35" ry="20" fill="#161718" stroke="rgba(161,161,161,0.25)" strokeWidth="0.6"/>
      <text x="50" y="99" textAnchor="middle" fill="#6C6C6C" fontSize="5.5" fontFamily="JetBrains Mono, monospace">GOV SERVER</text>
      {/* Connecting lines */}
      <line x1="160" y1="45"  x2="160" y2="55"  stroke="#D4AF37" strokeWidth="0.8"/>
      <line x1="160" y1="110" x2="160" y2="120" stroke="#A1A1A1" strokeWidth="0.6"/>
      <line x1="210" y1="100" x2="240" y2="100" stroke="rgba(212,175,55,0.4)" strokeWidth="0.6" strokeDasharray="3,2"/>
      <line x1="110" y1="100" x2="85"  y2="100" stroke="rgba(161,161,161,0.35)" strokeWidth="0.6" strokeDasharray="3,2"/>
      {/* LED */}
      <circle cx="200" cy="60" r="3.5" fill="#D4AF37" opacity="0.9"/>
      <text x="207" y="64" fill="#D4AF37" fontSize="5" fontFamily="JetBrains Mono, monospace">OPERATIONAL</text>
    </svg>
  )
}

function OutcomeViz() {
  return (
    <svg viewBox="0 0 320 180" width="100%" style={{ maxWidth: '320px' }} fill="none">
      {/* People with bounding boxes */}
      {[40,100,160,220,280].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy={80} r="7" fill="rgba(255,255,255,0.07)"/>
          <rect x={x-5} y={87} width="10" height="14" fill="rgba(255,255,255,0.05)"/>
          {/* Bounding box corners */}
          <polyline points={`${x-16},${66} ${x-16},${60} ${x-10},${60}`} stroke="#D4AF37" strokeWidth="1" fill="none"/>
          <polyline points={`${x+10},${60} ${x+16},${60} ${x+16},${66}`} stroke="#D4AF37" strokeWidth="1" fill="none"/>
          <polyline points={`${x-16},${101} ${x-16},${107} ${x-10},${107}`} stroke="#D4AF37" strokeWidth="1" fill="none"/>
          <polyline points={`${x+10},${107} ${x+16},${107} ${x+16},${101}`} stroke="#D4AF37" strokeWidth="1" fill="none"/>
          {/* Metadata tag */}
          <rect x={x-16} y={51} width="60" height="11" fill="rgba(11,12,14,0.9)" rx="1"/>
          <text x={x-13} y={59.5} fill="#D4AF37" fontSize="4.5" fontFamily="JetBrains Mono, monospace">{`ID:${10420+i} 99.${1+i}%`}</text>
        </g>
      ))}
      {/* Floor line */}
      <line x1="0" y1="140" x2="320" y2="140" stroke="rgba(161,161,161,0.15)" strokeWidth="0.5"/>
      {/* Stats */}
      <rect x="5" y="148" width="310" height="28" fill="rgba(22,23,24,0.8)" rx="1"/>
      <text x="160" y="159" textAnchor="middle" fill="#D4AF37" fontSize="6" fontFamily="JetBrains Mono, monospace">DETECTIONS: 05 | LATENCY: 11.4ms | SYNC: ACTIVE | UPTIME: 99.97%</text>
      <text x="160" y="171" textAnchor="middle" fill="#6C6C6C" fontSize="5.5" fontFamily="JetBrains Mono, monospace">COMPLIANCE REPORT GENERATED — 14:32:07 UTC</text>
    </svg>
  )
}

// ── Metric block ───────────────────────────────────────────────────────────
function Metric({ value, unit, label }) {
  return (
    <div style={{ padding: '2rem', borderRight: '1px solid rgba(161,161,161,0.08)' }}>
      <div
        style={{
          fontFamily: '"Inter Tight", sans-serif',
          fontWeight: 800,
          fontSize: '2.6rem',
          lineHeight: 1,
          marginBottom: '0.3rem',
          background: 'linear-gradient(135deg, #FBF5A9, #D4AF37, #B59410)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {value}<span style={{ fontSize: '1.4rem' }}>{unit}</span>
      </div>
      <p
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '0.6rem',
          letterSpacing: '0.15em',
          color: '#6C6C6C',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </p>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────
export function CaseStudy() {
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cs-hero', {
        opacity: 0, y: 40, stagger: 0.12, duration: 1, ease: 'power3.out', delay: 0.2,
      })
      gsap.utils.toArray('.gsap-hidden').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          opacity: 0, y: 28, duration: 0.85, ease: 'power3.out',
        })
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  const phases = [
    {
      num:   '01',
      label: 'The Challenge',
      title: 'High-Density Entry Points, Zero Visibility',
      body:  `Large institutional campuses with thousands of daily beneficiaries had no reliable, real-time system to track attendance or validate entitlement. Manual headcount was error-prone (~18% variance), open to manipulation, and produced compliance reports hours after the fact—creating a data gap that undermined institutional accountability.`,
      visual: <ChallengeViz />,
    },
    {
      num:   '02',
      label: 'The Integrated Solution',
      title: 'Jetson-Powered Edge Stack, Purpose-Built',
      body:  `Urjionix deployed a ruggedized compute stack—NVIDIA Jetson Orin Nano 8GB, a custom URJ-CB-01 carrier board, and a 4-camera overhead vision rig—directly at each entry point. The system runs a quantized YOLOv9 detection model (INT8) and a purpose-trained face-recognition pipeline entirely on-device. No cloud required for inference. Data syncs via 4G/LoRaWAN to a government-hosted compliance server every 30 seconds.`,
      visual: <SolutionViz />,
    },
    {
      num:   '03',
      label: 'The Operational View',
      title: 'Live AI Monitoring at Institutional Scale',
      body:  `The deployed system processes each incoming individual in under 15ms—recognizing faces, tagging attendance records, flagging anomalies, and streaming encrypted telemetry upstream. Five simultaneous detections per frame. Compliance reports are generated automatically and submitted in the correct government format. Zero manual intervention after installation.`,
      visual: <OutcomeViz />,
    },
  ]

  return (
    <main ref={pageRef}>
      {/* ─── Page hero ────────────────────────────────────────── */}
      <section
        style={{
          paddingTop:    'clamp(8rem, 16vw, 12rem)',
          paddingBottom: 'clamp(4rem, 8vw,  6rem)',
          paddingLeft:   'clamp(2rem, 8vw,  8rem)',
          paddingRight:  'clamp(2rem, 8vw,  8rem)',
          maxWidth: '1400px',
          margin: '0 auto',
          borderBottom: '1px solid rgba(161,161,161,0.08)',
        }}
      >
        <p class="cs-hero mono-label" style={{ marginBottom: '1rem' }}>
          Case Study — Institutional Monitoring
        </p>
        <h1
          class="cs-hero"
          style={{
            fontFamily: '"Inter Tight", sans-serif',
            fontWeight: 900,
            fontSize:   'clamp(2.2rem, 4.5vw, 4rem)',
            letterSpacing: '-0.03em',
            color: '#ffffff',
            lineHeight: 1.05,
            maxWidth: '800px',
          }}
        >
          Scaling Institutional{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #FBF5A9, #D4AF37, #B59410)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Monitoring.
          </span>
        </h1>
        <p
          class="cs-hero"
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.78rem',
            color: '#A1A1A1',
            marginTop: '1.5rem',
            lineHeight: 1.8,
            maxWidth: '600px',
          }}
        >
          Deploying a low-latency edge AI system for large-scale public attendance monitoring,
          achieving high-volume compliance data sync at institutional scale.
        </p>
      </section>

      {/* ─── Metrics bar ─────────────────────────────────────── */}
      <section
        style={{
          borderBottom: '1px solid rgba(161,161,161,0.08)',
          background: '#161718',
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          }}
        >
          <Metric value="11.4"  unit="ms"  label="Inference Latency"   />
          <Metric value="99.7"  unit="%"   label="Recognition Accuracy" />
          <Metric value="5"     unit="×"   label="Concurrent Tracks"    />
          <Metric value="30"    unit="s"   label="Sync Interval"        />
          <Metric value="99.97" unit="%"   label="System Uptime"        />
        </div>
      </section>

      {/* ─── Three phases ─────────────────────────────────────── */}
      <section
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: 'clamp(3rem, 6vw, 5rem) clamp(2rem, 8vw, 8rem)',
        }}
      >
        {phases.map((ph, i) => (
          <div
            key={ph.num}
            class="gsap-hidden"
            class="cs-phase-grid"
          style={{
              alignItems: 'center',
              marginBottom: '5rem',
              paddingBottom: '5rem',
              borderBottom: i < phases.length - 1
                ? '1px solid rgba(161,161,161,0.07)'
                : 'none',
            }}
          >
            {/* Text */}
            <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
                <span
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontWeight: 700,
                    fontSize: '2.5rem',
                    color: 'rgba(212,175,55,0.08)',
                    lineHeight: 1,
                  }}
                >
                  {ph.num}
                </span>
                <span
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '0.6rem',
                    letterSpacing: '0.2em',
                    color: '#D4AF37',
                    textTransform: 'uppercase',
                  }}
                >
                  {ph.label}
                </span>
              </div>

              <h2
                style={{
                  fontFamily: '"Inter Tight", sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                  letterSpacing: '-0.02em',
                  color: '#ffffff',
                  marginBottom: '1.2rem',
                  lineHeight: 1.2,
                }}
              >
                {ph.title}
              </h2>

              <p style={{ fontSize: '0.88rem', color: '#A1A1A1', lineHeight: 1.85 }}>
                {ph.body}
              </p>
            </div>

            {/* Visual */}
            <div
              style={{
                background: '#0F1012',
                border: '1px solid rgba(161,161,161,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3rem',
                minHeight: '240px',
                order: i % 2 === 0 ? 1 : 0,
              }}
            >
              {ph.visual}
            </div>
          </div>
        ))}
      </section>

      {/* ─── Tech stack table ─────────────────────────────────── */}
      <section
        style={{
          borderTop: '1px solid rgba(161,161,161,0.08)',
          padding: 'clamp(3rem, 6vw, 5rem) clamp(2rem, 8vw, 8rem)',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        <p class="gsap-hidden mono-label" style={{ marginBottom: '2rem' }}>
          Deployment Stack
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1px',
            background: 'rgba(161,161,161,0.06)',
          }}
        >
          {[
            ['Compute Unit',      'NVIDIA Jetson Orin Nano 8GB',          '40 TOPS sparse INT8'],
            ['Carrier Board',     'Urjionix URJ-CB-01 (Custom)',           'USB3×4, CSI×2, M.2, 4G modem'],
            ['Vision System',     '4× Wide-angle USB3 + 1× Depth sensor', 'Overhead entry-point mount'],
            ['Detection Model',   'YOLOv9-Edge (INT8 quantized)',          '<12ms full-frame inference'],
            ['Face Recognition',  'Custom ArcFace pipeline',               '99.7% accuracy @ 5 lux'],
            ['Telemetry',         'Encrypted 4G/LTE + LoRaWAN fallback',  '30s sync cycle, offline queue'],
            ['Compliance Output', 'JSON + signed PDF reports',             'Auto-submitted to gov portal'],
            ['Deployment Time',   '4 hours per installation point',        'Single technician, no scaffolding'],
          ].map(([label, val, spec]) => (
            <div
              key={label}
              class="gsap-hidden"
              style={{
                background: '#161718',
                padding: '1.5rem',
              }}
            >
              <p
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.57rem',
                  letterSpacing: '0.16em',
                  color: '#D4AF37',
                  marginBottom: '0.35rem',
                  textTransform: 'uppercase',
                }}
              >
                {label}
              </p>
              <p style={{ fontSize: '0.85rem', color: '#ffffff', marginBottom: '0.2rem' }}>{val}</p>
              <p style={{ fontSize: '0.75rem', color: '#6C6C6C', fontFamily: '"JetBrains Mono", monospace' }}>{spec}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
